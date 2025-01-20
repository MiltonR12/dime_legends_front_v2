import {
  createTeamApi,
  deleteTeamApi,
  getTeamByTournamentApi,
  updateStatusTeamApi,
  updateTeamApi,
} from "@/app/api/team/teamApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialStateTeam } from "./team";
import {
  PCreateTeam,
  PUpdateStatusTeam,
  PUpdateTeam,
} from "@/app/api/team/team";

const initialState: initialStateTeam = {
  teams: [],
  team: null,
  isLoading: false,
};

export const getTeamByTournamentThunk = createAsyncThunk(
  "tournament/getTournament",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, success, message } = await getTeamByTournamentApi(id);
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

export const createTeamThunk = createAsyncThunk(
  "team/create",
  async (payload: PCreateTeam, { rejectWithValue }) => {
    try {
      const { data, message, success } = await createTeamApi(payload);
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

export const updateTeamThunk = createAsyncThunk(
  "team/update",
  async (datos: PUpdateTeam, { rejectWithValue }) => {
    try {
      const { success, message, data } = await updateTeamApi(datos);
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

export const updateStatusTeamThunk = createAsyncThunk(
  "team/updateStatus",
  async (payload: PUpdateStatusTeam, { rejectWithValue }) => {
    try {
      const { success, message, data } = await updateStatusTeamApi(payload);
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

export const deleteTeamThunk = createAsyncThunk(
  "team/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const { success, message } = await deleteTeamApi(id);
      if (success) {
        return id;
      } else {
        return rejectWithValue(message);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTeamByTournamentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeamByTournamentThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.teams = payload;
        }
        state.isLoading = false;
      })
      .addCase(getTeamByTournamentThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTeamThunk.fulfilled, (state, { payload }) => {
        state.teams.push(payload);
      })
      .addCase(updateTeamThunk.fulfilled, (state, { payload }) => {
        const index = state.teams.findIndex((team) => team._id === payload._id);
        if (index !== -1) {
          state.teams[index] = payload;
        }
      })
      .addCase(updateStatusTeamThunk.fulfilled, (state, { payload }) => {
        const index = state.teams.findIndex((team) => team._id === payload._id);
        if (index !== -1) {
          state.teams[index] = payload;
        }
      })
      .addCase(deleteTeamThunk.fulfilled, (state, { payload }) => {
        state.teams = state.teams.filter((team) => team._id !== payload);
      });
  },
});

export default teamSlice.reducer;
