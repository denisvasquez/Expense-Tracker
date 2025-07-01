import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

// interfaces
import { User, ILogin } from "./IUsers";

const initialValue:User = {
    token: "", username: ""
}

// Example async thunks for creating and logging in a user
export const createUser = createAsyncThunk<User, { username: string; password: string }>(
    "users/createUser",
    async (userData) => {
        // Replace with your API call
        // const response = await api.createUser(userData);
        // return response.data;
        return { token: "dummy_token", username: userData.username };
    }
);

export const loginUser = createAsyncThunk<User, ILogin>(
    "users/loginUser",
    async (loginData, thunkApi) =>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
                JSON.stringify(loginData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            localStorage.setItem('token', response.data.body.token);
            localStorage.setItem('user', JSON.stringify(response.data.body.user));
            return {
                token: response.data.body.token,
                username: response.data.body.user.username
            } as User;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Login failed");
        }

    }
);

const initialState: User = {
    token: "",
    username: ""
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
            });
    }
});

export default usersSlice.reducer;
