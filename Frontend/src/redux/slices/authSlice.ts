import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUp, logout, login } from "../thunks/authThunks";
import { AuthResponse } from "../types";

interface User {
  email: string;
  userName: string;
  fullName: string;
  role: string;
  profileImage: string;
  problemsSolved: number;
  rank: number;
  joinedDate: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending states
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Handle fulfilled states
      .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateAuthState(state, action.payload);
      })
      
      .addCase(login.fulfilled, (state, action) => {
        updateAuthState(state, action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      })

      // Handle rejected states
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
  },
});

// Helper function to update auth state
const updateAuthState = (state: AuthState, payload: AuthResponse) => {
  const { user, token } = payload;
  state.token = token;
  state.isAuthenticated = true;
  state.user = {...user};
  state.loading = false;
  state.error = null;
};

export default authSlice.reducer;

