import { createSlice } from "@reduxjs/toolkit";

// Default state (initial state) for user
const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      try {
        localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
      } catch (e) {
        console.error("Error saving user data to localStorage:", e);
      }
      return user;
    },
    clearUser: () => {
      try {
        localStorage.removeItem("user"); // Remove user from localStorage
      } catch (e) {
        console.error("Error removing user data from localStorage:", e);
      }
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
