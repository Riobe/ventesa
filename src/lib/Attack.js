const { AGAINST_DEFENSE } = require('./constants');

class Attack {
  constructor({
    name,
    type,
    accuracy,
    damage,
    defense,
    overwhelming,
    specialized = false
  }) {
    this.name = name;

    if (type) {
      damage = damage || type.damage;
      overwhelming =  overwhelming || type.overwhelming;
    }

    if (damage < 1 || overwhelming < 0) {
      throw new Error('Must have both damage and overwhelming defined to make an Attack.');
    }

    this.accuracy = accuracy + (specialized ? 1 : 0);
    this.damage = damage;
    this.defense = defense;
    this.overwhelming = overwhelming;
  }

  witheringDamagePool(successes, againstCharacter, { againstDefense = AGAINST_DEFENSE.HIGHEST } = {}) {
    let defense;
    switch (againstDefense) {
      case AGAINST_DEFENSE.HIGHEST:
        defense = againstCharacter.defense + againstCharacter.weaponDefenseBonus;
        break;

      case AGAINST_DEFENSE.UNBLOCKABLE:
        defense = againstCharacter.evasion + againstCharacter.weaponDefenseBonus;
        break;

      case AGAINST_DEFENSE.UNDODGEABLE:
        defense = againstCharacter.parry + againstCharacter.weaponDefenseBonus;
        break;

      case AGAINST_DEFENSE.NEGATED:
        defense = 0;
        break;

      default:
        throw new Error('Attack has an unsupported type of defense calculation.');
    }

    const thresholdSuccesses = Math.max(successes - defense, 0);

    return Math.max(this.damage + thresholdSuccesses - againstCharacter.soak, this.overwhelming);
  }
}

module.exports = Attack;
