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
    clean: (state): Array<ITask> => {
      let res = state;
      res = initialState;
      return res;
    },
  },
});

export const { setAllTasks, clean } = tasksSlice.actions;
export default tasksSlice.reducer;
