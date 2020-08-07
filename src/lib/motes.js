const ExaltType = require('../enums/exalted-type');

function getMoteMaxes(exaltType, essence) {
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

  switch (exaltType) {
    // Abyssa/Infernal *are* corrupted solar souls, so just as powerful.
    case ExaltType.SOLAR:
    case ExaltType.ABYSSAL:
    case ExaltType.INFERNAL:
      return {
        personal: essence * 3 + 10,
        peripherial: essence * 7 + 26
      };

    case ExaltType.LUNAR:
      return {
        personal: 15 + essence,
        peripherial: essence * 4 + 34
      };
      break;

    // Defaulting to TERRESTRIAL until we know other forumlas.
    case ExaltType.TERRESTRIAL:
    case ExaltType.SIDEREAL:
    case ExaltType.ALCHEMICAL:
    case ExaltType.LIMINAL:
    case ExaltType.GETIMIAN:
    case ExaltType.EXIGENT:
    case ExaltType.CHOSEN:
      return {
        personal: 11 + essence,
        peripherial: essence * 4 + 26
      };

    default:
      return {
        personal: 0,
        peripherial: 0
      };
  }
}

module.exports = {
  getMoteMaxes
};
