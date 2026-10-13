import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";

export const authHandlers = [
	http.post("*/api/auths/login", async ({ request }) => {
		await delay(300);
		try {
			const body = (await request.json()) as { email?: string; password?: string };
			const email = body.email || "admin@4life.vn";
			return HttpResponse.json({
				token: `mock-jwt-token-${btoa(email)}`,
				role: "Admin"
			});
		} catch {
			return HttpResponse.json({
				token: "mock-jwt-token-admin",
				role: "Admin"
			});
		}
	}),

	http.get("*/api/users/profile", async () => {
		await delay(200);
		return HttpResponse.json(mockDb.getAdminProfile());
	})
];
