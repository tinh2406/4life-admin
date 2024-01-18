import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import MainLayout from "../src/layouts/dashboard";
import "./App.css";
import Amenities from "./pages/amenities";
import DashBoard from "./pages/dashboard";
import LoginPage from "./pages/login";
import RequestsMod from "./pages/request-mod";
import Detail from "./pages/request-mod/detail";
import UserDetail from "./pages/users/detail";
import Users from "./pages/users";
import { AuthStateType } from "./store/auth/type";
import Locations from "./pages/locations";
import NotFound from "./components/NotFound";
const NotAuthElement = ({ children }: { children?: React.ReactNode }) => {
	const navigate = useNavigate();
	const user = useSelector((state: AuthStateType) => state.user);

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	});

	return children;
};
const ProtectedElement = ({ children }: { children?: React.ReactNode }) => {
	const navigate = useNavigate();
	const user = useSelector((state: AuthStateType) => state.user);

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	});

	return children;
};
const router = createBrowserRouter([
	{
		path: "/login",
		element: (
			<NotAuthElement>
				<LoginPage />
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
						element: <Detail />
					},
					{
						path: "*",
						element: <RequestsMod />,
						index: true
					}
				]
			},
			{
				path: "/users",
				element: <Outlet />,
				children: [
					{
						path: ":id",
						element: <UserDetail />
					},
					{
						path: "*",
						element: <Users />,
						index: true
					}
				]
			},
			{
				path: "/amenities",
				element: <Amenities />
			},
			{
				path: "/locations",
				element: <Locations />
			},
			{
				path: "/",
				element: <DashBoard />
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
