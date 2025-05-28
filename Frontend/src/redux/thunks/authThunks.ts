// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Frontend\src\redux\thunks\authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { LoginFormData, SignUpFormData } from "@/utils/authValidation";
import { AuthResponse } from "@/types/IUser";

export const signUp = createAsyncThunk<AuthResponse, SignUpFormData, { rejectValue: string }>(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", userData);
      const { email } = response.data;
      return {
        user: {
          id: "", // No ID returned from signup
          email,
          userName: userData.userName,
          joinedDate: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Signup failed");
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const login = createAsyncThunk<AuthResponse, LoginFormData, { rejectValue: string }>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", userData);
      const { user } = response.data;
      return {
        user: {
          id: user.id,
          email: user.email,
          userName: user.userName,
          joinedDate: user.joinedDate,
        },
      };
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { user: { id: string } | null } };
      const userId = state.auth.user?.id;
      if (!userId) {
        return rejectWithValue("No user ID found");
      }
      await axiosInstance.post("/logout", {}, { headers: { "x-user-id": userId } });
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Logout failed");
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

