import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// interfaces
import { IModulesTypes } from '@types/modules'

export const getModulesTypes = createAsyncThunk<IModulesTypes[], void>(
    'modulesTypes/getModulesTypes',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/modules/types`,
            )
            return response.data.body
        } catch (error) {
            console.error('Failed to fetch modules types')
            return thunkApi.rejectWithValue(
                'Failed to fetch modules types, please try again.',
            )
        }
    },
)

const initialState: IModulesTypes[] = []

export const modulesTypesSlice = createSlice({
    name: 'modulesTypes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getModulesTypes.fulfilled,
                (state, action: PayloadAction<IModulesTypes[]>) => {
                    return action.payload
                },
            )
            .addCase(getModulesTypes.rejected, (state, action) => {
                console.error(
                    'Failed to fetch modules types:',
                    action.error.message,
                )
            })
    },
})

export default modulesTypesSlice.reducer
