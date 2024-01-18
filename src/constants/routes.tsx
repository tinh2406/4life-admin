import { Check, Dashboard, LocationOn, People, Toll } from "@mui/icons-material";
const routes = [
	{
		name: "Dashboard",
		key: "dashboard",
		route: "/",
		icon: <Dashboard fontSize={"small"} />
	},
	{
		name: "Requests",
		key: "requests",
		route: "/requests",
		icon: <Check fontSize="small" />
	},
	{
		name: "Users",
		key: "users",
		route: "/users",
		icon: <People fontSize="small" />
	},
	{
		name: "Amenities",
		key: "amenities",
		route: "/amenities",
		icon: <Toll fontSize="small" />
	},
	{
		name: "Locations",
		key: "locations",
		route: "/locations",
		icon: <LocationOn fontSize="small" />
	}
];
export default routes;
