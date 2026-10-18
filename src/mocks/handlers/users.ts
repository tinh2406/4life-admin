import { http, HttpResponse, delay } from "msw";
import { mockDb } from "../data/db";
import { UserRole, UserStatus } from "../../features/users/types";

export const userHandlers = [
	http.get("*/api/users", async ({ request }) => {
		await delay(250);
		const url = new URL(request.url);
		const Role = url.searchParams.get("Role") as "All" | UserRole | undefined;
		const Status = url.searchParams.get("Status") as "All" | UserStatus | undefined;
		const Keyword = url.searchParams.get("Keyword") || undefined;
		const PageIndex = Number(url.searchParams.get("PageIndex")) || 1;
		const PageSize = Number(url.searchParams.get("PageSize")) || 10;
		const IsDescending = url.searchParams.get("IsDescending") === "true";
		const SortBy = url.searchParams.get("SortBy") as "Name" | "Email" | "PhoneNumber" | undefined;

		const result = mockDb.getUsers({
			Role: Role || undefined,
			Status: Status || undefined,
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
	}),

	http.put("*/api/users/:id/role", async ({ params, request }) => {
		await delay(250);
		const id = params.id as string;
		const body = (await request.json()) as { role: UserRole };
		const success = mockDb.updateUserRole(id, body.role);

		if (!success) {
			return new HttpResponse(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return HttpResponse.json({
			message: "Role updated successfully",
			role: body.role
		});
	}),

	http.put("*/api/users/:id/block", async ({ params, request }) => {
		await delay(250);
		const id = params.id as string;
		const body = (await request.json()) as { isBlocked: boolean; reason?: string };
		const success = mockDb.toggleBlockUser(id, body.isBlocked, body.reason);

		if (!success) {
			return new HttpResponse(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return HttpResponse.json({
			message: body.isBlocked ? "User added to blacklist successfully" : "User unblocked successfully",
			isBlocked: body.isBlocked
		});
	}),

	http.delete("*/api/users/:id", async ({ params }) => {
		await delay(300);
		const id = params.id as string;
		const success = mockDb.deleteUser(id);

		if (!success) {
			return new HttpResponse(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" }
			});
		}

		return HttpResponse.json({
			message: "User deleted successfully"
		});
	})
];

