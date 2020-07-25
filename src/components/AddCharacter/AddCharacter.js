import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup
} from '@chakra-ui/core';

import './AddCharacter.css';

import { useCharacters } from '../../lib/CharacterContext';
import Character from '../../lib/Character';

function AddCharacter() {
  const [, charDispatch] = useCharacters();
  const [name, setName] = useState('');
  const [type, setType] = useState('npc');

  return (
    <Flex className="AddCharacter" alignItems="flex-end">

      <FormControl as="fieldset" className="AddCharacter-type-control">
        <FormLabel as="legend">Type?</FormLabel>
        <RadioGroup isInline defaultValue="npc" spacing={5} onChange={e => setType(e.target.value)}>
          <Radio value="npc">NPC</Radio>
          <Radio value="player">Player</Radio>
        </RadioGroup>
      </FormControl>

      <FormControl as="fieldset" className="AddCharacter-name-control">
        <FormLabel as="legend" htmlFor="AddCharacter-new-name">Name?</FormLabel>
        <Input id="new-name" value={name} onChange={e => setName(e.target.value)} />
      </FormControl>

      <Button variantColor="blue" onClick={() => {
        const newChar = new Character({
          name,
          isPlayer: type === 'player'
        });

        charDispatch({
          type: 'add',
          character: newChar
        });

        setName('');
      }}>Add</Button>
    </Flex>
  );
}

export default AddCharacter;
