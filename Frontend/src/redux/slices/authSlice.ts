// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Frontend\src\redux\slices\authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUp, login, logout } from "../thunks/authThunks";
import { AuthResponse, User } from "@/types/IUser";


interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateAuthState(state, action.payload);
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        updateAuthState(state, action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
      })
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
      });
  },
});

// Helper function to update auth state
const updateAuthState = (state: AuthState, payload: AuthResponse) => {
  const { user } = payload;
  state.isAuthenticated = true;
  state.user = { ...user };
  state.loading = false;
  state.error = null;
};

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;