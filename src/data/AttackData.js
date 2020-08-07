const DefenseCalculation = require('../enums/defence-calculation');
const RangeIncrement = require('../enums/range-increment');
const Abilities = require('../enums/abilities');
const Attributes = require('../enums/attributes');

class AttackData {
  constructor({
    name,
    type,
    ability,
    accuracyAttribute = Attributes.dexterity,
    damageAttribute = Attributes.strength,
    range = RangeIncrement.close,
    extraAccuracy = 0,
    extraDamage = 0,
    extraDefense = 0,
    extraOverwhelming = 0,
    specialized = false
  }) {
    if (!name) {
      throw new Error('Cannot create an Attack without a name.');
    }

    this.name = name;

    if (!type) {
      throw new Error('Must declare a type');
    }

    if (
      (type.damage < 1 && extraDamage < 1) ||
      (type.overwhelming < 1 && extraOverwhelming < 1)
    ) {
      throw new Error(
        'Must have both damage and overwhelming defined to make an Attack.'
      );
    }

    if (!Abilities[ability]) {
      throw new Error('Must give an ability to attack with.');
    }

    this.accuracy = type.accuracy;
    this.damage = type.damage;
    this.defense = type.defense;
    this.overwhelming = type.overwhelming;

    this.ability = ability;
    this.accuracyAttribute = accuracyAttribute;
    this.damageAttribute = damageAttribute;

    this.extraAccuracy = extraAccuracy;
    this.extraDamage = extraDamage;
    this.extraDefense = extraDefense;
    this.extraOverwhelming = extraOverwhelming;

    this.specialized = specialized;
  }
}

module.exports = AttackData;
