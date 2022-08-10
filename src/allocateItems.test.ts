import test from 'ava';

import allocateItems, { allocateItems as baseAllocateItems } from './allocateItems';

test('allocate items should give uncontested items to the person who wants them', t => {
  const requests = {
    cruella: ['puppies', 'fur coats'],
    ursula: ['trident']
  };

  const result = allocateItems(requests);

  t.deepEqual(result, requests);
});

test('allocate items should handle uncomplicated conflicts', t => {
  const requests = {
    sam: ['unicorn', 'mermaid'],
    kat: ['mermaid', 'unicorn']
  };

  const expected = {
    sam: ['unicorn'],
    kat: ['mermaid']
  };

  t.deepEqual(allocateItems(requests), expected);
});

test('it should try to allocate conflicts as even as possibly', t => {
  const requests = {
    sam: ['unicorn', 'mermaid'],
    kat: ['unicorn', 'mermaid']
  };

  t.deepEqual(allocateItems(requests).sam.length, 1);
  t.deepEqual(allocateItems(requests).kat.length, 1);
});

test('it should resort to random allocation when necessary', t => {
  const requests = {
    sam: ['unicorn'],
    kat: ['unicorn']
  };

  t.deepEqual(baseAllocateItems(() => 0.1)(requests).sam.length, 1);
  t.deepEqual(baseAllocateItems(() => 0.1)(requests).kat.length, 0);
  t.deepEqual(baseAllocateItems(() => 0.9)(requests).sam.length, 0);
  t.deepEqual(baseAllocateItems(() => 0.9)(requests).kat.length, 1);
});