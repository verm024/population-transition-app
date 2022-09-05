import { configureStore } from "@reduxjs/toolkit";

// Reducer
import { globalReducer } from "./reducers";

const store = configureStore({ reducer: globalReducer, devTools: true });

export type RootState = ReturnType<typeof store.getState>;
export default store;
