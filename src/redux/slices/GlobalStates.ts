import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, Location, Task, Unit } from "../models/Interfaces";
import { indexOf } from "lodash";

interface GlobalStates {
  selectedCard: any;
  page: string;
  sectorColor: string;
  location: Location | null;
  sector: Admin | null;
  loggedInAdmin: Admin | null;
  taskAddGame: Task | null;
  isEditing: boolean;
  unitsInEditGame: Unit[];
}

const initialState: GlobalStates = {
  selectedCard: {},
  page: "",
  sectorColor: "red",
  location: null,
  sector: null,
  loggedInAdmin: null,
  taskAddGame: null,
  isEditing: false,
  unitsInEditGame: [],
};

const globalStatesSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<any>) {
      state.selectedCard = action.payload;
      state.unitsInEditGame = action.payload.units;
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
    setUnitsInEditGame(state, action: PayloadAction<Unit>) {
      state.unitsInEditGame.push(action.payload);
    },
    deleteUnitInEditGame(state, action: PayloadAction<number>) {
      state.unitsInEditGame = state.unitsInEditGame.filter(
        (_, index) => index !== action.payload
      );
    },
    setUnitsInEditGameOrder(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const reorderedUnits = [...state.unitsInEditGame];
      const [movedUnit] = reorderedUnits.splice(fromIndex, 1);
      reorderedUnits.splice(toIndex, 0, movedUnit);

      state.unitsInEditGame = reorderedUnits.map((unit, index) => ({
        ...unit,
        unitOrder: index + 1,
      }));
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
  setUnitsInEditGame,
  deleteUnitInEditGame,
  setUnitsInEditGameOrder,
} = globalStatesSlice.actions;

export default globalStatesSlice.reducer;
