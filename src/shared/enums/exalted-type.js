const exaltedType = {
  solar: 'solar',
  lunar: 'lunar',
  terrestrial: 'terrestrial',
  sidereal: 'sidereal',
  abyssal: 'abyssal',
  alchemical: 'alchemical',
  infernal: 'infernal',
  liminal: 'liminal',
  getimian: 'getimian',
  exigent: 'exigent',
  // for unknown exalted type.
  chosen: 'chosen',
};

module.exports = {
  exaltedType,
  exaltedTypeArray: Object.values(exaltedType),
};
