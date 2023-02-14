import { ICard } from '../interfaces';
import { $authHost } from './index';

const createCard = async (title: string, boardId: string): Promise<ICard> => {
  const { data } = await $authHost.post('/column/createColumn', {
    title,
    boardId,
  });

  return data;
};

const getAllCards = async (id: string): Promise<ICard> => {
  const { data } = await $authHost.post('/column/columns', {
    data: {
      boardID: id,
    },
  });

  return data;
};

const update = async (): Promise<void> => {
  await $authHost.patch('/column/');
};

const remove = async (): Promise<void> => {
  await $authHost.delete('/column/');
};

export {
  createCard, getAllCards, update, remove,
};
