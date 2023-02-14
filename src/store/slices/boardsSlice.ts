import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces';

const initialState: Array<IBoard> = [];

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoards: (state, action: PayloadAction<IBoard[]>): void => {
      state.push(...action.payload);
    },
  },
});

export const { addBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
