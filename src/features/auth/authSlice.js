import {createSlice} from "@reduxjs/toolkit";
import {getToken, setToken, clearToken} from "../../services/token";

const initialState = {token: getToken()};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, {payload}) {
      state.token = payload;
      setToken(payload);
    },
    loggedOut(state) {
      state.token = null;
      clearToken();
    }
  }
});

export const {loggedIn, loggedOut} = slice.actions;
export default slice.reducer;
