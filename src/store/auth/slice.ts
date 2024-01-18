import { createSlice } from "@reduxjs/toolkit";
import { AuthStateType } from "./type";

const slice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: null
	} as AuthStateType,
	reducers: {
		login: (state, action:{payload:AuthStateType}) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: state => {
			state.user = null;
			state.token = null;
		}
	}
});
export const { login, logout } = slice.actions;
export default slice.reducer;
