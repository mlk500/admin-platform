import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, Location, Task } from "../models/Interfaces"; // Make sure Task is correctly imported

interface GlobalStates {
  selectedCard: any; // Update this type if there's a specific type for it
  page: string;
  sectorColor: string;
  location: Location | null;
  sector: Admin | null;
  loggedInAdmin: Admin | null;
  taskAddGame: Task | null;
  isEditing: boolean; // Add isEditing as a boolean variable
}

const initialState: GlobalStates = {
  selectedCard: {},
  page: "",
  sectorColor: "red",
  location: null,
  sector: null,
  loggedInAdmin: null,
  taskAddGame: null,
  isEditing: false, // Initialize isEditing with false
};

const globalStatesSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<any>) {
      state.selectedCard = action.payload;
    },
    setPage(state, action: PayloadAction<string>) {
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
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
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
  setIsEditing,
} = globalStatesSlice.actions;

export default globalStatesSlice.reducer;
