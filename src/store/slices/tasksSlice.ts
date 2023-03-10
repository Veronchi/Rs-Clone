import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
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
    updateTask: (state, action: PayloadAction<{ task: ITask, columnId: string }>) => {
      const curState = current(state);
      const { columnId, task } = action.payload;
      const res = curState[columnId].map((item) => {
        if (item.id === task.id) {
          return task;
        }
        return item;
      });
      return { ...curState, [columnId]: res };
    },

    searchUpdateTask: (state, action: PayloadAction<ITask[]>) => {
      const curState = current(state);
      const obj: ITaskMap = {};
      action.payload.forEach((item) => {
        if (!obj[item.ColumnId]) obj[item.ColumnId] = [item];
        else obj[item.ColumnId].push(item);
      });
      return { ...curState, ...obj };
    },

    removeTask: (state, action: PayloadAction<{ taskId: string, columnId: string }>) => {
      const curState = current(state);
      const { columnId, taskId } = action.payload;
      const res = curState[columnId].filter((item) => item.id !== taskId);
      return { ...curState, [columnId]: res };
    },
  },
});

export const {
  setAllTasks, updateTask, removeTask, searchUpdateTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
