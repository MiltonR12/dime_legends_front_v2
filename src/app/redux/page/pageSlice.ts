import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStatePage } from "./page";
import { addNetworkPageApi } from "@/app/api/page/pageApi";

const initialState: InitialStatePage = {
  page: null,
  isLoading: false,
};

export const addNetworkPageThunk = createAsyncThunk(
  "page/addNetwork",
  async (url: string, { rejectWithValue }) => {
    try {
      const { success, message, data } = await addNetworkPageApi(url);
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

const authSlice = createSlice({
  name: "page",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNetworkPageThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNetworkPageThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (state.page) {
          state.page.socialLinks.push(payload);
        }
      })
      .addCase(addNetworkPageThunk.rejected, (state) => {
        state.isLoading = false
      });
  },
});

export default authSlice.reducer;
