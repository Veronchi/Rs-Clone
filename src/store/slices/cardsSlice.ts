import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../interfaces';

const initialState: Array<ICard> = [];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setAllCards:
      (state, action: PayloadAction<ICard[]>): Array<ICard> => [...state, ...action.payload],
    updateCards: (state, action: PayloadAction<ICard[]>): Array<ICard> => [...action.payload],
  },
});

export const { setAllCards, updateCards } = cardsSlice.actions;
export default cardsSlice.reducer;
