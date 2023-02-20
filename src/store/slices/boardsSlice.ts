import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces';

const initialState: Array<IBoard> = [];

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoards:
      (state, action: PayloadAction<IBoard[]>): Array<IBoard> => [...state, ...action.payload],
    updateBoards: (state, action: PayloadAction<IBoard[]>): Array<IBoard> => [...action.payload],
  },
});

export const { addBoards, updateBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
