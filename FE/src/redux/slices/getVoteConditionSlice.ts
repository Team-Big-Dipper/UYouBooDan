import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface getVoteConditionState {
  mobileCondition: string | null;
}

const initialState: getVoteConditionState = {
  mobileCondition: 'all',
};

export const getVoteConditionSlice = createSlice({
  name: 'currentVote',
  initialState,
  reducers: {
    getVoteCondition: (state, action: PayloadAction<any>) => {
      state.mobileCondition = action.payload.mobileCondition;
      //console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getVoteCondition } = getVoteConditionSlice.actions;

export default getVoteConditionSlice.reducer;
