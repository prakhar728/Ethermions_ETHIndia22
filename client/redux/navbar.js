import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navbarMobile: false,
  },
  reducers: {
    changeNavbarState: (state) => {
      state.navbarMobile = !state.navbarMobile;
    },
  }
});

export const { changeNavbarState } = navbarSlice.actions;

export default navbarSlice.reducer;
