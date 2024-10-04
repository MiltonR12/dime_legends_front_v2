import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateBattle } from "./battle";
import {
  createBattleApi,
  deleteBattleApi,
  generateBattleApi,
  getBattleApi,
  updateBattleApi,
  updateWinnerBattleApi,
} from "@/app/api/battle/battleApi";
import {
  PCreateBattle,
  PUpdateBattle,
  PWinnerBattle,
} from "@/app/api/battle/battle";

const initialState: InitialStateBattle = {
  battles: [],
  isLoading: false,
};

export const createBattleThunk = createAsyncThunk(
  "battle/createBattle",
  async (datos: PCreateBattle, { rejectWithValue }) => {
    try {
      const { success, message, data } = await createBattleApi(datos);
      return success ? data : rejectWithValue(message);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const generateBattleThunk = createAsyncThunk(
  "battle/generateBattle",
  async (id: string, { rejectWithValue }) => {
    try {
      const { success, message, data } = await generateBattleApi(id);
      return success ? data : rejectWithValue(message);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getBattlesThunk = createAsyncThunk(
  "battle/getBattles",
  async (id: string, { rejectWithValue }) => {
    try {
      const { success, message, data } = await getBattleApi(id);
      return success ? data : rejectWithValue(message);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteBattleThunk = createAsyncThunk(
  "battle/deleteBattle",
  async (id: string, { rejectWithValue }) => {
    try {
      const { success, message } = await deleteBattleApi(id);
      return success ? id : rejectWithValue(message);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateBattleThunk = createAsyncThunk(
  "battle/updateBattle",
  async (datos: PUpdateBattle, { rejectWithValue }) => {
    try {
      const { success, message, data } = await updateBattleApi(datos);
      return success ? data : rejectWithValue(message);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const winnerBattleThunk = createAsyncThunk(
  "battle/winnerBattle",
  async (datos: PWinnerBattle, { rejectWithValue }) => {
    try {
      const { success, message, data } = await updateWinnerBattleApi(datos);
      return success ? data : rejectWithValue(message);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBattleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBattleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.battles.push(action.payload);
      })
      .addCase(createBattleThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getBattlesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBattlesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.battles = action.payload;
      })
      .addCase(getBattlesThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBattleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBattleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.battles = state.battles.filter(
          (battle) => battle._id !== action.payload
        );
      })
      .addCase(deleteBattleThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBattleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBattleThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.battles.findIndex(({ _id }) => _id === payload._id);

        if (index !== -1) {
          state.battles[index] = payload;
        }
      })
      .addCase(updateBattleThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(generateBattleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateBattleThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.battles = payload;
      })
      .addCase(generateBattleThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(winnerBattleThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(winnerBattleThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.battles.findIndex(({ _id }) => _id === payload._id);
        if (index !== -1) {
          state.battles[index].winner = payload.winner;
        }
      })
      .addCase(winnerBattleThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default battleSlice.reducer;
