// src/features/auth/authSlice.js
import {createSlice} from "@reduxjs/toolkit";
import {getToken} from "../../services/token";

// L'état initial lit un token éventuel déjà persisté
const initialState = {token: getToken() || null};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, {payload}) {
      state.token = payload;
    },
    loggedOut(state) {
      state.token = null;
    }
  }
});

export const {loggedIn, loggedOut} = slice.actions;

export default slice.reducer;
