// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Frontend\src\redux\thunks\authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { LoginFormData, SignUpFormData } from "@/utils/authValidation";
import { AuthResponse } from "@/types/userType";
import { SignUpResponse } from "@/types/authTypes";

export const signUp = createAsyncThunk<void, SignUpFormData, { rejectValue: string }>(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", userData);
      const result: SignUpResponse = response.data;
      if (!result.success) {
        return rejectWithValue(result.error || result.message || "Signup failed");
      }
      return;
    } catch (error) {
      if (isAxiosError(error)) {
        const errorData = error.response?.data as SignUpResponse | undefined;
        return rejectWithValue(
          errorData?.error || errorData?.message || error.response?.data?.message || "Signup failed"
        );
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
      console.log("ttttttttttttttttttttttt",response);
      
      const { user } = response.data;
      return {
        user: {
          userId: user.userId,
          email: user.email,
          userName: user.userName,
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
      const state = getState() as { auth: { user: { userId: string } | null } };
      console.log("ppppppppppp",state.auth.user);
      
      const userId = state.auth.user?.userId;
      if (!userId) {
        return rejectWithValue("No user ID found");
      }
      await axiosInstance.post("/logout", {userId},);
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Logout failed");
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);