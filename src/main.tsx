import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import ReduxProvider from "./app/providers/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotifyProvider } from "./context/notify.tsx";
import { FilterProvider } from "./context/filter.tsx";
import { StatisticsProvider } from "./context/statistics.tsx";

const queryClient = new QueryClient();

async function enableMocking() {
	const savedMode = localStorage.getItem("admin_server_mode");
	const shouldMock = savedMode ? savedMode === "mock" : import.meta.env.VITE_ENABLE_MOCK === "true";

	if (shouldMock) {
		const { worker } = await import("./mocks/browser");
		return worker.start({
			onUnhandledFrame: "bypass"
		});
	}
}

enableMocking().then(() => {
	ReactDOM.createRoot(document.getElementById("root")!).render(
		// <React.StrictMode>
		<ReduxProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<NotifyProvider>
						<FilterProvider>
							<StatisticsProvider>
								<App />
							</StatisticsProvider>
						</FilterProvider>
					</NotifyProvider>
					<ToastContainer />
				</QueryClientProvider>
			</ThemeProvider>
		</ReduxProvider>
		// </React.StrictMode>,
	);
});
