import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

// UserSlice.ts - main fix here
const UserSlice = createSlice({
    name: "user",
    initialState: getItem("user") || null, // ✅ fallback to null, never undefined
    reducers: {
        setUser: (_state, action) => {
            setItem("user", action.payload);
            return action.payload; // ✅ return directly, don't re-read from storage
        },
        removeUser: () => {
            removeItem("user");
            return null; // ✅ return null, not ""
        }
    }
});

export const {setUser, removeUser}= UserSlice.actions;
export default UserSlice.reducer;