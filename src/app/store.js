// Configuration du store Redux
import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "../services/baseApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, //cache RTK Query
    auth: authReducer //reducer pour le slice auth
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware)
});
