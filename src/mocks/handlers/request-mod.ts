import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";

export const requestModHandlers = [
	http.get("*/api/users/users-waiting-for-approval", async ({ request }) => {
		await delay(250);
		const url = new URL(request.url);
		const Keyword = url.searchParams.get("Keyword") || undefined;
		const PageIndex = Number(url.searchParams.get("PageIndex")) || 1;
		const PageSize = Number(url.searchParams.get("PageSize")) || 12;

		const result = mockDb.getHostRequests({
			Keyword,
			PageIndex,
			PageSize
		});

		return HttpResponse.json(result);
	}),

	http.put("*/api/users/approve-user/:id", async ({ params }) => {
		await delay(350);
		const id = params.id as string;
		mockDb.approveHost(id);
		return HttpResponse.json({ success: true, message: "User approved successfully" });
	}),

	http.put("*/api/users/reject-user/:id", async ({ params }) => {
		await delay(350);
		const id = params.id as string;
		mockDb.rejectHost(id);
		return HttpResponse.json({ success: true, message: "User rejected successfully" });
	})
];
