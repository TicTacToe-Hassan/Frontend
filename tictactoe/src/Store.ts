import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './Slices/BoardSlice';
import userReducer from './Slices/UserSlice'
import gameReducer from './Slices/GameSlice'

const reducer = {
  board: boardReducer,
  user: userReducer,
  game: gameReducer
}

export const store = configureStore({reducer })

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({reducer, preloadedState})
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch