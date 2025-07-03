import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// interfaces
import { IModules } from '@types/modules'

export const getModules = createAsyncThunk<IModules[], void>(
    'modules/getModules',
    async (userId, thunkApi) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/modules/${userId}`,
            )
            return response.data.body
        } catch (error) {
            console.error('Failed to fetch modules')
            return thunkApi.rejectWithValue(
                error.response?.data.message || 'Failed to fetch modules',
            )
        }
    },
)

export const createModule = createAsyncThunk<IModules, Partial<IModules>>(
    'modules/createModule',
    async (moduleData, thunkApi) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/modules/add`,
                moduleData,
            )
            return response.data.body
        } catch (error) {
            console.error('Failed to create module:', error)
            return thunkApi.rejectWithValue(error.response?.data.message || 'Failed to create module')
        }
    },
)

const initialState: IModules[] = []

export const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(
                getModules.fulfilled,
                (state, action: PayloadAction<IModules[]>) => {
                    return action.payload
                },
            )
            .addCase(getModules.rejected, (state, action) => {
                console.error('Failed to fetch modules:', action.error.message)
            })
    },
})

export default modulesSlice.reducer
