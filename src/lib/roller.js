const d10 = require('./d10');

const ascendingNumericalSort = (l, r) => l.roll - r.roll;

function roll(
  dice,
  {
    automaticSuccesses = 0,
    noDoubleSuccesses = false,
    targetNumber = 7,
    doubleSuccessNumber = 10,
    reroll = []
  } = {},
) {
  if (dice < 1 || dice === undefined || typeof dice !== 'number') {
    throw new Error('Can only roll a positive number of dice.');
  }

  // const rolls = [...Array(dice)].map(d10).sort(ascendingNumericalSort);
  const rolls = [];
  for (let i = 0; i < dice; i++) {
    let shouldReroll;
    do {
      const roll = d10();
      shouldReroll = reroll.includes(roll);
      rolls.push({ roll, rerolled: shouldReroll });
    } while (shouldReroll);
   
  }
  rolls.sort(ascendingNumericalSort);

  const rolledSuccesses = rolls.reduce((result, { roll, rerolled }) => {
    if (roll < targetNumber || rerolled) {
      return result;
    }

    return result + (roll >= doubleSuccessNumber && !noDoubleSuccesses ? 2 : 1);
  }, 0);

  return {
    rolls,
    successes: rolledSuccesses + automaticSuccesses,
  };
}

module.exports = {
  roll,
};
