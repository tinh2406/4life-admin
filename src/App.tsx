import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/dashboard";
import "./App.css";
import { AuthStateType } from "./store/auth/type";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading";

const Amenities = lazy(() => import("./pages/amenities"));
const DashBoard = lazy(() => import("./pages/dashboard"));
const LoginPage = lazy(() => import("./pages/login"));
const RequestsMod = lazy(() => import("./pages/request-mod"));
const RequestDetail = lazy(() => import("./pages/request-mod/detail"));
const UserDetail = lazy(() => import("./pages/users/detail"));
const Users = lazy(() => import("./pages/users"));
const Locations = lazy(() => import("./pages/locations"));
const SettingsPage = lazy(() => import("./pages/settings"));

const NotAuthElement = ({ children }: { children?: React.ReactNode }) => {
	const user = useSelector((state: AuthStateType) => state.user);
	if (user) {
		return <Navigate to="/" replace />;
	}
	return <>{children}</>;
};

const ProtectedElement = ({ children }: { children?: React.ReactNode }) => {
	const user = useSelector((state: AuthStateType) => state.user);
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};

const router = createBrowserRouter([
	{
		path: "/login",
		element: (
			<NotAuthElement>
				<Suspense fallback={<Loading />}>
					<LoginPage />
				</Suspense>
			</NotAuthElement>
		)
	},
	{
		path: "/",
		element: (
			<ProtectedElement>
				<MainLayout />
			</ProtectedElement>
		),
		errorElement: <NotFound />,
		children: [
			{
				path: "/requests",
				element: <Outlet />,
				children: [
					{
						path: ":id",
						element: (
							<Suspense fallback={<Loading />}>
								<RequestDetail />
							</Suspense>
						)
					},
					{
						index: true,
						path: "*",
						element: (
							<Suspense fallback={<Loading />}>
								<RequestsMod />
							</Suspense>
						)
					}
				]
			},
			{
				path: "/users",
				element: <Outlet />,
				children: [
					{
						path: ":id",
						element: (
							<Suspense fallback={<Loading />}>
								<UserDetail />
							</Suspense>
						)
					},
					{
						index: true,
						path: "*",
						element: (
							<Suspense fallback={<Loading />}>
								<Users />
							</Suspense>
						)
					}
				]
			},
			{
				path: "/amenities",
				element: (
					<Suspense fallback={<Loading />}>
						<Amenities />
					</Suspense>
				)
			},
			{
				path: "/locations",
				element: (
					<Suspense fallback={<Loading />}>
						<Locations />
					</Suspense>
				)
			},
			{
				path: "/settings",
				element: (
					<Suspense fallback={<Loading />}>
						<SettingsPage />
					</Suspense>
				)
			},
			{
				path: "/",
				element: (
					<Suspense fallback={<Loading />}>
						<DashBoard />
					</Suspense>
				)
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
