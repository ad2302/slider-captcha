import { randInt } from './generate';

test('randInt generates ints within range', () => {
  expect([3,4].includes(randInt(3, 4)));
});
