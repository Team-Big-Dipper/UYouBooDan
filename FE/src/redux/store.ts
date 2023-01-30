import { configureStore } from '@reduxjs/toolkit';
import pageIdReducer from './slices/pageIdSlice';
import CurrentVoteSlice from './slices/currentVoteSlice';

export const store = configureStore({
  reducer: {
    pageId: pageIdReducer,
    currentVote: CurrentVoteSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;