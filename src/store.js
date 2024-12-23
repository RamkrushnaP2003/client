// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";

// // Load the persisted user data from localStorage
// const persistedUser = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
//   preloadedState: {
//     user: persistedUser, // Initialize the user state from localStorage
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Function to safely load persisted user data from localStorage
const loadPersistedUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Error loading user data from localStorage:", e);
    return null;
  }
};

// Load the persisted user data safely
const persistedUser = loadPersistedUser();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: persistedUser, // Initialize the user state from localStorage
  },
});

export default store;
