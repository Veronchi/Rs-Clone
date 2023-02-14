import { ICard } from '../../interfaces';

export const cardArray: ICard[] = [
  {
    id: 1,
    title: 'To Do',
    order: 1,
    tasks: [
      { key: 1, name: 'Pokushat' },
      { key: 2, name: 'Porabotat' },
    ],
  },
  {
    id: 2,
    title: 'In Process',
    order: 2,
    tasks: [
      { key: 3, name: 'Pokushat' },
      { key: 4, name: 'Pochitat knigu' },
      { key: 5, name: 'Popit kofeek' },
    ],
  },
  {
    id: 3,
    title: 'Review',
    order: 3,
    tasks: [],
  },
  {
    id: 4,
    title: 'Done',
    order: 4,
    tasks: [
      { key: 6, name: 'Poest morojennoe' },
      { key: 7, name: 'Viuchit React' },
    ],
  },
];
