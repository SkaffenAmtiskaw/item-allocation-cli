// finds the index of an array with the minimum value
type MinimumFxnParams<T extends unknown> = [number[]] | [T[], (value: T, index: number, array: T[]) => number]

const findMinimum = <T extends unknown>(...args: MinimumFxnParams<T>): number[] => {
  const [arr, cb] = args;

  // I'm not sure why I had to use the `as` here - I thought TS would be able to pick them up from the union type up above.
  const array = cb ? (arr as T[]).map(cb): arr as number[];

  return array.reduce((result, value, index) => (
    value === Math.min(...array) ? [...result, index] : result
  ), []);
}

export default findMinimum;