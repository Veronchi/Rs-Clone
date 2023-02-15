import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../interfaces';

const initialState: Array<ITask> = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setAllTasks: (state, action: PayloadAction<ITask[]>): void => {
      state.push(...action.payload);
    },
  },
});

export const { setAllTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
