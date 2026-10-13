import { authHandlers } from "./auth";
import { userHandlers } from "./users";
import { requestModHandlers } from "./request-mod";
import { amenitiesHandlers } from "./amenities";
import { locationsHandlers } from "./locations";
import { dashboardHandlers } from "./dashboard";
import { notificationsHandlers } from "./notifications";
import { uploadHandlers } from "./upload";

export const handlers = [
	...authHandlers,
	...userHandlers,
	...requestModHandlers,
	...amenitiesHandlers,
	...locationsHandlers,
	...dashboardHandlers,
	...notificationsHandlers,
	...uploadHandlers
];
