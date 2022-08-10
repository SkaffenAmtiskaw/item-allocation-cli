import test from 'ava';

import findMinimum from './findMinimum';

test('it should find the index of the minimum value in an array', t => {
  t.deepEqual(findMinimum([3, 1, 2]), [1]);
});

test('it should take an optional callback to find the minimum value', t => {
  const result = findMinimum(['foo', 'bar', 'baz'], (value: 'foo' | 'bar' | 'baz') => {
    const values = {
      foo: 3,
      bar: 1,
      baz: 2
    }

    return values[value]
  });

  t.deepEqual(result, [1]);
});

test('it should return an array of every index that matches the minimum', t => {
  t.deepEqual(findMinimum([3, 1, 2, 1]), [1, 3]);
});