import { addDays } from 'date-fns';
import type { Bundle } from '../types/bundle';

export const bundles: Bundle[] = [
  {
    name: 'Hearts of iron',
    category: 'games',
    items: ['Assassin\'s Creed,', 'Spider-man', 'Dead Space'],
    expireDate: addDays(new Date(), 3),
    value: 127,
    price: 12.99,
    currency: '$',
  },
  {
    name: 'Learn Python',
    category: 'books',
    items: ['1', '2', '3'],
    expireDate: addDays(new Date(), 3),
    value: 127,
    price: 12.99,
    currency: '$',
  },
  {
    name: 'Bitdefender',
    category: 'software',
    items: ['1', '2', '3'],
    expireDate: addDays(new Date(), 3),
    value: 127,
    price: 12.99,
    currency: '$',
  }
];