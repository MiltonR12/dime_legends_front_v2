import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateTournamet } from "./tournament";
import { PTournament } from "@/app/api/tournament/tournament";
import {
  createTournamentApi,
  deleteTournamentApi,
  getListTournamentApi,
  getMyTournamentApi,
  getTournamentByIdApi,
} from "@/app/api/tournament/tournamentApi";

const initialState: InitialStateTournamet = {
  tournaments: [],
  listTournaments: [],
  myTournaments: [],
  isLoadingMy: false,
  tournament: null,
  isLoading: false,
};

export const getTournamentIdThunk = createAsyncThunk(
  "tournament/getTournamentId",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, success, message } = await getTournamentByIdApi(id);
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

export const getListTournamentThunk = createAsyncThunk(
  "tournament/getListTournament",
  async (_, { rejectWithValue }) => {
    try {
      const { data, success, message } = await getListTournamentApi();
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

export const getMyTournamentThunk = createAsyncThunk(
  "tournament/getMyTournament",
  async (_, { rejectWithValue }) => {
    try {
      const { data, success, message } = await getMyTournamentApi();
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

export const createTournamentThunk = createAsyncThunk(
  "tournament/createTournament",
  async (data: PTournament, { rejectWithValue }) => {
    try {
      const { futuresyo } = await createTournamentApi(data);
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

export const deleteTournamentThunk = createAsyncThunk(
  "tournament/deleteTournament",
  async (id: string, { rejectWithValue }) => {
    try {
      const { success, message } = await deleteTournamentApi(id);
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

const TournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListTournamentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListTournamentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.listTournaments = action.payload;
        }
      })
      .addCase(getListTournamentThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTournamentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTournamentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tournament = action.payload;
      })
      .addCase(createTournamentThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTournamentIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTournamentIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tournament = action.payload as any;
      })
      .addCase(getTournamentIdThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMyTournamentThunk.pending, (state) => {
        state.isLoadingMy = true;
      })
      .addCase(getMyTournamentThunk.fulfilled, (state, action) => {
        state.isLoadingMy = false;
        if (action.payload) {
          state.myTournaments = action.payload;
        }
      })
      .addCase(getMyTournamentThunk.rejected, (state) => {
        state.isLoadingMy = false;
      })
      .addCase(deleteTournamentThunk.fulfilled, (state, { payload }) => {
        state.myTournaments = state.myTournaments.filter(
          (tournament) => tournament._id !== payload
        );
      })
  },
});

export default TournamentSlice.reducer;
