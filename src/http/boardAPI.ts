import { IBoard } from '../interfaces';
import { $authHost } from './index';

const createBoard = async (title: string, background: string): Promise<IBoard> => {
  const { data } = await $authHost.post('/board/createBoard', {
    title,
    background,
  });

  return data;
};

const getAllBoards = async (): Promise<IBoard[]> => {
  const { data } = await $authHost.get('/board/boards');

  return data;
};

const update = async (id: string, title: string, background: string): Promise<void> => {
  await $authHost.put('/board', {
    id,
    title,
    background,
  });
};

const remove = async (id: string): Promise<void> => {
  await $authHost.delete('/board', {
    params: {
      id,
    },
  });
};

export {
  createBoard, getAllBoards, update, remove,
};
