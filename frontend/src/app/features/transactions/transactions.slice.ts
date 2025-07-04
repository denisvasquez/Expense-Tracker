import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { ITransaction } from '@types/transactions';

export const createTransaction = createAsyncThunk<ITransaction, Itransaction>("transactions/createTransaction", async (transactionsSlice, thunkApi) => {
    try {
        console.log(transactionsSlice);
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/transactions`,
            transactionsSlice,
        );
        return response.data.body;
    } catch (error) {
        console.error('Failed to create transaction');
        return thunkApi.rejectWithValue(
            error.response?.data.message || 'Failed to create transaction',
        );
    }
})

const initialState: ITransaction[] = [];

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createTransaction.fulfilled, (state, action: PayloadAction<ITransaction>) => {
                state.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                console.error('Failed to create transaction:', action.error.message);
            });
    },
})

export default transactionsSlice.reducer;