import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask, ITaskMap } from '../../interfaces';

const initialState: ITaskMap = {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setAllTasks: (state, action: PayloadAction<Array<ITask>>): ITaskMap => {
      const obj:ITaskMap = {};
      action.payload.forEach((item: ITask) => {
        if (!obj[item.ColumnId]) obj[item.ColumnId] = [item];
        else obj[item.ColumnId].push(item);
      });
      return { ...state, ...obj };
    },
  },
});

export const { setAllTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
