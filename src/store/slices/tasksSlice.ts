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
    removeTask: (state, action: PayloadAction<{ taskId: string, columnId: string }>) => {
      const curState = current(state);
      const { columnId, taskId } = action.payload;
      const res = curState[columnId].filter((item) => item.id !== taskId);
      return { ...curState, [columnId]: res };
    },
  },
});

export const { setAllTasks, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
