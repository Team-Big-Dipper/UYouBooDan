import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CurrentVoteState {
  isAuthor: boolean;
  isVoted: boolean;
  isClosed: boolean;
  theFirstVoteId: number | null;
}

const initialState: CurrentVoteState = {
  isAuthor: false,
  isVoted: false,
  isClosed: false,
  theFirstVoteId: null,
};

export const currentVoteSlice = createSlice({
  name: 'currentVote',
  initialState,
  reducers: {
    getCurrent: (state, action: PayloadAction<any>) => {
      state.isAuthor = action.payload.isAuthor;
      state.isVoted = action.payload.isVoted;
      state.isClosed = action.payload.isClosed;
      state.theFirstVoteId = action.payload.theFirstVoteId;
      //console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCurrent } = currentVoteSlice.actions;

export default currentVoteSlice.reducer;
