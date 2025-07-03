import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interfaces
import { IModulesTypes } from "./IModules";

export const modulesTypes = createAsyncThunk<IModulesTypes[], void>("modulesTypes/getModulesTypes", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/modules/types`);
        return response.data.body;
    } catch (error) {
        console.error("Failed to fetch modules types");
        throw error;
    }
})

const initialState: IModulesTypes[] = [];

export const modulesTypesSlice = createSlice({
    name: "modulesTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(modulesTypes.fulfilled, (state, action: PayloadAction<IModulesTypes[]>) => {
                return action.payload;
            })
            .addCase(modulesTypes.rejected, (state, action) => {
                console.error("Failed to fetch modules types:", action.error.message);
            });
    }
});

export default modulesTypesSlice.reducer;