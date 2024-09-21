import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, Location } from "../models/Interfaces";
import { Task } from "../models/Types";

interface GlobalStates {
  selectedCard: any;
  page: string;
  sectorColor: string;
  location: Location | null;
  sector: Admin | null;
  // location: Location | null;
  loggedInAdmin: Admin | null;
  taskAddGame: Task | null;
}

const initialState: GlobalStates = {
  selectedCard: {},
  page: "",
  sectorColor: "red",
  location: null,
  sector: null,
  loggedInAdmin: null,
  taskAddGame: null,
  // unit: null,
};

const globalStatesSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<any>) {
      state.selectedCard = action.payload;
    },
    setPage(state, action: PayloadAction<any>) {
      state.page = action.payload;
    },
    setSectorColor(state, action: PayloadAction<string>) {
      state.sectorColor = action.payload;
    },
    setSector(state, action: PayloadAction<Admin>) {
      state.sector = action.payload;
    },
    setTaskAddGame(state, action: PayloadAction<Task>) {
      state.taskAddGame = action.payload;
    },
    setLoggedInAdmin(state, action: PayloadAction<Admin>) {
      state.loggedInAdmin = action.payload;
    },
  },
});

export const {
  setCard,
  setPage,
  setSectorColor,
  setSector,
  setLoggedInAdmin,
  setTaskAddGame,
} = globalStatesSlice.actions;

export default globalStatesSlice.reducer;
