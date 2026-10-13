import React, { memo, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../store";
import { AuthStateType } from "../../store/auth/type";
import httpClient from "../../services/http/client";
import { User } from "../../type/User";
import { login, logout } from "../../store/auth/slice";
import { useNetworkState } from "react-use";
import Loading from "../../components/Loading";

interface ProviderProps {
	children: React.ReactNode;
}

const AuthInitializer = memo(({ children }: ProviderProps) => {
	const { online } = useNetworkState();
	const token = useSelector((state: AuthStateType) => state.token);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUserProfile = async () => {
			if (token && online) {
				try {
					const user = (await httpClient.get<User>("users/profile")).data;
					dispatch(
						login({
							user,
							token
						})
					);
				} catch {
					dispatch(logout());
				}
			}
			setLoading(false);
		};

		fetchUserProfile();
	}, [online, token, dispatch]);

	if (loading) return <Loading />;
	return <>{children}</>;
});

const ReduxProvider = ({ children }: ProviderProps) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<AuthInitializer>{children}</AuthInitializer>
			</PersistGate>
		</Provider>
	);
};

const MemoizedReduxProvider = memo(ReduxProvider);
export default MemoizedReduxProvider;
