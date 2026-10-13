import axios, { AxiosInstance } from "axios";
import { store } from "../../store";
import { logout } from "../../store/auth/slice";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://tuna.whitemage.tech/api";

export const httpClient: AxiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json"
	}
});

httpClient.interceptors.request.use(
	config => {
		try {
			const state = store.getState();
			const token = state?.token;
			if (token && !config.headers.Authorization) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch {
			// Fallback silently if store is not initialized
		}
		return config;
	},
	error => Promise.reject(error)
);

httpClient.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			store.dispatch(logout());
		}
		return Promise.reject(error);
	}
);

export default httpClient;
