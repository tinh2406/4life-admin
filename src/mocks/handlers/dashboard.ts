import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";

export const dashboardHandlers = [
	http.get("*/api/statistics/total-bookings-life-growth", async ({ request }) => {
		await delay(200);
		const url = new URL(request.url);
		const NumberCycles = Number(url.searchParams.get("NumberCycles")) || 6;
		const TypeCycles = (url.searchParams.get("TypeCycles") as "Day" | "Week" | "Month" | "Year") || "Week";

		const result = mockDb.getStatisticsGrowth("bookings", {
			NumberCycles,
			TypeCycles
		});

		return HttpResponse.json(result);
	}),

	http.get("*/api/statistics/total-sales-life-growth-for-admin", async ({ request }) => {
		await delay(200);
		const url = new URL(request.url);
		const NumberCycles = Number(url.searchParams.get("NumberCycles")) || 6;
		const TypeCycles = (url.searchParams.get("TypeCycles") as "Day" | "Week" | "Month" | "Year") || "Week";
		const IsPaid = url.searchParams.get("IsPaid") === "true";

		const result = mockDb.getStatisticsGrowth("sales", {
			NumberCycles,
			TypeCycles,
			IsPaid
		});

		return HttpResponse.json(result);
	}),

	http.get("*/api/statistics/total-users-life-growth", async ({ request }) => {
		await delay(200);
		const url = new URL(request.url);
		const NumberCycles = Number(url.searchParams.get("NumberCycles")) || 6;
		const TypeCycles = (url.searchParams.get("TypeCycles") as "Day" | "Week" | "Month" | "Year") || "Week";

		const result = mockDb.getStatisticsGrowth("users", {
			NumberCycles,
			TypeCycles
		});

		return HttpResponse.json(result);
	}),

	http.get("*/api/statistics/admin-revenue-management", async ({ request }) => {
		await delay(250);
		const url = new URL(request.url);
		const PageIndex = Number(url.searchParams.get("PageIndex")) || 1;
		const PageSize = Number(url.searchParams.get("PageSize")) || 10;
		const PaidType = url.searchParams.get("PaidType") || "All";
		const TypeCycles = url.searchParams.get("TypeCycles") || "Week";
		const Keyword = url.searchParams.get("Keyword") || undefined;

		const result = mockDb.getRevenueManagement({
			PageIndex,
			PageSize,
			PaidType,
			TypeCycles,
			Keyword
		});

		return HttpResponse.json(result);
	})
];
