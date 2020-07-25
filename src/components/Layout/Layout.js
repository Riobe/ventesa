import React, { useEffect } from 'react';

import './Layout.css';

import { useCharacters } from '../../lib/CharacterContext';
import Character from '../../lib/Character';
import { ATTACK_TYPE } from '../../lib/constants';

import AddCharacter from '../AddCharacter';
import Field from '../Field';

const rio = new Character({
  name: 'Riobe',
  soak: 5,
  parry: 2,
  evasion: 4,
  initiative: 10,
  isPlayer: true
});
rio.addAttack('Broadsword', { type: ATTACK_TYPE.ARTIFACT_LIGHT_MELEE });

const aeon = new Character({
  name: 'Aeon',
  soak: 1,
  parry: 3,
  evasion: 1,
  initiative: 9,
  isPlayer: false,
  motesMax: 30
});
aeon.addAttack('Fists', { type: ATTACK_TYPE.UNARMED });

function Layout() {
  const [, charDispatch] = useCharacters();

  useEffect(() => {
    charDispatch({
      type: 'add',
      character: rio
    });
    charDispatch({
      type: 'add',
      character: aeon
    });
  }, [charDispatch]);

  return (
    <div id="Layout">
      <AddCharacter />
      <Field />
    </div>
  );
}

export default Layout;
