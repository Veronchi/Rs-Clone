import { ITask } from '../interfaces';
import { $authHost } from './index';

const createRow = async (text: string, ColumnId: string, BoardId: string): Promise<ITask> => {
  const { data } = await $authHost.post('/row/createRow', {
    text,
    ColumnId,
    BoardId,
  });

  return data;
};

const getAllRows = async (id: string): Promise<Array<ITask>> => {
  const { data } = await $authHost.get('/row/rows', {
    params: {
      columnID: id,
    },
  });

  return data;
};

const getTasksByBoardId = async (id: string): Promise<Array<ITask>> => {
  const { data } = await $authHost.get('/row/rowsByBoardId', {
    params: {
      boardId: id,
    },
  });

  return data;
};

const update = async (id: string, title: string): Promise<void> => {
  await $authHost.patch('/row', {
    id,
    title,
  });
};

const remove = async (id: string): Promise<void> => {
  await $authHost.delete('/row', {
    params: {
      id,
    },
  });
};

export {
  createRow, getAllRows, getTasksByBoardId, update, remove,
};
