import { roll } from './roller';

const { any, arrayContaining } = expect;

describe('roller', () => {
  it('should roll a single dice if told to.', async () => {
    const result = roll(1);

    expect(result).toBeTruthy();
    expect(typeof result).toBe('object');
    expect(result).toMatchObject({
      rolls: arrayContaining([any(Number)]),
      rollsString: any(String),
      successes: any(Number),
    });
  });

  it('should add automatic successes.', async () => {
    const testAutoSuccesses = 1;

    const result = roll(1, { automaticSuccesses: testAutoSuccesses });

    expect(result.rolls).toHaveLength(1);

    let rolledSuccesses = 0;
    const rolled = result.rolls[0];
    if (rolled > 6) {
      if (rolled === 10) {
        rolledSuccesses = 2;
      } else {
        rolledSuccesses = 1;
      }
    }

    expect(result.successes).toBe(testAutoSuccesses + rolledSuccesses);
  });
});
