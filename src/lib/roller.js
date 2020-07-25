function d10() {
  return Math.floor(Math.random() * 11)
}

function roll(dice, { automaticSuccesses = 0, no10 = false } = {}) {
  const rolls = [...Array(dice)].map(d10).sort();
  
  const rolledSuccesses = rolls.reduce((result, next) => {
    if (next < 7) {
      return result;
    }

    return result + (next === 10 && !no10 ? 2 : 1);
  }, 0);

  return {
    rolls: rolls.join(','),
    successes: rolledSuccesses + automaticSuccesses
  };
}

module.exports = {
  d10,
  roll
};
