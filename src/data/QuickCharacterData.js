const { immerable } = require('immer');

const AttackType = require('../enums/attack-type');
const DamageType = require('../enums/damage-type');

const { defaultHealthLevels } = require('../lib/health-levels');

class QuickCharacterData {
  constructor(name) {
    if (!name) {
      throw new Error('Cannot create Player without a name.');
    }

    // General
    this.name = name;
    this.essence = 1;

    // Defenses
    this.soak = 0;
    this.evasion = 0;
    this.parry = 0;
    this.hardness = 0;

    // Exalt Type/Resources
    this.willpower = 5;
    this.motes = 0;
    this.motesMax = 0;

    // Health
    this.healthLevels = defaultHealthLevels();
    this.woundPenalty = 0;

    // Combat
    this.initiative = 3;
    this.isTurn = false;
    this.hasHadTurn = false;
    this.inCrash = false;
    this.crashedFrom = undefined;
    this.crashedOnTurn = undefined;
    this.onslaught = 0;

    // Attacks
    this.attacks = {};

    // Modifiers
    this.weaponDefenseBonus = 0;
    this.conditions = [];
    this.effects = {
      defenseMod: 0,
      woundPenaltyMod: 0,
      parryMod: 0,
      evasionMod: 0,
      attackMod: 0
    };
  }

  addAttack(attack) {
    if (!attack.name) {
      throw new Error('An attack must have a name.');
    }

    if (this.attacks[name]) {
      throw new Error('An attack must have a unique name on a character.');
    }

    if (!(attack instanceof Attack)) {
      throw new Error('attack must be an instanceof Attack');
    }

    this.attacks[attack.name] = attack;
    this.weaponDefenseBonus = this.calcWeaponDefense();
  }

  calcWeaponDefense() {
    let highestPenalty = 0;
    let highestBonus = 0;

    Object.values(this.attacks).forEach(attack => {
      if (attack.defense < 0 && attack.defense < highestPenalty) {
        highestPenalty = attack.defense;
      } else if (attack.defense > 0 && attack.defense > highestBonus) {
        highestBonus = attack.defense;
      }
    });

    return highestBonus - highestPenalty;
  }

  addCondition(condition) {
    // TODO: Validate.
    this.conditions.push(condition);

    this.recalcEffects();
  }

  removeCondition(name) {
    // TODO: Add validation
    const conditionIndex = this.conditions.findIndex(
      condition => condition.name === name
    );

    // TODO: Make immutable?
    this.conditions.splice(conditionIndex, 1);

    this.recalcEffects();
  }

  recalcEffects() {
    const effects = this.conditions.reduce(
      (result, condition) => {
        result.defenseMod += condition.defenseMod;
        result.woundPenaltyMod += condition.woundPentalyMod;
        result.parryMod += condition.parryMod;
        result.evasionMod += condition.evasionMod;
        result.attackMod += condition.attackMod;
      },
      {
        defenseMod: 0,
        woundPenaltyMod: 0
      }
    );

    this.effects = effects;
  }

  get consoleHealthLevels() {
    let damageLine = '';
    let levelsLine = '';
    this.healthLevels.forEach(healthLevel => {
      const taken = healthLevel.taken || '_';
      const woundPenalty =
        healthLevel.woundPenalty === -Infinity
          ? 'Incap'
          : healthLevel.woundPenalty;

      let takenSymbol = '';
      switch (taken) {
        case DamageType.BASHING:
          takenSymbol = '/';
          break;

        case DamageType.LETHAL:
          takenSymbol = 'X';
          break;

        case DamageType.AGGREVATED:
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

QuickCharacterData[immerable] = true;

module.exports = QuickCharacterData;
