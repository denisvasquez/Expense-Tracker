import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { ITransactionType } from '@types/transactions';

export const getTransactionTypes = createAsyncThunk<ITransactionType[], void>(
    'transactions/getTransactionTypes',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/transactions/types`,
            );
            return response.data.body;
        } catch (error) {
            console.error('Failed to fetch transaction types');
            return thunkApi.rejectWithValue(
                error.response?.data.message || 'Failed to fetch transaction types',
            );
        }
    },
);

const initialState: ITransactionType[] = [];

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTransactionTypes.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
                return action.payload;
            })
            .addCase(getTransactionTypes.rejected, (state, action) => {
                console.error('Failed to fetch transaction types:', action.error.message);
            });
    },
});

export default transactionsSlice.reducer;