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
  },
});

export const { setAllCards } = cardsSlice.actions;
export default cardsSlice.reducer;
