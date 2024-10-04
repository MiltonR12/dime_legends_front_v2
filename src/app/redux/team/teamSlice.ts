import { getTeamByTournamentApi, updateTeamApi } from "@/app/api/team/teamApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialStateTeam } from "./team";
import { PUpdateTeam } from "@/app/api/team/team";

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
      .addCase(updateTeamThunk.fulfilled, (state, { payload }) => {
        const index = state.teams.findIndex((team) => team._id === payload._id);
        if (index !== -1) {
          state.teams[index] = payload;
        }
      })
  },
});

export default teamSlice.reducer;
