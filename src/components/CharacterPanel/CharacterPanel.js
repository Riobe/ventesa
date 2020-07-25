import React from 'react';
import {
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  Select,
  Stack,
  Tooltip
} from '@chakra-ui/core';

import { useCharacters } from '../../lib/CharacterContext';

import './CharacterPanel.css';

import AttackPanel from '../AttackPanel';

function VerticalDivider() {
  return (
    <Divider orientation="vertical" h="50%" />
  );
}

function CharacterPanel({ character, style }) {
  const [, charDispatch] = useCharacters();

  let additionalClasses = (character.isTurn ? ' CharacterPanel-isTurn' : '');
  additionalClasses += (character.hasHadTurn ? ' CharacterPanel-hasHadTurn' : '');

  return (
    <div className={'CharacterPanel' + additionalClasses} style={style}>

      {/* Init/Name/HadTurn */}
      <Stack spacing={3} isInline className="CharacterPanel-row">
        <Tooltip label="Initiative" placement="bottom" hasArrow>
          <Icon name="time" mr="1" />
        </Tooltip>
        <Editable className="CharacterPanel-editable" placeholder="" value={character.initiative}>
          <EditablePreview />
          <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
            charDispatch({
              type: 'modify-character',
              name: character.name,
              property: 'initiative',
              value: parseInt(e.target.value, 10)
            });
          }} />
        </Editable>

        <VerticalDivider />

        <Tooltip label="Has Had Turn" placement="bottom" hasArrow>
          <Icon
            color={character.hasHadTurn ? 'green.400' : 'yellow.400'}
            aria-label="Has had turn"
            size="16px"
            name={character.hasHadTurn ? 'check' : 'minus'}
            onClick={() => {
              charDispatch({
                type: 'modify-character',
                name: character.name,
                property: 'hasHadTurn',
                value: !character.hasHadTurn
              });
            }}
          />
        </Tooltip>

        <VerticalDivider />

        <div>{character.name}</div>
      </Stack>

      {/* Defenses */}
      <Stack spacing={3} isInline className="CharacterPanel-row">
        <Tooltip label="Soak" placement="bottom" hasArrow>
          <Icon name="sponge" mr="1" />
        </Tooltip>
        <Editable className="CharacterPanel-editable" placeholder="" value={character.soak}>
          <EditablePreview />
          <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
            charDispatch({
              type: 'modify-character',
              name: character.name,
              property: 'soak',
              value: parseInt(e.target.value, 10)
            });
          }} />
        </Editable>

        <VerticalDivider />

        <Tooltip label="Parry" placement="bottom" hasArrow>
          <Icon name="swords" mr="1" />
        </Tooltip>
        <Editable className="CharacterPanel-editable" placeholder="" value={character.parry}>
          <EditablePreview color={character.parry > character.evasion ? 'green.400' : 'gray.400'} />
          <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
            charDispatch({
              type: 'modify-character',
              name: character.name,
              property: 'parry',
              value: parseInt(e.target.value, 10)
            });
          }} />
        </Editable>

        <VerticalDivider />

        <Tooltip label="Evasion" placement="bottom" hasArrow>
          <Icon name="running" mr="1" />
        </Tooltip>
        <Editable className="CharacterPanel-editable" placeholder="" value={character.evasion}>
          <EditablePreview color={character.evasion > character.parry ? 'green.400' : 'gray.400'} />
          <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
            charDispatch({
              type: 'modify-character',
              name: character.name,
              property: 'evasion',
              value: parseInt(e.target.value, 10)
            });
          }} />
        </Editable>
      </Stack>

      {/* Motes/WP/Type */}
      <Stack spacing={3} isInline className="CharacterPanel-row">
        <Tooltip label="Soak" placement="bottom" hasArrow>
          <Icon name="sun" mr="1" />
        </Tooltip>
        {character.isPlayer ? (
          <>
            <Editable className="CharacterPanel-editable" placeholder="" value={character.personalMotes}>
              <EditablePreview />
              <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
                charDispatch({
                  type: 'modify-character',
                  name: character.name,
                  property: 'personalMotes',
                  value: parseInt(e.target.value, 10)
                });
              }} />
            </Editable>
            <span>/</span>
            <Editable className="CharacterPanel-editable" placeholder="" value={character.peripheralMotes}>
              <EditablePreview />
              <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
                charDispatch({
                  type: 'modify-character',
                  name: character.name,
                  property: 'peripheralMotes',
                  value: parseInt(e.target.value, 10)
                });
              }} />
            </Editable>
          </>
        ) : (
          <Editable className="CharacterPanel-editable" placeholder="" value={character.motes}>
            <EditablePreview />
            <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
              charDispatch({
                type: 'modify-character',
                name: character.name,
                property: 'motes',
                value: parseInt(e.target.value, 10)
              });
            }} />
          </Editable>
        )}

        <VerticalDivider />

        <Tooltip label="Willpower" placement="bottom" hasArrow>
          <Icon name="fist" mr="1" />
        </Tooltip>
        <Editable className="CharacterPanel-editable" placeholder="" value={character.willpower}>
          <EditablePreview />
          <EditableInput type="number" min="0" className="CharacterPanel-input" onChange={e => {
            charDispatch({
              type: 'modify-character',
              name: character.name,
              property: 'willpower',
              value: parseInt(e.target.value, 10)
            });
          }} />
        </Editable>

        {character.isPlayer && (
          <div className="CharacterPanel-exaltType">
            <Select value={character.exaltType} size="sm" onChange={e => {
              charDispatch({
                type: 'modify-character',
                name: character.name,
                property: 'exaltType',
                value: e.target.value
              });
            }}>
              <option value="solar">Solar</option>
              <option value="lunar">Lunar</option>
              <option value="terrestrial">Terrestrial</option>
            </Select>
          </div>
        )}
      </Stack>
        
      <Stack spacing={3} isInline className="CharacterPanel-row">
        <AttackPanel character={character} />

        <VerticalDivider />

        <Tooltip label="Max Defense" placement="bottom" hasArrow>
          <Icon name="shield" mr="1" />
        </Tooltip>
        <div className="CharacterPanel-defense">{character.defense + character.weaponDefenseBonus}</div>
      </Stack>
    </div>
  );
}

export default CharacterPanel;
