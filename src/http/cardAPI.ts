import { ICard } from '../interfaces';
import { $authHost } from './index';

const createCard = async (title: string, BoardId: string): Promise<ICard> => {
  const { data } = await $authHost.post('/column/createColumn', {
    title,
    BoardId,
  });

  return data;
};

const getAllCards = async (id: string): Promise<Array<ICard>> => {
  const { data } = await $authHost.get('/column/columns', {
    params: {
      boardID: id,
    },
  });

  return data;
};

const update = async (id: string, title: string): Promise<void> => {
  await $authHost.put('/column', {
    id,
    title,
  });
};

const remove = async (id: string): Promise<void> => {
  await $authHost.delete('/column', {
    params: {
      id,
    },
  });
};

export {
  createCard, getAllCards, update, remove,
};
