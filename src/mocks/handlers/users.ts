import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";

export const userHandlers = [
	http.get("*/api/users", async ({ request }) => {
		await delay(250);
		const url = new URL(request.url);
		const Role = url.searchParams.get("Role") as "User" | "Mod" | "Admin" | undefined;
		const Keyword = url.searchParams.get("Keyword") || undefined;
		const PageIndex = Number(url.searchParams.get("PageIndex")) || 1;
		const PageSize = Number(url.searchParams.get("PageSize")) || 10;
		const IsDescending = url.searchParams.get("IsDescending") === "true";
		const SortBy = url.searchParams.get("SortBy") as "Name" | "Email" | "PhoneNumber" | undefined;

		const result = mockDb.getUsers({
			Role: Role || undefined,
			Keyword,
			PageIndex,
			PageSize,
			IsDescending,
			SortBy
		});

		return HttpResponse.json(result);
	}),

	http.get("*/api/users/:id", async ({ params }) => {
		await delay(200);
		const id = params.id as string;
		const user = mockDb.getUserDetail(id);

		if (!user) {
			return new HttpResponse(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return HttpResponse.json(user);
	})
];
