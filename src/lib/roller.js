const d10 = require('./d10');

const ascendingNumericalSort = (l, r) =>  l - r;

function roll(
  dice,
  { automaticSuccesses = 0, noDoubleSuccesses = false, targetNumber = 7, doubleSuccessNumber = 10 } = {},
) {
  if (dice < 1 || dice === undefined || typeof dice !== 'number') {
    throw new Error('Can only roll a positive number of dice.');
  }

  const rolls = [...Array(dice)].map(d10).sort(ascendingNumericalSort);

  const rolledSuccesses = rolls.reduce((result, next) => {
    if (next < targetNumber) {
      return result;
    }

    return result + (next >= doubleSuccessNumber && !noDoubleSuccesses ? 2 : 1);  
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
