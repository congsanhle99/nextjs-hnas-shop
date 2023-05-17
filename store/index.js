import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import thunk from "redux-thunk";
import dialog from "./DialogSlice";
import expandSidebar from "./ExpandSlice";
import cart from "./cartSlice";

//#region setup redux-persist

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

//#endregion

const reducers = combineReducers({ cart, expandSidebar, dialog });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
