import { ICard } from '../../interfaces';

export const cardArray: ICard[] = [
  {
    id: 1,
    title: 'To Do',
    tasks: [
      { key: 1, name: 'Pokushat' },
      { key: 2, name: 'Porabotat' },
    ],
  },
  {
    id: 2,
    title: 'In Process',
    tasks: [
      { key: 1, name: 'Pokushat' },
      { key: 2, name: 'Pochitat knigu' },
      { key: 3, name: 'Popit kofeek' },
    ],
  },
  {
    id: 3,
    title: 'Review',
    tasks: [],
  },
  {
    id: 4,
    title: 'Done',
    tasks: [
      { key: 1, name: 'Poest morojennoe' },
      { key: 2, name: 'Viuchit React' },
    ],
  },
];

export const newCard = {
  id: Math.ceil(Math.random() * 10000),
  title: '',
  tasks: [],
};
