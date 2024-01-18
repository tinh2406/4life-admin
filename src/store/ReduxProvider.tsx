import React, { memo, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/index.ts";
import { AuthStateType } from "./auth/type.ts";
import axiosInstance from "../constants/AxiosInstance.ts";
import { User } from "../type/User.ts";
import { login, logout } from "./auth/slice.ts";
import { useNetworkState } from "react-use";
import Loading from "../components/Loading.tsx";
const HOC = memo(({ children }: { children: React.ReactNode }) => {
	const { online } = useNetworkState();
	const token = useSelector((state: AuthStateType) => state.token);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const getUser = async () => {
		if (token && online)
			try {
				axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
				const user = (await axiosInstance.get<User>("users/profile")).data;
				dispatch(
					login({
						user,
						token
					})
				);
			} catch (error) {
				dispatch(logout());
			}
		setLoading(false);
	};
	useEffect(() => {
		getUser();
	}, [online, token]);
	if (loading) return <Loading />;
	return children;
});

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<HOC>{children}</HOC>
			</PersistGate>
		</Provider>
	);
};

export default memo(ReduxProvider);
