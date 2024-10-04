import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./redux/auth/authSlice";
import TournamentSlice from './redux/tournament/tournamentSlice'
import TeamSlice from './redux/team/teamSlice'
import BattleSlice from './redux/battle/battleSlice'
import { useDispatch } from "react-redux";


export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    tournament: TournamentSlice,
    team: TeamSlice,
    battle: BattleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();