import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IsAuthState {
  isAuth: boolean | null;
}

const initialState: IsAuthState = {
  isAuth: false,
};
console.log('isAuthSlice 로 들어옴!');
console.log(initialState);
export const isAuthSlice = createSlice({
  name: 'currentAuth',
  initialState,
  reducers: {
    isAuthTrue: (state, action: PayloadAction<any>) => {
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { isAuthTrue } = isAuthSlice.actions;
export default isAuthSlice.reducer;
