const d10 = require('./d10');

function roll(
  dice,
  { automaticSuccesses = 0, no10 = false, targetNum = 7 } = {},
) {
  if (dice < 1 || dice === undefined || typeof dice !== 'number') {
    throw new Error('Can only roll a positive number of dice.');
  }

  const rolls = [...Array(dice)].map(d10).sort();

  const rolledSuccesses = rolls.reduce((result, next) => {
    if (next < targetNum) {
      return result;
    }

    return result + (next === 10 && !no10 ? 2 : 1);
  }, 0);

  return {
    rolls: rolls,
    rollsString: rolls.join(','),
    successes: rolledSuccesses + automaticSuccesses,
  };
}

module.exports = {
  d10,
  roll,
};
