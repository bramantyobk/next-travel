import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isLogged: false,
};

export const userLoggedSlice = createSlice({
	name: "userLogged",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isLogged = true;
		},

		clearUser: (state) => {
			state.user = null;
			state.isLogged = false;
		},
	},
});

export const { setUser, clearUser } = userLoggedSlice.actions;

export default userLoggedSlice.reducer;
