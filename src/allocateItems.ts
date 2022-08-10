import findMinimum from './findMinimum';

type Requests<T> = {
  [recipient: string]: T[]
};

type Result<T> = {
  [recipient: keyof Requests<T>]: T[]
}

export const allocateItems = <T extends unknown>(getRandom: () => number) => (requests: Requests<T>): Result<T> => {
  const recipients = Object.keys(requests);

  const items = recipients
    .flatMap((name) => requests[name])
    .filter((value, index, array) => array.indexOf(value) === index);

  return items.reduce((result, item) => {
    const possibilities = findMinimum(recipients, (name) => {
      const index = requests[name].indexOf(item);

      return index === -1 ? 1000000 : index + (result[name] || []).length;
    })

    const recipient = recipients[possibilities[Math.floor(getRandom() * possibilities.length)]];

    return { ...result, [recipient]: [...(result[recipient] || []), item]}
  }, recipients.reduce((obj, name) => ({ ...obj, [name]: []}), {}));
};

export default allocateItems(Math.random);