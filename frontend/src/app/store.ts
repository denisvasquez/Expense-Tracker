import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/users/auth.slice";
import ModulesTypes from "./features/modules/modules-types.slice";
import Modules from "./features/modules/modules.slice";
import TransactionsTypes from "./features/transactions/transactions-types.slice";
import Transactions from "./features/transactions/transactions.slice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        modulesTypes: ModulesTypes,
        modules: Modules,
        transactions: Transactions,
        transactionsTypes: TransactionsTypes,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check if needed
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
