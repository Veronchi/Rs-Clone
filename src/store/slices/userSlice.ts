import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

const initialState: IUser = {
  login: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>): IUser => action.payload,
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
