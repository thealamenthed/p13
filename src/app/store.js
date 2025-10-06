// Configuration du store Redux
import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "../services/baseApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer
  },
  middleware: (gDM) => gDM().concat(baseApi.middleware)
});
