const DefenseCalculation = require('../enums/defence-calculation');

function witheringAccuracyRoll({ character, attackName }) {
  const attack = character.attacks[attackName];
  const {
    accuracyAttribute,
    accuracy,
    ability,
    extraAccuracy,
    specialized,
  } = attack;

  const accuracyAttributeValue = character.attributes[accuracyAttribute];
  const abilityValue = character.abilities[ability];

  return (
    accuracyAttributeValue +
    abilityValue +
    accuracy +
    extraAccuracy +
    (specialized ? 1 : 0) +
    character.effects.attackMod +
    (character.woundPenalty + character.effects.woundPenaltyMod)
  );
}

function witheringDamageRoll({
  fromChar,
  attackName,
  successes,
  toChar,
  defenseCalculation = DefenseCalculation.HIGHEST,
}) {
  if (!DefenseCalculation[defenseCalculation]) {
    throw new Error('Invalid defense calculation.');
  }

  const defense = calculateDefense(toChar, defenseCalculation);

  // A miss will return undefined, because there is no damage pool.
  if (successes < defense) {
    return;
  }

  const attack = fromChar.attacks[attackName];
  const {
    damageAttribute,
    damage,
    extraDamage,
    overwhelming,
    extraOverwhelming,
  } = attack;

  const thresholdSuccesses = successes - defense;
  const damageAttributeValue = fromChar.attributes[damageAttribute];

  return Math.max(
    damageAttributeValue +
      damage +
      extraDamage +
      thresholdSuccesses -
      toChar.soak,
    overwhelming + extraOverwhelming,
  );
}

function witheringApplyDamage({ fromChar, toChar, damage }) {
  if (typeof damage !== 'number') {
    throw new Error('damage must be a number, was:', damage);
  }

  // One for making the attack, even if they rolled no damage.
  fromChar.initiative++;

  // If they rolled no damage, then don't bother transfering
  // initiative.
  if (damage === 0) {
    return;
  }

  const victimStartingInitiative = toChar.initiative;

  fromChar.initiative += damage;
  toChar.initiative -= damage;

  if (victimStartingInitiative > 0 && toChar.initiative <= 0) {
    // The toChar is now in initiative crash.
    fromChar.initiative += 5;
    toChar.inCrash = true;
  }
}

function calculateDefense(
  character,
  defenseCalculation = DefenseCalculation.HIGHEST,
) {
  if (defenseCalculation === DefenseCalculation.NEGATED) {
    return 0;
  }

  let defense;
  switch (defenseCalculation) {
    case DefenseCalculation.HIGHEST:
      defense = Math.max(
        character.evasion,
        character.parry + character.weaponDefenseBonus,
      );
      break;

    case DefenseCalculation.UNBLOCKABLE:
      defense = character.evasion;
      break;

    case DefenseCalculation.UNDODGEABLE:
      defense = character.parry + character.weaponDefenseBonus;
      break;

    default:
      throw new Error('Attack has an unsupported type of defense calculation.');
  }

  return defense - character.onslaught;
}

module.exports = {
  witheringAccuracyRoll,
  witheringDamageRoll,
  witheringApplyDamage,
  calculateDefense,
};
