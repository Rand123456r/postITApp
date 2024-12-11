import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import postReducer from "../Features/PostSlice";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";
import manageUserReducer from "../Features/ManageUserSlice";
import { reset as resetManageUser } from "../Features/ManageUserSlice";
import { reset as resetUsers } from "../Features/UserSlice";
import { reset as resetPosts } from "../Features/PostSlice";

// Redux Persist config

const persistConfig = {
  key: "reduxstore", // The key to identify the persisted state in storage

  storage, // The storage method (localStorage)
};

const rootReducer = combineReducers({
  users: usersReducer, // Manage users slice of the state
  posts: postReducer, // Manage posts slice of the state
  manageUsers: manageUserReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
const resetStore = () => {
  store.dispatch(resetUsers()); // Reset users state

  store.dispatch(resetPosts()); // Reset posts state

  store.dispatch(resetManageUser()); // Reset manage users state
};

const persistore = persistStore(store); // Create persistore for rehydration

export { store, persistore };
