import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";

export const locationsHandlers = [
	http.get("*/api/locations", async ({ request }) => {
		await delay(250);
		const url = new URL(request.url);
		const Keyword = url.searchParams.get("Keyword") || undefined;
		const PageIndex = Number(url.searchParams.get("PageIndex")) || 1;
		const PageSize = Number(url.searchParams.get("PageSize")) || 10;

		const result = mockDb.getLocations({
			Keyword,
			PageIndex,
			PageSize
		});

		return HttpResponse.json(result);
	}),

	http.post("*/api/locations", async ({ request }) => {
		await delay(300);
		const body = (await request.json()) as { city: string; district: string };
		const created = mockDb.addLocation(body);
		return HttpResponse.json(created, { status: 201 });
	}),

	http.put("*/api/locations/:id", async ({ params, request }) => {
		await delay(300);
		const id = params.id as string;
		const body = (await request.json()) as { city: string; district: string };
		const updated = mockDb.updateLocation(id, body);

		if (!updated) {
			return new HttpResponse(JSON.stringify({ message: "Location not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return HttpResponse.json(updated);
	}),

	http.delete("*/api/locations/:id", async ({ params }) => {
		await delay(250);
		const id = params.id as string;
		mockDb.deleteLocation(id);
		return new HttpResponse(null, { status: 204 });
	})
];
