import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/users.slice";
import modulesTypes from "./features/modules/modules-types.slice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        modulesTypes: modulesTypes,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check if needed
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
