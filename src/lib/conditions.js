const ConditionData = require('../data/ConditionData');

const BuiltInConditions = {
  Prone: new ConditionData({
    name: 'Prone',
    parryMod: -1,
    evasionMod: -2,
    attackMod: -3,
  }),

  // Cover
  LightCover: new ConditionData({
    name: 'Light Cover',
    defenseMod: 1,
  }),

  HeavyCover: new ConditionData({
    name: 'Heavy Cover',
    defenseMod: 1,
  }),

  // Poisons
  ArrowFrogVenom: new ConditionData({
    name: 'Arrow Frog Venom',
    woundPenaltyMod: -2,
  }),

  Arsenic: new ConditionData({
    name: 'Arsenic',
    woundPenaltyMod: 0,
  }),

  Curare: new ConditionData({
    name: 'Curare',
    woundPenaltyMod: -2,
  }),

  Hemlock: new ConditionData({
    name: 'Hemlock',
    woundPenaltyMod: -4,
  }),

  SnakeVenom: new ConditionData({
    name: 'Snake Venom',
    woundPenaltyMod: -3,
  }),

  YoziVenom: new ConditionData({
    name: 'Yozi Venom',
    woundPenaltyMod: -5,
  }),
};

module.exports = {
  BuiltInConditions,
};
