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
    const targetNumber = 5;
    d10.mockReturnValue(5);

    const result = roll(1, { targetNumber });

    expect(result.successes).toBe(1);
  });

  it('should make 10s count as 1 success not 2.', async () => {
    const noDoubleSuccesses = true;
    d10.mockReturnValue(10);

    const result = roll(1, { noDoubleSuccesses });

    expect(result.successes).toBe(1);
  });


  it('should double dice successes when rolling a custom double dice number from that number forwards.', async () => {
    const doubleSuccessNumber = 9;
    d10.mockReturnValue(9, 10);

    const result = roll(2, { doubleSuccessNumber });

    expect(result.successes).toBe(4);
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

  it('should throw an error if called with no dice to roll.', async () => {
    expect(() => {
      roll();
    }).toThrowError('Can only roll a positive number of dice.');
  });

  it('should throw an error if told to roll zero dice.', async () => {
    expect(() => {
      roll(0);
    }).toThrowError('Can only roll a positive number of dice.');
  });

  it('should throw an error if told to roll negative dice.', async () => {
    expect(() => {
      roll(-5);
    }).toThrowError('Can only roll a positive number of dice.');
  });

  it('should throw an error if to roll a non-number value of dice.', async () => {
    expect(() => {
      roll('EAT IT SUCKAS');
    }).toThrowError('Can only roll a positive number of dice.');
  });
});
