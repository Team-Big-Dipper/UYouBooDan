import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface VoteListState {
  sortedVoteState: string[];
}

const initialState: VoteListState = {
  sortedVoteState: ['테슷트'],
};

export const sortReadVoteSlice = createSlice({
  name: 'sortReadVote',
  initialState,
  reducers: {
    getnewdata: (state, action: PayloadAction<any>) => {
      state.sortedVoteState = [...action.payload];
      //console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getnewdata } = sortReadVoteSlice.actions;

export default sortReadVoteSlice.reducer;
