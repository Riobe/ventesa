exports.ATTACK_TYPE = {
  MORTAL_LIGHT_MELEE: { accuracy: 4, damage: 7, defense: 0, overwhelming: 1 },
  MORTAL_MEDIUM_MELEE: { accuracy: 2, damage: 9, defense: 1, overwhelming: 1 },
  MORTAL_HEAVY_MELEE: { accuracy: 0, damage: 11, defense: 0, overwhelming: 1 },
  ARTIFACT_LIGHT_MELEE: { accuracy: 5, damage: 10, defense: 0, overwhelming: 3 },
  ARTIFACT_MEDIUM_MELEE: { accuracy: 3, damage: 12, defense: 1, overwhelming: 4 },
  ARTIFACT_HEAVY_MELEE: { accuracy: 1, damage: 14, defense: 0, overwhelming: 5 }
};

exports.ATTACK_TYPE.UNARMED = exports.ATTACK_TYPE.MORTAL_LIGHT_MELEE;

exports.AGAINST_DEFENSE = {
  HIGHEST: 'HIGHEST',
  UNBLOCKABLE: 'UNBLOCKABLE',
  UNDODGEABLE: 'UNDODGEABLE',
  NEGATED: 'NEGATED'
};

exports.DAMAGE_TYPE = {
  NONE: '',
  BASHING: 'BASHING',
  LETHAL: 'LETHAL',
  AGGREVATED: 'AGGREVATED'
};
