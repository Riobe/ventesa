import React, { useState } from 'react';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from '@chakra-ui/core';
import styled from 'styled-components';
import produce from 'immer';

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;

  background-color: #121212;
  padding: 5px;
`;

const CharacterPanelOuter = styled.div`
  background-color: #121212;
  padding: 5px;

  background-color: rgba(255, 255, 255, 0.1);
  color: white;
`;

const CharacterPanelInner = styled.div`
  display: grid;
  grid: auto / 1fr min-content min-content auto;
  gap: 0px / 30px;

  padding: 10px;

  background-color: rgba(255, 255, 255, 0.1);
  color: white;

  &.active {
    border: 5px dashed goldenrod;
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const Horizontal = styled.div`
  width: 100%;
  display: flex;
`;

function SecondEditionCombat() {
  const [characters, setCharacters] = useState([]);
  const [newName, setNewName] = useState('');
  const [newJoinBattle, setJoinBattle] = useState(0);

  const runTick = draft => {
    const tickBy = Math.min(...draft.map(char => char.tick));
    if (tickBy === 0) {
      return;
    }

    draft.forEach(char => {
      char.tick -= tickBy;
    });

    draft.sort((l, r) => l.tick - r.tick);
  };

  return (
    <CombatContainer>
      <Horizontal>
        <input
          type="text"
          placeholder="name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />

        <input
          type="number"
          value={newJoinBattle}
          onChange={e => setJoinBattle(e.target.value)}
        />

        <button
          onClick={() => {
            setCharacters(
              produce(characters, draft => {
                draft.push({
                  name: newName,
                  tick: 2,
                  rolled: newJoinBattle,
                  speed: 5,
                });
              }),
            );
            setNewName('');
            setJoinBattle(0);
          }}
        >
          Add Character
        </button>
      </Horizontal>

      <button
        onClick={() => {
          setCharacters(
            produce(characters, draft => {
              const goesFirst = Math.max(...draft.map(char => char.rolled));
              draft.forEach(char => {
                char.tick = goesFirst - char.rolled;
              });

              draft.sort((l, r) => l.tick - r.tick);
            }),
          );
        }}
      >
        Calculate Ticks Off Join Battle
      </button>

      <button
        onClick={() => {
          setCharacters(
            produce(characters, draft => {
              draft.forEach(char => {
                if (char.tick < 1) {
                  return;
                }

                char.tick -= 1;
              });
            }),
          );
        }}
      >
        One Tick
      </button>

      {characters.map((character, index) => (
        <CharacterPanelOuter key={character.name}>
          <CharacterPanelInner className={character.tick === 0 ? 'active' : ''}>
            <div>{character.name}</div>

            <Box padding="0 10px" width="100px">
              <label>Join Battle</label>
              <Editable value={character.rolled}>
                <EditablePreview />
                <EditableInput
                  color="white"
                  onChange={e =>
                    setCharacters(
                      produce(characters, draft => {
                        draft[index].rolled = e.target.value;
                      }),
                    )
                  }
                />
              </Editable>
            </Box>

            <Box padding="0 10px">
              <label>Tick</label>
              <Editable value={character.tick}>
                <EditablePreview />
                <EditableInput
                  color="white"
                  onChange={e =>
                    setCharacters(
                      produce(characters, draft => {
                        draft[index].tick = e.target.value;

                        draft.sort((l, r) => l.tick - r.tick);
                      }),
                    )
                  }
                />
              </Editable>
            </Box>

            <div>
              <label>Speed</label>
              <Input
                type="number"
                size="sm"
                color="black"
                width="min-content"
                value={character.speed}
                onChange={e =>
                  setCharacters(
                    produce(characters, draft => {
                      draft[index].speed = parseInt(e.target.value, 10);
                    }),
                  )
                }
              />

              <button
                onClick={() => {
                  setCharacters(
                    produce(characters, draft => {
                      draft[index].tick += draft[index].speed;

                      runTick(draft);
                    }),
                  );
                }}
              >
                Act
              </button>
            </div>
          </CharacterPanelInner>
        </CharacterPanelOuter>
      ))}
    </CombatContainer>
  );
}

SecondEditionCombat.propTypes = {};

export default SecondEditionCombat;
