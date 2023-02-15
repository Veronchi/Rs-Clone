import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../interfaces';

const initialState: Array<ICard> = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setAllCards: (state, action: PayloadAction<ICard[]>): void => {
      state.push(...action.payload);
    },
    clean: (state): Array<ICard> => {
      let res = state;
      res = initialState;
      return res;
    },
  },
});

export const { setAllCards, clean } = cardsSlice.actions;
export default cardsSlice.reducer;
