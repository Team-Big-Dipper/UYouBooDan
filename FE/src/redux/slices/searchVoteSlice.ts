import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  searchState: string; //질문: 객체로 들어오려면 어떻게 해야되지? state: {}
}

const initialState: SearchState = {
  searchState: '검색시작',
};

export const searchSlice = createSlice({
  name: 'SearchReasult',
  initialState,
  reducers: {
    goseach: (state, action: PayloadAction<any>) => {
      state.searchState = action.payload;
      //console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { goseach } = searchSlice.actions;

export default searchSlice.reducer;
