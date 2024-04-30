import { configureStore } from "@reduxjs/toolkit";
import petReducer from "./stateSlice/petSlice";

export const store = configureStore({
    reducer: {
        pet: petReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch