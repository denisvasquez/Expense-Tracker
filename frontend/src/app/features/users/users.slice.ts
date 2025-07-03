import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

// interfaces
import { User, ILogin, IRegister } from "@types/auth";

export const registerUser = createAsyncThunk<User, IRegister>(
    "users/createUser",
    async (registerData, thunkApi) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,
                JSON.stringify(registerData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return {
                message: response.data.message,
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

export const loginUser = createAsyncThunk<User, ILogin>(
    "users/loginUser",
    async (loginData, thunkApi) => {
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
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ message: string }>) => {})
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
            });
    }
});

export default usersSlice.reducer;
