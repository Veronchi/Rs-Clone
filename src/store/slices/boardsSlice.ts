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
    clean: (state): Array<IBoard> => {
      let res = state;
      res = initialState;
      return res;
    },
  },
});

export const { addBoards, clean } = boardsSlice.actions;
export default boardsSlice.reducer;
