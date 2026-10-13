import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";

export const amenitiesHandlers = [
	http.get("*/api/amenities", async ({ request }) => {
		await delay(250);
		const url = new URL(request.url);
		const Keyword = url.searchParams.get("Keyword") || undefined;
		const PageIndex = Number(url.searchParams.get("PageIndex")) || 1;
		const PageSize = Number(url.searchParams.get("PageSize")) || 10;

		const result = mockDb.getAmenities({
			Keyword,
			PageIndex,
			PageSize
		});

		return HttpResponse.json(result);
	}),

	http.post("*/api/amenities", async ({ request }) => {
		await delay(300);
		const body = (await request.json()) as { name: string; icon: string };
		const created = mockDb.addAmenity(body);
		return HttpResponse.json(created, { status: 201 });
	}),

	http.put("*/api/amenities/:id", async ({ params, request }) => {
		await delay(300);
		const id = params.id as string;
		const body = (await request.json()) as { name: string; icon: string };
		const updated = mockDb.updateAmenity(id, body);

		if (!updated) {
			return new HttpResponse(JSON.stringify({ message: "Amenity not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return HttpResponse.json(updated);
	}),

	http.delete("*/api/amenities/:id", async ({ params }) => {
		await delay(250);
		const id = params.id as string;
		mockDb.deleteAmenity(id);
		return new HttpResponse(null, { status: 204 });
	})
];
