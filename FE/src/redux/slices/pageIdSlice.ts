import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface pageIdState {
  pageIdState: number;
}

const initialState: pageIdState = {
  pageIdState: 1,
};

export const pageIdSlice = createSlice({
  name: 'pageIdSlice',
  initialState,
  reducers: {
    getPageId: (state, action: PayloadAction<any>) => {
      state.pageIdState = action.payload;
      //console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPageId } = pageIdSlice.actions;

export default pageIdSlice.reducer;
