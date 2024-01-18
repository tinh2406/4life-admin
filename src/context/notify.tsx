import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { AuthStateType } from "../store/auth/type";
type AnyObject = {
	[key: string]: boolean;
} & Object;
type NotifyContextValue = {
	newRequest: AnyObject;
	newNoti: AnyObject;
	clearNoti?: () => void;
	clearRequest?: () => void;
	removeNoti?: (id: string) => void;
	removeRequest?: (id: string) => void;
	hasNew: boolean;
	setHasNew?: React.Dispatch<React.SetStateAction<boolean>>;
	last: number;
	saveLast: () => void;
	addNoti?: (id: string) => void;
};

const NotifyContext = createContext<NotifyContextValue>({
	hasNew: false,
	newRequest: {},
	newNoti: {},
	last: 1000000,
	saveLast: () => {}
});

let connection: HubConnection;
export const useNotify = () => {
	return useContext(NotifyContext);
};
export const NotifyProvider = ({ children }: { children: ReactNode }) => {
	const token = useSelector((state: AuthStateType) => state.token);
	const [hasNew, setHasNew] = useState(false);
	const [newRequest, setNewRequest] = useState<AnyObject>({});
	const [newNoti, setNewNoti] = useState<AnyObject>({});
	const [last, setLast] = useState(100000);
	const queryClient = useQueryClient();
	useEffect(() => {
		if (!token) return;
		connection = new HubConnectionBuilder()
			.withUrl("https://tuna.whitemage.tech/NotificationHub", {
				accessTokenFactory: () => token,
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets
			})
			.build();

		connection.on("AdminReceiveNotifyRequestModMessage", async function (message: string) {
			queryClient.invalidateQueries("all-request-mod");
			queryClient.invalidateQueries("all-notifys");
			const data: { Id: string; UserFrom: string; [key: string]: any } = JSON.parse(message);
			setNewNoti(last => ({ ...last, [data.Id]: true }));
			setNewRequest(last => ({ ...last, [data.UserFrom]: true }));
			console.log(data);
			setHasNew(true);
		});
		const connect = async () => {
			let connected = false;
			while (!connected) {
				try {
					await connection.start();
					console.log("Connected");
					connected = true;
				} catch (error) {}
			}
		};
		connect();
		return () => {
			if (connection) {
				connection.off("AdminReceiveNotifyRequestModMessage");
				connection.stop();
			}
		};
	}, [token]);
	useEffect(() => {
		setLast(Number(localStorage.getItem("last_notify") || 0));
	}, []);
	const clearRequest = useCallback(() => setNewRequest({}), []);
	const addNoti = useCallback((id: string) => setNewNoti(last => ({ ...last, [id]: true })), []);
	const clearNoti = useCallback(() => setNewNoti({}), []);
	const removeNoti = useCallback((id: string) => {
		delete newNoti[id];
	}, []);
	const removeRequest = useCallback((id: string) => {
		delete newRequest[id];
	}, []);

	const saveLast = useCallback(() => {
		localStorage.setItem("last_notify", Date.now().toString());
	}, []);
	const value = {
		newRequest,
		newNoti,
		clearNoti,
		removeNoti,
		removeRequest,
		clearRequest,
		hasNew,
		setHasNew,
		last,
		saveLast,
		addNoti
	};
	return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
};
