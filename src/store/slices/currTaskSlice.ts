import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../interfaces';

const initialState: ITask = {
  id: '',
  text: '',
  cover: '',
  ColumnId: '',
  BoardId: '',
};

const currTaskSlice = createSlice({
  name: 'currTask',
  initialState,
  reducers: {
    addCurrTask: (state, action: PayloadAction<ITask>): ITask => action.payload,
  },
});

export const { addCurrTask } = currTaskSlice.actions;
export default currTaskSlice.reducer;
