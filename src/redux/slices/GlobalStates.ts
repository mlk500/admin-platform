import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../models/Interfaces";

interface GlobalStates {
  selectedCard: any;
  page: string;
  sectorColor: string;
  location: Location | null;
  // location: Location | null;
}

const initialState: GlobalStates = {
  selectedCard: {},
  page: "Sectors",
  sectorColor: "red",
  location: null,
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
  },
});

export const { setCard, setPage, setSectorColor } = globalStatesSlice.actions;

export default globalStatesSlice.reducer;
