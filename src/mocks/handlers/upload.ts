import { http, HttpResponse, delay } from "msw";

export const uploadHandlers = [
	http.post("*/api/upload-images/images", async () => {
		await delay(400);
		// Return a realistic mock uploaded image url
		return HttpResponse.json({
			url: `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80&mock=${Date.now()}`
		});
	})
];
