// src/features/auth/authSlice.js
import {createSlice} from "@reduxjs/toolkit";
import {getToken, setToken, clearToken} from "../../services/token";
import {baseApi} from "../../services/baseApi";

// L'état initial lit un token éventuel déjà persisté
const initialState = {token: getToken() || null};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, {payload}) {
      state.token = payload; // reducer pur
    },
    loggedOut(state) {
      state.token = null; // reducer pur
    }
  }
});

export const {loggedIn, loggedOut} = slice.actions;

// --- Thunks (actions asynchrones / avec effets) ---
export const login = (token) => (dispatch) => {
  setToken(token); // effet (persistance)
  dispatch(loggedIn(token)); // MAJ state
};

export const logout = () => (dispatch) => {
  clearToken(); // efface persistance
  dispatch(loggedOut()); // MAJ state
  dispatch(baseApi.util.resetApiState()); // vider le cache RTK Query
};

export default slice.reducer;
