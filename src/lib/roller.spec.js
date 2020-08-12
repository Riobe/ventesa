jest.mock('./d10');

const { roll } = require('./roller');
const d10 = require('./d10');

const { any } = expect;

describe('roller', () => {
  beforeEach(() => {
    d10.mockClear();
  });

  it('should roll a single dice if told to.', async () => {
    d10.mockReturnValue(8);

    const result = roll(1);

    expect(result).toBeTruthy();
    expect(typeof result).toBe('object');
    expect(result).toMatchObject({
      rolls: [8],
      rollsString: any(String),
      successes: any(Number),
    });
  });

  it('should return a success when rolling a custom target number.', async () => {
    const targetNum = 5;
    d10.mockReturnValue(5);

    const result = roll(1, { targetNum });

    expect(result.successes).toBe(1);
  });

  it('should not return a success when rolling under a custom target number.', async () => {
    const targetNum = 5;
    d10.mockReturnValue(3);

    const result = roll(1, { targetNum });

    expect(result.successes).toBe(0);
  });

  it('should add automatic successes.', async () => {
    const testAutoSuccesses = 1;
    d10.mockReturnValue(8);

    const result = roll(1, { automaticSuccesses: testAutoSuccesses });

    expect(result.successes).toBe(2);
  });
});
