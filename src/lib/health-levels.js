const DamageType = require('../enums/damage-type');

function defaultHealthLevels() {
  return [
    { woundPenalty: 0, taken: DamageType.NONE },
    { woundPenalty: -1, taken: DamageType.NONE },
    { woundPenalty: -1, taken: DamageType.NONE },
    { woundPenalty: -2, taken: DamageType.NONE },
    { woundPenalty: -2, taken: DamageType.NONE },
    { woundPenalty: -4, taken: DamageType.NONE },
    { woundPenalty: -Infinity, taken: DamageType.NONE }
  ];
}

function heal(character, levels) {
  for (let i = this.healthLevels.length - 1; i > -1 && levels > 0; i--) {
    const healthLevel = this.healthLevels[i];
    if (!healthLevel.taken) {
      continue;
    }

    healthLevel.taken = DamageType.NONE;
    levels--;
  }
}

function hurt(character, damage, type) {
  if (!DamageType[type]) {
    throw new Error('Unsupported damage type.');
  }

  if (!damage || damage < 0 || typeof damage !== 'number') {
    throw new Error('damage must be a non-negative number');
  }

  // console.log(`Dealing ${damage} damage of type ${type}`);
  let lethalMoved = 0;
  let bashingMoved = 0;
  character.healthLevels.every(healthLevel => {
    if (healthLevel.taken === DamageType.AGGREVATED) {
      return true; // Don't touch the aggrevated, move on.
    }

    if (healthLevel.taken === DamageType.LETHAL) {
      if (type === DamageType.AGGREVATED) {
        lethalMoved++; // Aggrevated can replace, mark it to be applied to the end.
      } else {
        return true; // Only aggrevated can replace lethal.
      }
    }

    if (healthLevel.taken === DamageType.BASHING) {
      if (type === DamageType.BASHING) {
        return true; // Already have bashing here, skip.
      } else {
        bashingMoved++; // Anything can replace bashing, but mark to move it.
      }
    }

    healthLevel.taken = type;
    character.woundPenalty = Math.max(
      character.woundPenalty,
      healthLevel.woundPenalty
    );
    damage--;

    return damage > 0;
  });

  if (lethalMoved) {
    character.damage(lethalMoved, DamageType.LETHAL);
  }

  if (bashingMoved) {
    character.damage(bashingMoved, DamageType.BASHING);
  }
}

async function convert() {
  try {
    const contents = await fs.readFile('sodifnapsodifnaposdifn');
  } catch (err) {}

  // TODO: Write function.
}

module.exports = {
  defaultHealthLevels,
  heal,
  hurt
};
