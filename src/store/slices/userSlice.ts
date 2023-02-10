import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

const initialState: IUser = {
  login: '',
  email: '',
  password: '',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>):IUser => {
      let res = state;
      res = action.payload;
      res.isAuth = true;
      return res;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
