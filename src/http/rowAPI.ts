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
  const { data } = await $authHost.post('/row/rows', {
    data: {
      columnID: id,
    },
  });

  return data;
};

const update = async (): Promise<void> => {
  await $authHost.patch('/row/');
};

const remove = async (): Promise<void> => {
  await $authHost.delete('/row/');
};

export {
  createRow, getAllRows, update, remove,
};
