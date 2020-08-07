import React, { useReducer, createContext, useContext } from 'react';
import produce from 'immer';

const CharacterContext = createContext([]);
const CharacterDispatchContext = createContext();

function sortByInitiative(characters) {
  const sorted = characters.slice().sort((l, r) => r.initiative - l.initiative);
  characters.forEach(char => {
    char.initiativeRank = sorted.findIndex(
      sortedChar => sortedChar.name === char.name,
    );
  });

  return characters;
}

function findNextTurnIndex(characters) {
  return characters.reduce(
    (result, char, i) => {
      if (char.hasHadTurn) {
        return result;
      }

      if (char.initiativeRank < result.initiativeRank) {
        return {
          initiativeRank: char.initiativeRank,
          index: i,
        };
      }

      return result;
    },
    {
      initiativeRank: Infinity,
      index: 0,
    },
  ).index;
}

function characterReducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'add':
        if (
          draft.characters.findIndex(
            char => char.name === action.character.name,
          ) > -1
        ) {
          return;
        }

        const copyCharacter = { ...action.character };

        draft.characters.push(copyCharacter);

        sortByInitiative(draft.characters);
        break;

      case 'next-turn':
        if (!draft.characters.length) {
          return;
        }

        if (!draft.currentRound) {
          draft.currentRound = 1;
        }

        if (draft.currentTurnIndex !== undefined) {
          draft.characters[draft.currentTurnIndex].hasHadTurn = true;
          draft.characters[draft.currentTurnIndex].isTurn = false;
        }

        let nextIndex = findNextTurnIndex(draft.characters);

        if (draft.characters[nextIndex].hasHadTurn) {
          draft.characters.forEach(char => {
            char.hasHadTurn = false;
            char.isTurn = false;
            if (char.isPlayer) {
              let motesAvailable = 5;
              if (char.personalMotes < char.personalMotesMax) {
                motesAvailable =
                  5 -
                  Math.min(
                    char.personalMotesMax - char.personalMotes,
                    motesAvailable,
                  );
                char.personalMotes = char.personalMotes + (5 - motesAvailable);
              }

              if (
                motesAvailable &&
                char.peripheralMotes < char.peripheralMotesMax
              ) {
                char.peripheralMotes = Math.min(
                  char.peripheralMotes + motesAvailable,
                  char.peripheralMotesMax,
                );
              }
            } else {
              char.motes = Math.min(char.motes + 5, char.motesMax);
            }
          });

          draft.currentRound++;

          nextIndex = findNextTurnIndex(draft.characters);
        }

        draft.currentTurnIndex = nextIndex;
        draft.characters[draft.currentTurnIndex].isTurn = true;
        break;

      case 'reset-round':
        draft.currentRound = 1;
        draft.characters.forEach(char => {
          char.hasHadTurn = false;
          char.isTurn = false;
        });

        draft.currentTurnIndex = findNextTurnIndex(draft.characters);
        draft.characters[draft.currentTurnIndex].isTurn = true;
        break;

      case 'modify-soak':
        draft[action.name].soak = parseInt(action.value, 10);
        break;

      case 'modify-character': {
        const index = draft.characters.findIndex(
          char => char.name === action.name,
        );
        const char = draft.characters[index];
        if (
          typeof char[action.property] !== typeof action.value ||
          isNaN(action.value)
        ) {
          break;
        }

        switch (action.property) {
          case 'personalMotes':
            char[action.property] = Math.min(
              action.value,
              char.personalMotesMax,
            );
            break;

          case 'peripheralMotes':
            char[action.property] = Math.min(
              action.value,
              char.peripheralMotesMax,
            );
            break;

          // In this case, fix the defense, then do the set like normal.
          case 'parry':
          case 'evasion':
            char.defense = Math.max(char.parry, char.evasion, action.value);
          // falls through

          default:
            char[action.property] = action.value;
        }

        if (action.property === 'initiative') {
          let currentName;
          if (draft.currentTurnIndex !== undefined) {
            currentName = draft.characters[draft.currentTurnIndex].name;
          }
          sortByInitiative(draft.characters);

          if (currentName) {
            draft.currentTurnIndex = draft.characters.findIndex(
              char => char.name === currentName,
            );
          }
        }

        if (action.property === 'exaltType') {
          switch (action.value) {
            case 'solar':
              char.personalMotesMax = char.essence * 3 + 10;
              char.peripheralMotesMax = char.essence * 7 + 26;
              break;

            case 'lunar':
              char.personalMotesMax = 15 + char.essence;
              char.peripheralMotesMax = char.essence * 4 + 34;
              break;

            case 'terrestrial':
              char.personalMotesMax = 11 + char.essence;
              char.peripheralMotesMax = char.essence * 4 + 26;
              break;

            default:
              break;
          }

          if (draft.currentRound === undefined) {
            char.personalMotes = char.personalMotesMax;
            char.peripheralMotes = char.peripheralMotesMax;
            break;
          }

          if (char.personalMotesMax < char.personalMotes) {
            char.personalMotes = char.personalMotesMax;
          }

          if (char.peripheralMotesMax < char.peripheralMotes) {
            char.peripheralMotes = char.peripheralMotesMax;
          }
        }

        break;
      }

      default:
        throw new Error('Unsupported action type: ' + action.type);
    }
  });
}

function CharacterProvider({ children }) {
  // Object.keys(state).forEach(char => {
  // state[char].hasTurn = false;
  // state[char].isTurn = false;
  // });

  // const [state, dispatch] = useReducer(characterReducer, {
  // riobe: {
  // [> ... riobe data <]
  // },
  // karth: {
  // [> ... karth data <]
  // },
  // });

  // const [battleState, dispatch] = useReducer(battleReducer, {
  // targetInitiative: undefined,
  // inInitOrderCharacters: ['riobe', 'karth'],
  // currentRound: undefined,
  // isStarted: false
  // });

  inInitOrderCharacters = Object.values(state)
    .filter(hasNotHadTurn)
    .return(
      <CharacterContext.Provider value={state}>
        <CharacterDispatchContext.Provider value={dispatch}>
          {children}
        </CharacterDispatchContext.Provider>
      </CharacterContext.Provider>,
    );
}

function useCharacters() {
  const characterContext = useContext(CharacterContext);
  if (characterContext === undefined) {
    throw new Error(
      'useCharacterContext must be used within a CharacterProvider',
    );
  }

  const characterDispatchContext = useContext(CharacterDispatchContext);
  if (characterDispatchContext === undefined) {
    throw new Error(
      'useCharacterContext must be used within a CharacterProvider',
    );
  }

  return [characterContext, characterDispatchContext];
}

export { CharacterProvider, useCharacters };
