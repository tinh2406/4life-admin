import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";

export const notificationsHandlers = [
	http.get("*/api/notifications", async ({ request }) => {
		await delay(150);
		const url = new URL(request.url);
		const pageIndex = Number(url.searchParams.get("pageIndex")) || 1;
		const pageSize = Number(url.searchParams.get("pageSize")) || 10;

		const result = mockDb.getNotifications(pageIndex, pageSize);
		return HttpResponse.json(result);
	})
];
