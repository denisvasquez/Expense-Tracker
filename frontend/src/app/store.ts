import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/users/auth.slice";
import ModulesTypes from "./features/modules/modules-types.slice";
import Modules from "./features/modules/modules.slice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        modulesTypes: ModulesTypes,
        modules: Modules,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check if needed
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
