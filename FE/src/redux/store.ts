import { configureStore } from '@reduxjs/toolkit';
import sortReadVoteReducer from './slices/sortReadVoteSlice';
import searchVoteReducer from './slices/searchVoteSlice';

export const store = configureStore({
  reducer: {
    sortedVote: sortReadVoteReducer,
    searchVote: searchVoteReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
