import { ITask } from '../interfaces';
import { $authHost } from './index';

const createRow = async (text: string, ColumnId: string): Promise<ITask> => {
  const { data } = await $authHost.post('/row/createRow', {
    text,
    ColumnId,
  });

  return data;
};

const getAllRows = async (id: string): Promise<ITask> => {
  const { data } = await $authHost.get('/row/rows', {
    params: {
      columnID: id,
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
  createRow, getAllRows, update, remove,
};
