import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialStateAuth } from "./auth";
import {
  authLoginApi,
  authLoginGoogleApi,
  authRegisterApi,
  createPageApi,
  validateTokenApi,
} from "@/app/api/auth/authApi";
import { PCreatePage, PLogin, PRegister } from "@/app/api/auth/auth";

const initialState: initialStateAuth = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

export const authLoginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: PLogin, { rejectWithValue }) => {
    try {
      const { futuresyo } = await authLoginApi({ email, password });
      if (futuresyo.success) {
        return futuresyo.data;
      } else {
        return rejectWithValue(futuresyo.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authLoginGoogleThunk = createAsyncThunk(
  "auth/loginGoogle",
  async (token: string, { rejectWithValue }) => {
    try {
      const { data, message, success } = await authLoginGoogleApi(token);
      if (success) {
        return data;
      } else {
        return rejectWithValue(message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authRegisterThunk = createAsyncThunk(
  "auth/register",
  async (data: PRegister, { rejectWithValue }) => {
    try {
      const { futuresyo } = await authRegisterApi(data);
      if (futuresyo.success) {
        return futuresyo.data;
      } else {
        return rejectWithValue(futuresyo.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const validateTokenThunk = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data, success, message } = await validateTokenApi();
      return success ? data : rejectWithValue(message);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createPageThunk = createAsyncThunk(
  "auth/createPage",
  async (data: PCreatePage, { rejectWithValue }) => {
    try {
      const { futuresyo } = await createPageApi(data);
      if (futuresyo.success) {
        return futuresyo.data;
      } else {
        return rejectWithValue(futuresyo.message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLoginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(authLoginThunk.rejected, (state) => {
        state.user = null;
      })
      .addCase(authLoginGoogleThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(createPageThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(validateTokenThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export default authSlice.reducer;
export const { authLogout } = authSlice.actions;
