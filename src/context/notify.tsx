/* eslint-disable react-refresh/only-export-components */
import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { AuthStateType } from "../store/auth/type";
import { getSignalRUrl } from "../services/environment/serverMode";

type AnyObject = Record<string, boolean>;

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
	const connectionRef = useRef<HubConnection | null>(null);

	useEffect(() => {
		if (!token) return;

		const hubUrl = getSignalRUrl();

		const connection = new HubConnectionBuilder()
			.withUrl(hubUrl, {
				accessTokenFactory: () => token,
				skipNegotiation: true,
				transport: HttpTransportType.WebSockets
			})
			.withAutomaticReconnect([0, 2000, 5000, 10000])
			.build();

		connectionRef.current = connection;

		connection.on("AdminReceiveNotifyRequestModMessage", (message: string) => {
			queryClient.invalidateQueries("all-request-mod");
			queryClient.invalidateQueries("all-notifys");
			try {
				const data: { Id: string; UserFrom: string; [key: string]: unknown } = JSON.parse(message);
				if (data.Id) {
					setNewNoti(prev => ({ ...prev, [data.Id]: true }));
				}
				if (data.UserFrom) {
					setNewRequest(prev => ({ ...prev, [data.UserFrom]: true }));
				}
				setHasNew(true);
			} catch {
				// Safely ignore malformed socket payload
			}
		});

		connection
			.start()
			.catch(() => {
				// Handled gracefully by withAutomaticReconnect
			});

		return () => {
			connection.off("AdminReceiveNotifyRequestModMessage");
			connection.stop().catch(() => {});
			connectionRef.current = null;
		};
	}, [token, queryClient]);

	useEffect(() => {
		setLast(Number(localStorage.getItem("last_notify") || 0));
	}, []);

	const clearRequest = useCallback(() => setNewRequest({}), []);
	const addNoti = useCallback((id: string) => setNewNoti(prev => ({ ...prev, [id]: true })), []);
	const clearNoti = useCallback(() => setNewNoti({}), []);

	const removeNoti = useCallback((id: string) => {
		setNewNoti(prev => {
			if (!(id in prev)) return prev;
			const next = { ...prev };
			delete next[id];
			return next;
		});
	}, []);

	const removeRequest = useCallback((id: string) => {
		setNewRequest(prev => {
			if (!(id in prev)) return prev;
			const next = { ...prev };
			delete next[id];
			return next;
		});
	}, []);

	const saveLast = useCallback(() => {
		localStorage.setItem("last_notify", Date.now().toString());
	}, []);

	const value = useMemo(
		() => ({
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
		}),
		[newRequest, newNoti, clearNoti, removeNoti, removeRequest, clearRequest, hasNew, last, saveLast, addNoti]
	);

	return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
};
