import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, Game, Location, Task } from "../models/Interfaces";

interface GlobalStates {
  locations: Location[];
  Sectors: Admin[];
  Tasks: Task[];
  Games: Game[];
}

const initialState: GlobalStates = {
  locations: [],
  Sectors: [],
  Tasks: [],
  Games: [],
};

const saveAllData = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setLocations(state, action: PayloadAction<Location[]>) {
      state.locations = action.payload;
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.Tasks = action.payload;
    },
  },
});

export const { setLocations, setTasks } = saveAllData.actions;

export default saveAllData.reducer;
