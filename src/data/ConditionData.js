const { immerable } = require('immer');

class ConditionData {
  constructor({
    name,
    defenseMod = 0,
    woundPenaltyMod = 0,
    parryMod = 0,
    evasionMod = 0,
    attackMod = 0,
    durationInRounds = 1,
  }) {
    this.name = name;

    this.defenseMod = defenseMod;
    this.woundPenaltyMod = woundPenaltyMod;
    this.parryMod = parryMod;
    this.evasionMod = evasionMod;
    this.attackMod = attackMod;
    this.durationInRounds = durationInRounds;
  }
}

ConditionData[immerable] = true;

module.exports = ConditionData;
