import { IBoard } from '../interfaces';
import { $authHost } from './index';

const createBoard = async (title: string, background: string): Promise<IBoard> => {
  const { data } = await $authHost.post('/board/createBoard', {
    title,
    background,
  });

  return data;
};

const getAllBoards = async (): Promise<IBoard> => {
  const { data } = await $authHost.get('/board/boards');

  return data;
};

export { createBoard, getAllBoards };
