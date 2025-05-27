import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios/axiosInstance";
import { isAxiosError } from "axios";
import { AuthResponse } from "../types";
import { LoginFormData, SignUpFormData } from "@/utils/validations/authValidation";
import { persistor } from "../store";

export const signUp = createAsyncThunk<AuthResponse, SignUpFormData, { rejectValue: string }>(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    console.log("signup thunk0000000000000");

    try {
      const response = await axiosInstance.post("/signup", userData);
      console.log("11111111111111111111111111", response);

      // Assuming the API response includes a token and user data
      const { email, userName, fullName, role, profileImage, problemsSolved, rank, joinedDate, token } = response.data;

      // Return the full AuthResponse object
      return {
        token: token,  // Ensure token is present
        user: {
          email,
          userName,
          fullName,
          role,
          profileImage,
          problemsSolved: problemsSolved || 0,
          rank: rank || 0,
          joinedDate: joinedDate || new Date().toISOString(),
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




export const login = createAsyncThunk<AuthResponse, LoginFormData>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", userData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);


export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    console.log("its logout thunk");
    
    try {
      await axiosInstance.post("/logout");
      // Clear the access token cookie by making it expire
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      await persistor.purge();

      return true;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Logout failed");
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

