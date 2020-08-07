import React, { useState } from 'react';
import { Button, Stack } from '@chakra-ui/core';
import { useSprings, animated } from 'react-spring';

import './Field.css';

import { useCharacters } from '../../lib/CharacterContext';

import CharacterPanel from '../CharacterPanel';

function Field() {
  const [charData, charDispatch] = useCharacters();
  // const [battle, setBattle] = useState({
  // currentRound: 0,
  // charactersInOrder: charactersIn(charData),
  // });

  const characterSprings = useSprings(
    charData.characters.length,
    charData.characters.map(char => ({
      top: char.initiativeRank * 150,
      config: {
        duration: 150,
      },
    })),
  );

  const handleNextTurn = () => {
    charDispatch({
      type: 'next-turn',
    });
  };

  const reset = () => {
    charDispatch({
      type: 'reset-round',
    });
  };

  const currentCharacter =
    charData.currentTurnIndex !== undefined &&
    charData.characters[charData.currentTurnIndex];
  const atInitiative = currentCharacter
    ? currentCharacter.initiative
    : 'Not Started';

  return (
    <div className="Field">
      <div className="Field-next-turn">
        <Stack isInline>
          <Button onClick={handleNextTurn}>Next Turn</Button>
          <Button onClick={reset}>Reset Combat</Button>
        </Stack>
        <div>At Initiative: {atInitiative}</div>
        <div>Current Round: {charData.currentRound || 'Not started'}</div>
      </div>
      <div className="Field-characters">
        {characterSprings.map(({ top }, i) => (
          <animated.div
            key={charData.characters[i].name}
            className="Field-character"
            style={{
              top,
              left: charData.characters[i].isPlayer && 0,
              right: !charData.characters[i].isPlayer && 0,
            }}
          >
            <CharacterPanel character={charData.characters[i]} />
          </animated.div>
        ))}
        {/*charData.characters.length > 0 &&
          charData.characters.map((character, index) => (

            <CharacterPanel key={character.name} character={character} style={{
              top: index * 90,
              left: character.isPlayer && 0,
              right: !character.isPlayer && 0
            }} />
          ))*/}
      </div>
    </div>
  );
}

export default Field;
