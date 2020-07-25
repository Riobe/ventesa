import { immerable } from 'immer';

const { DAMAGE_TYPE } = require('./constants');
const Attack = require('./Attack');

class Character {
  constructor({
    name,
    soak = 0,
    evasion = 0,
    parry = 0,
    initiative = 3,
    isPlayer = false,
    essence = 1,
    exaltType = 'solar',
    motesMax = 0,
    willpower = 5,
    healthLevels
  } = {}) {
    if (!name) {
      throw new Error('Cannot create Character without a name.');
    }

    this.name = name;

    this.soak = soak;
    this.evasion = evasion;
    this.parry = parry;
    this.initiative = initiative;
    this.isPlayer = isPlayer;
    this.essence = essence;
    this.exaltType = exaltType;
    this.willpower = willpower;
    /*
     * Motes by type:
     * Personal:
     * Solar:       13 | 16 | 19 | 22 | 25
     * Lunar:       16 | 17 | 18 | 19 | 20
     * Terrestrial: 12 | 13 | 14 | 15 | 16
     *
     * Peripheral:
     * Solar:       33 | 40 | 47 | 54 | 61
     * Lunar:       38 | 42 | 46 | 50 | 54
     * Terrestrial: 30 | 34 | 38 | 42 | 46
    */
    if (this.isPlayer) {
      switch (exaltType) {
        case 'solar':
          this.personalMotesMax = (essence * 3) + 10;
          this.peripheralMotesMax = (essence * 7) + 26;
          break;

        case 'lunar':
          this.personalMotesMax = 15 + essence;
          this.peripheralMotesMax = (essence * 4) + 34;
          break;

        case 'terrestrial':
          this.personalMotesMax = 11 + essence;
          this.peripheralMotesMax = (essence * 4) + 26;
          break;

        default:
          this.personalMotesMax = 0;
          this.peripheralMotesMax = 0;
      }

      this.personalMotes = this.personalMotesMax;
      this.peripheralMotes = this.peripheralMotesMax;
    } else {
      this.motes = motesMax;
      this.motesMax = motesMax;
    }

    this.healthLevels = healthLevels || Character.defaultHealthLevels();
    this.woundPenalty = 0;
    this.isTurn = false;
    this.hasHadTurn = false;
    this.attacks = {
      length: 0
    };
    this.initiativeRank = -1;

    this.defense = Math.max(this.parry, this.evasion);
    this.weaponDefenseBonus = 0;
  }

  static defaultHealthLevels() {
    return [
      { woundPenalty: 0, taken: DAMAGE_TYPE.NONE },
      { woundPenalty: -1, taken: DAMAGE_TYPE.NONE },
      { woundPenalty: -1, taken: DAMAGE_TYPE.NONE },
      { woundPenalty: -2, taken: DAMAGE_TYPE.NONE },
      { woundPenalty: -2, taken: DAMAGE_TYPE.NONE },
      { woundPenalty: -4, taken: DAMAGE_TYPE.NONE },
      { woundPenalty: -Infinity, taken: DAMAGE_TYPE.NONE }
    ];
  }

  addAttack(name, options = {}) {
    if (!name) {
      throw new Error('An attack must have a name.');
    }

    if (typeof options !== 'object') {
      throw new Error('options must be an object.');
    }

    this.attacks[name] = new Attack({ name, ...options });

    if (options.defense > this.weaponDefenseBonus) {
      this.weaponDefenseBonus = options.defense;
    }
  }

  withering(damage, againstCharacter) {
    if (typeof damage !== 'number') {
      throw new Error('damage must be a number, was:', damage);
    }

    this.initiative++; // One for making the attack.

    if (damage === 0) { return; }
    this.initiative += damage;
    againstCharacter.initiative -= damage;
  }

  damage(damage, type) {
    if (!DAMAGE_TYPE[type]) {
      throw new Error('Unsupported damage type.');
    }

    if (!damage || damage < 0 || typeof damage !== 'number') {
      throw new Error('damage must be a non-negative number');
    }

    // console.log(`Dealing ${damage} damage of type ${type}`);
    let lethalMoved = 0;
    let bashingMoved = 0;
    this.healthLevels.every(healthLevel => {
      if (healthLevel.taken === DAMAGE_TYPE.AGGREVATED) {
        return true; // Don't touch the aggrevated, move on.
      }

      if (healthLevel.taken === DAMAGE_TYPE.LETHAL) {
        if (type === DAMAGE_TYPE.AGGREVATED) {
          lethalMoved++; // Aggrevated can replace, mark it to be applied to the end.
        } else {
          return true; // Only aggrevated can replace lethal.
        }
      }

      if (healthLevel.taken === DAMAGE_TYPE.BASHING) {
        if (type === DAMAGE_TYPE.BASHING) {
          return true; // Already have bashing here, skip.
        } else {
          bashingMoved++; // Anything can replace bashing, but mark to move it.
        }
      }

      healthLevel.taken = type;
      this.woundPenalty = Math.max(this.woundPenalty, healthLevel.woundPenalty);
      damage--;

      return damage > 0;
    });

    // console.log('After initial damage');
    // console.log(this.consoleHealthLevels);

    if (lethalMoved) {
      this.damage(lethalMoved, DAMAGE_TYPE.LETHAL);
      // console.log('After lethal move');
      // console.log(this.consoleHealthLevels);
    }

    if (bashingMoved) {
      this.damage(bashingMoved, DAMAGE_TYPE.BASHING);
      // console.log('After bashing move');
      // console.log(this.consoleHealthLevels);
    }
  }

  heal(levels) {
    for (let i = this.healthLevels.length -1; i > -1 && levels > 0; i--) {
      const healthLevel = this.healthLevels[i];
      if (!healthLevel.taken) {
        continue;
      }

      healthLevel.taken = DAMAGE_TYPE.NONE;
      levels--;
    }
  }

  get consoleHealthLevels() {
    let damageLine = '';
    let levelsLine = '';
    this.healthLevels.forEach(healthLevel => {
      const taken = healthLevel.taken || '_';
      const woundPenalty = healthLevel.woundPenalty === -Infinity ? 'Incap' : healthLevel.woundPenalty;

      let takenSymbol = '';
      switch (taken) {
        case DAMAGE_TYPE.BASHING:
          takenSymbol = '/';
          break;

        case DAMAGE_TYPE.LETHAL:
          takenSymbol = 'X';
          break;

        case DAMAGE_TYPE.AGGREVATED:
          takenSymbol = '*';
          break;

        default:
          takenSymbol = '_';
      }

      damageLine += takenSymbol.padStart(7, ' ');
      levelsLine += woundPenalty.toString().padStart(7, ' ');
    });

    return damageLine + '\n' + levelsLine;
  }
}

Character[immerable] = true;

export default Character;
