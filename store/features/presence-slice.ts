import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PresenceState {
  hasCheckedInToday: boolean
  hasCheckedOutToday: boolean
  refetchPresence: boolean
}

const initialState: PresenceState = {
  hasCheckedInToday: false,
  hasCheckedOutToday: false,
  refetchPresence: false
};

export const presenceSlice = createSlice({
  name: "presence",
  initialState,
  reducers: {
    setHasCheckedInToday: (state, action: PayloadAction<boolean>) => {
      state.hasCheckedInToday = action.payload;
    },
    setHasCheckedOutToday: (state, action: PayloadAction<boolean>) => {
      state.hasCheckedOutToday = action.payload;
    },
    setRefetchPresence: (state, action: PayloadAction<boolean>) => {
      state.refetchPresence = action.payload;
    }
  },
});

export const {
  setHasCheckedInToday,
  setHasCheckedOutToday,
  setRefetchPresence
} = presenceSlice.actions;

export default presenceSlice.reducer;