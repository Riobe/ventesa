const d10 = require('./d10');

const ascendingNumericalSort = (l, r) => l.roll - r.roll;

function roll(
  dice,
  {
    automaticSuccesses = 0,
    doubles = true,
    targetNumber = 7,
    doubleSuccessNumber = 10,
    reroll = [],
  } = {},
) {
  if (dice < 1 || dice === undefined || typeof dice !== 'number') {
    throw new Error('Can only roll a positive number of dice.');
  }

  const rolls = [];
  let rolledSuccesses = 0;
  for (let i = 0; i < dice; i++) {
    let shouldReroll;
    do {
      // Roll and determine reroll
      const roll = d10();
      shouldReroll = !!reroll.length && reroll.includes(roll);

      // Count successes
      let successes = roll >= targetNumber ? 1 : 0;

      if (doubles && roll >= doubleSuccessNumber) {
        successes *= 2;
      }
      rolledSuccesses += successes;

      rolls.push({ roll, rerolled: shouldReroll, successes });
    } while (shouldReroll);
  }
  rolls.sort(ascendingNumericalSort);

  return {
    rolls,
    successes: rolledSuccesses + automaticSuccesses,
  };
}

module.exports = {
  roll,
};
