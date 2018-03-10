/* Created by Alexander Nuikin (nukisman@gmail.com). */

import { extend, set } from './index';

test('set', () => {
  const src = {
    name: 'Alex',
    info: {
      greeting: 'Hello',
      description: 'I am developer'
    },
    address: {
      country: 'Russia',
      city: 'Moscow'
    },
    friends: [{ name: 'Vasya', age: 25 }, { name: 'Fedor', age: 33 }]
  };
  const replacement = {
    name: 'Alex',
    info: {
      greeting: 'Hello',
      description: 'I am developer'
    },
    address: {
      country: 'Russia',
      city: 'Moscow'
    },
    friends: [
      { name: 'Vasya', age: 3 }, // The ONLY actual change!
      { name: 'Fedor', age: 33 }
    ]
  };

  const res = set(src, replacement);

  expect(res).toEqual(replacement); // Correct result

  expect(res === src).toBe(false);
  expect(res.info === src.info).toBe(true); // Same reference!
  expect(res.address === src.address).toBe(true); // Same reference!
  expect(res.friends === src.friends).toBe(false);
  expect(res.friends[0] === src.friends[0]).toBe(false);
  expect(res.friends[1] === src.friends[1]).toBe(true); // Same reference!
});

test('extend', () => {
  const src = {
    name: 'Alex',
    info: {
      greeting: 'Hello',
      description: 'I am developer'
    },
    address: {
      country: 'Russia',
      city: 'Moscow'
    },
    friends: [{ name: 'Vasya', age: 25 }, { name: 'Fedor', age: 33 }]
  };
  const extension = {
    friends: [
      { name: 'Vasya', age: 3 }, // The ONLY actual change!
      { name: 'Fedor', age: 33 }
    ]
  };

  const res = extend(src, extension);

  expect(res).toEqual({ ...src, ...extension }); // Correct result

  expect(res === src).toBe(false);
  expect(res.info === src.info).toBe(true); // Same reference!
  expect(res.address === src.address).toBe(true); // Same reference!
  expect(res.friends === src.friends).toBe(false);
  expect(res.friends[0] === src.friends[0]).toBe(false);
  expect(res.friends[1] === src.friends[1]).toBe(true); // Same reference!
});
