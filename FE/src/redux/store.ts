import { configureStore } from '@reduxjs/toolkit';
import CurrentVoteSlice from './slices/currentVoteSlice';

export const store = configureStore({
  reducer: {
    currentVote: CurrentVoteSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
