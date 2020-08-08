const { immerable } = require('immer');

const AttackType = require('../enums/attack-type');
const DamageType = require('../enums/damage-type');
const Attributes = require('../enums/attributes');
const Abilities = require('../enums/abilities');

const { getMoteMaxes } = require('../lib/motes');
const { defaultHealthLevels } = require('../lib/health-levels');

const AttackData = require('./AttackData');

const emptyEffects = {
  defenseMod: 0,
  woundPenaltyMod: 0,
  parryMod: 0,
  evasionMod: 0,
  attackMod: 0,
};

class PlayerData {
  constructor(name, exaltType = 'solar') {
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
    this.exaltType = exaltType;
    this.willpower = 5;
    this.recalcMotes();

    // Health
    this.healthLevels = defaultHealthLevels();
    this.woundPenalty = 0;

    // Stats
    this.attributes = {};
    Object.values(Attributes).forEach(attribute => {
      this.attributes[attribute] = 1;
    });

    this.abilities = {};
    Object.values(Abilities).forEach(ability => {
      this.abilities[ability] = 0;
    });

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
    this.addAttack(
      // Any character can punch someone, so add that by default.
      new AttackData({
        name: 'Unarmed',
        type: AttackType.UNARMED,
        ability: Abilities.brawl,
      }),
    );

    // Modifiers
    this.weaponDefenseBonus = 0;
    this.conditions = [];
    this.effects = { ...emptyEffects };
  }

  setExaltType(exaltType) {
    this.exaltType = exaltType;

    this.recalcMotes();
  }

  setEssence(essence) {
    this.essence = essence;

    this.recalcMotes();
  }

  recalcMotes() {
    const { personal, peripherial } = getMoteMaxes(
      this.exaltType,
      this.essence,
    );
    this.personalMotesMax = personal;
    this.personalMotes = this.personalMotesMax;

    this.peripheralMotesMax = peripherial;
    this.peripheralMotes = this.peripheralMotesMax;
  }

  addAttack(attack) {
    if (!attack.name) {
      throw new Error('An attack must have a name.');
    }

    if (this.attacks[attack.name]) {
      throw new Error('An attack must have a unique name on a character.');
    }

    if (!(attack instanceof AttackData)) {
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
    if (!condition.name) {
      throw new Error('Condition must have a name.');
    }

    const conditionIndex = this.conditions.findIndex(
      existingCondition => existingCondition.name === condition.name,
    );

    if (conditionIndex === -1) {
      this.conditions.push(condition);
    } else {
      this.conditions.splice(conditionIndex, 1, condition);
    }

    this.recalcEffects();
  }

  removeCondition(name) {
    // TODO: Add validation
    const conditionIndex = this.conditions.findIndex(
      condition => condition.name === name,
    );

    // TODO: Make immutable?
    this.conditions.splice(conditionIndex, 1);

    this.recalcEffects();
  }

  recalcEffects() {
    if (!this.conditions.length) {
      this.effects = { ...emptyEffects };
      return;
    }

    const effects = this.conditions.reduce(
      (result, condition) => {
        result.defenseMod += condition.defenseMod || 0;
        result.woundPenaltyMod += condition.woundPenaltyMod || 0;
        result.parryMod += condition.parryMod || 0;
        result.evasionMod += condition.evasionMod || 0;
        result.attackMod += condition.attackMod || 0;

        return result;
      },
      { ...emptyEffects },
    );

    console.log('calced effects', effects);
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

PlayerData[immerable] = true;

module.exports = PlayerData;
