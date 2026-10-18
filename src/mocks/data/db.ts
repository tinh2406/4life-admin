import { CollapseUser, DetailUser, User, UserRole, UserStatus } from "../../features/users/types";
import { Amenity } from "../../features/amenities/types";
import { Location } from "../../features/locations/types";
import { PagingResponse } from "../../type/Paging";
import { StatisticsResponse, Column } from "../../type/Statistics";
import {
	initialAdminProfile,
	initialAmenities,
	initialHostRequests,
	initialLocations,
	initialUsers
} from "./initialData";

export interface MockNotification {
	id: string;
	type: "RequestToMod";
	content: string;
	note: string;
	createdDate: string;
	avatar: string;
	userFrom: string;
}

export interface MockRevenueItem {
	mod: User;
	totalRevenue: number;
	totalBookings: number;
	unPaid: number;
	paid: number;
}

const FRESH_STORAGE_KEY = "admin_fresh_sandbox_db_v1";

const createInitialAdminUser = (): (CollapseUser & {
	role: UserRole;
	status: UserStatus;
	isBlocked: boolean;
	blockReason?: string;
	detail: DetailUser;
}) => ({
	id: initialAdminProfile.id,
	name: initialAdminProfile.name,
	email: initialAdminProfile.email,
	phoneNumber: initialAdminProfile.phoneNumber || "0901234567",
	avatar: initialAdminProfile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
	role: "Admin",
	status: "Active",
	isBlocked: false,
	detail: {
		id: initialAdminProfile.id,
		name: initialAdminProfile.name,
		email: initialAdminProfile.email,
		phoneNumber: initialAdminProfile.phoneNumber || "0901234567",
		avatar: initialAdminProfile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
		dateOfBirth: initialAdminProfile.dateOfBirth || "1998-06-24",
		gender: true,
		role: "Admin",
		status: "Active",
		isBlocked: false,
		description: "Platform Operations & Super Administrator",
		frontIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
		backIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
	}
});

class MockDatabase {
	private adminProfile: User;
	private users: (CollapseUser & { role: UserRole; status: UserStatus; isBlocked: boolean; blockReason?: string; detail: DetailUser })[];
	private hostRequests: (CollapseUser & { detail: DetailUser })[];
	private amenities: Amenity[];
	private locations: Location[];
	private notifications: MockNotification[];

	constructor() {
		if (this.isFreshMode()) {
			const saved = localStorage.getItem(FRESH_STORAGE_KEY);
			if (saved) {
				try {
					const parsed = JSON.parse(saved);
					this.adminProfile = parsed.adminProfile || { ...initialAdminProfile };
					this.users = parsed.users || [];
					this.hostRequests = parsed.hostRequests || [];
					this.amenities = parsed.amenities || [];
					this.locations = parsed.locations || [];
					this.notifications = parsed.notifications || [];
					return;
				} catch {
					// Fall through to default clean state
				}
			}

			// Initialize clean slate for fresh mode
			this.adminProfile = { ...initialAdminProfile };
			this.users = [createInitialAdminUser()];
			this.hostRequests = [];
			this.amenities = [];
			this.locations = [];
			this.notifications = [];
			this.persist();
		} else {
			// Mock Mode with pre-populated sample records
			this.adminProfile = { ...initialAdminProfile };
			this.users = JSON.parse(JSON.stringify(initialUsers));
			this.hostRequests = JSON.parse(JSON.stringify(initialHostRequests));
			this.amenities = JSON.parse(JSON.stringify(initialAmenities));
			this.locations = JSON.parse(JSON.stringify(initialLocations));

			this.notifications = [
				{
					id: "notif-001",
					type: "RequestToMod",
					content: "New Host verification submitted by Dang Quoc Bao",
					note: "Ba Na Hills Villas",
					createdDate: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
					avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80",
					userFrom: "req-001"
				},
				{
					id: "notif-002",
					type: "RequestToMod",
					content: "New Host verification submitted by Nguyen Thao My",
					note: "My Khe Beachfront House",
					createdDate: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
					avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&q=80",
					userFrom: "req-002"
				},
				{
					id: "notif-003",
					type: "RequestToMod",
					content: "New Host verification submitted by Tran Dinh Khoa",
					note: "Hoi An Heritage House",
					createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
					avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&q=80",
					userFrom: "req-003"
				}
			];
		}
	}

	private isFreshMode(): boolean {
		return localStorage.getItem("admin_server_mode") === "fresh";
	}

	private persist(): void {
		if (this.isFreshMode()) {
			try {
				const payload = {
					adminProfile: this.adminProfile,
					users: this.users,
					hostRequests: this.hostRequests,
					amenities: this.amenities,
					locations: this.locations,
					notifications: this.notifications
				};
				localStorage.setItem(FRESH_STORAGE_KEY, JSON.stringify(payload));
			} catch (err) {
				console.warn("Could not save to LocalStorage:", err);
			}
		}
	}

	public resetFreshDatabase(): void {
		localStorage.removeItem(FRESH_STORAGE_KEY);
		this.adminProfile = { ...initialAdminProfile };
		this.users = [createInitialAdminUser()];
		this.hostRequests = [];
		this.amenities = [];
		this.locations = [];
		this.notifications = [];
		this.persist();
	}

	getAdminProfile(): User {
		return this.adminProfile;
	}

	// USERS
	getUsers(params: {
		Role?: "All" | UserRole;
		Status?: "All" | UserStatus;
		Keyword?: string;
		PageIndex?: number;
		PageSize?: number;
		IsDescending?: boolean;
		SortBy?: "Name" | "Email" | "PhoneNumber";
	}): PagingResponse<CollapseUser> {
		let list = [...this.users];

		if (params.Role && params.Role !== "All") {
			list = list.filter(u => u.role === params.Role);
		}

		if (params.Status && params.Status !== "All") {
			list = list.filter(u => u.status === params.Status);
		}

		if (params.Keyword) {
			const kw = params.Keyword.toLowerCase();
			list = list.filter(
				u =>
					u.name.toLowerCase().includes(kw) ||
					u.email.toLowerCase().includes(kw) ||
					(u.phoneNumber && u.phoneNumber.includes(kw))
			);
		}

		if (params.SortBy) {
			const key = params.SortBy === "Name" ? "name" : params.SortBy === "Email" ? "email" : "phoneNumber";
			list.sort((a, b) => {
				const valA = (a[key] || "").toLowerCase();
				const valB = (b[key] || "").toLowerCase();
				return params.IsDescending ? valB.localeCompare(valA) : valA.localeCompare(valB);
			});
		}

		const pageIndex = Number(params.PageIndex) || 1;
		const pageSize = Number(params.PageSize) || 10;
		const totalCount = list.length;
		const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
		const startIndex = (pageIndex - 1) * pageSize;
		const data = list.slice(startIndex, startIndex + pageSize).map(({ id, name, email, phoneNumber, avatar, role, status, isBlocked, blockReason }) => ({
			id,
			name,
			email,
			phoneNumber,
			avatar,
			role,
			status,
			isBlocked,
			blockReason
		}));

		return {
			meta: {
				pageIndex,
				pageSize,
				totalPages,
				totalCount
			},
			data
		};
	}

	getUserDetail(id: string): DetailUser | undefined {
		// Look in active users
		const user = this.users.find(u => u.id === id);
		if (user) {
			return {
				...user.detail,
				role: user.role,
				status: user.status,
				isBlocked: user.isBlocked,
				blockReason: user.blockReason
			};
		}

		// Look in host verification requests
		const req = this.hostRequests.find(r => r.id === id);
		if (req) return req.detail;

		return undefined;
	}

	updateUserRole(id: string, role: UserRole): boolean {
		const user = this.users.find(u => u.id === id);
		if (!user) return false;
		user.role = role;
		user.detail.role = role;
		this.persist();
		return true;
	}

	toggleBlockUser(id: string, isBlocked: boolean, reason?: string): boolean {
		const user = this.users.find(u => u.id === id);
		if (!user) return false;
		user.isBlocked = isBlocked;
		user.status = isBlocked ? "Blocked" : "Active";
		user.blockReason = isBlocked ? reason || "Đã thêm vào danh sách đen do vi phạm quy định" : undefined;
		user.detail.isBlocked = isBlocked;
		user.detail.status = isBlocked ? "Blocked" : "Active";
		user.detail.blockReason = user.blockReason;
		this.persist();
		return true;
	}

	deleteUser(id: string): boolean {
		const index = this.users.findIndex(u => u.id === id);
		if (index === -1) return false;
		this.users.splice(index, 1);
		this.persist();
		return true;
	}

	// HOST KYC REQUESTS
	getHostRequests(params: {
		Keyword?: string;
		PageIndex?: number;
		PageSize?: number;
	}): PagingResponse<CollapseUser> {
		let list = [...this.hostRequests];

		if (params.Keyword) {
			const kw = params.Keyword.toLowerCase();
			list = list.filter(
				r =>
					r.name.toLowerCase().includes(kw) ||
					r.email.toLowerCase().includes(kw) ||
					(r.phoneNumber && r.phoneNumber.includes(kw))
			);
		}

		const pageIndex = Number(params.PageIndex) || 1;
		const pageSize = Number(params.PageSize) || 12;
		const totalCount = list.length;
		const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
		const startIndex = (pageIndex - 1) * pageSize;
		const data = list.slice(startIndex, startIndex + pageSize).map(({ id, name, email, phoneNumber, avatar }) => ({
			id,
			name,
			email,
			phoneNumber,
			avatar
		}));

		return {
			meta: {
				pageIndex,
				pageSize,
				totalPages,
				totalCount
			},
			data
		};
	}

	approveHost(id: string): boolean {
		const index = this.hostRequests.findIndex(r => r.id === id);
		if (index === -1) return false;

		const [approved] = this.hostRequests.splice(index, 1);
		this.users.push({
			...approved,
			role: "Mod",
			status: "Active",
			isBlocked: false
		});
		this.persist();
		return true;
	}

	rejectHost(id: string): boolean {
		const index = this.hostRequests.findIndex(r => r.id === id);
		if (index === -1) return false;

		this.hostRequests.splice(index, 1);
		this.persist();
		return true;
	}

	// AMENITIES
	getAmenities(params: {
		Keyword?: string;
		PageIndex?: number;
		PageSize?: number;
	}): PagingResponse<Amenity> {
		let list = [...this.amenities];

		if (params.Keyword) {
			const kw = params.Keyword.toLowerCase();
			list = list.filter(a => a.name.toLowerCase().includes(kw));
		}

		const pageIndex = Number(params.PageIndex) || 1;
		const pageSize = Number(params.PageSize) || 10;
		const totalCount = list.length;
		const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
		const startIndex = (pageIndex - 1) * pageSize;
		const data = list.slice(startIndex, startIndex + pageSize);

		return {
			meta: {
				pageIndex,
				pageSize,
				totalPages,
				totalCount
			},
			data
		};
	}

	addAmenity(dto: { name: string; icon: string }): Amenity {
		const newAmenity: Amenity = {
			id: `amenity-${Date.now()}`,
			name: dto.name,
			icon: dto.icon || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=128&q=80"
		};
		this.amenities.unshift(newAmenity);
		this.persist();
		return newAmenity;
	}

	updateAmenity(id: string, dto: { name: string; icon: string }): Amenity | undefined {
		const item = this.amenities.find(a => a.id === id);
		if (!item) return undefined;
		item.name = dto.name;
		if (dto.icon) item.icon = dto.icon;
		this.persist();
		return item;
	}

	deleteAmenity(id: string): boolean {
		const index = this.amenities.findIndex(a => a.id === id);
		if (index === -1) return false;
		this.amenities.splice(index, 1);
		this.persist();
		return true;
	}

	// LOCATIONS
	getLocations(params: {
		Keyword?: string;
		PageIndex?: number;
		PageSize?: number;
	}): PagingResponse<Location> {
		let list = [...this.locations];

		if (params.Keyword) {
			const kw = params.Keyword.toLowerCase();
			list = list.filter(
				l => l.city.toLowerCase().includes(kw) || l.district.toLowerCase().includes(kw)
			);
		}

		const pageIndex = Number(params.PageIndex) || 1;
		const pageSize = Number(params.PageSize) || 10;
		const totalCount = list.length;
		const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
		const startIndex = (pageIndex - 1) * pageSize;
		const data = list.slice(startIndex, startIndex + pageSize);

		return {
			meta: {
				pageIndex,
				pageSize,
				totalPages,
				totalCount
			},
			data
		};
	}

	addLocation(dto: { city: string; district: string }): Location {
		const newLoc: Location = {
			id: `loc-${Date.now()}`,
			city: dto.city,
			district: dto.district
		};
		this.locations.unshift(newLoc);
		this.persist();
		return newLoc;
	}

	updateLocation(id: string, dto: { city: string; district: string }): Location | undefined {
		const item = this.locations.find(l => l.id === id);
		if (!item) return undefined;
		item.city = dto.city;
		item.district = dto.district;
		this.persist();
		return item;
	}

	deleteLocation(id: string): boolean {
		const index = this.locations.findIndex(l => l.id === id);
		if (index === -1) return false;
		this.locations.splice(index, 1);
		this.persist();
		return true;
	}

	// DYNAMIC TELEMETRY & STATISTICS
	getStatisticsGrowth(
		metric: "bookings" | "sales" | "users",
		params: { NumberCycles?: number; TypeCycles?: "Day" | "Week" | "Month" | "Year"; IsPaid?: boolean }
	): StatisticsResponse {
		const numberCycles = Number(params.NumberCycles) || (params.TypeCycles === "Day" ? 7 : 6);
		const typeCycles = params.TypeCycles || "Week";

		const baseMultipliers = {
			bookings: { min: 45, max: 120 },
			sales: { min: 28000, max: 94000 },
			users: { min: 15, max: 60 }
		};

		const range = baseMultipliers[metric];
		const columns: Column[] = [];
		const now = new Date();

		for (let i = 0; i < numberCycles; i++) {
			const dateFrom = new Date(now);
			const dateTo = new Date(now);

			if (typeCycles === "Day") {
				dateFrom.setDate(now.getDate() - (i + 1));
				dateTo.setDate(now.getDate() - i);
			} else if (typeCycles === "Week") {
				dateFrom.setDate(now.getDate() - (i + 1) * 7);
				dateTo.setDate(now.getDate() - i * 7);
			} else if (typeCycles === "Month") {
				dateFrom.setMonth(now.getMonth() - (i + 1));
				dateTo.setMonth(now.getMonth() - i);
			} else {
				dateFrom.setFullYear(now.getFullYear() - (i + 1));
				dateTo.setFullYear(now.getFullYear() - i);
			}

			// Deterministic variation pattern based on cycle number
			const factor = 1 + Math.sin(i * 1.2) * 0.35 + (i % 3 === 0 ? 0.2 : -0.1);
			const randomVal = Math.round((range.min + (range.max - range.min) * factor) / (metric === "sales" ? 100 : 1)) * (metric === "sales" ? 100 : 1);

			columns.push({
				cyclesNo: i + 1,
				dateFrom: dateFrom.toISOString(),
				dateTo: dateTo.toISOString(),
				value: Math.max(10, randomVal)
			});
		}

		return {
			numberCycles,
			typeCycles,
			valueCycles: columns
		};
	}

	// REVENUE MANAGEMENT
	getRevenueManagement(params: {
		PageIndex?: number;
		PageSize?: number;
		PaidType?: string;
		TypeCycles?: string;
		Keyword?: string;
	}): PagingResponse<MockRevenueItem> {
		const mods = this.users.filter(u => u.role === "Mod");
		const revenueList: MockRevenueItem[] = mods.map((mod, idx) => {
			const bookings = 14 + idx * 7;
			const totalRevenue = bookings * 1250000;
			const paid = Math.round(totalRevenue * 0.8);
			const unPaid = totalRevenue - paid;

			return {
				mod: {
					id: mod.id,
					name: mod.name,
					email: mod.email,
					phoneNumber: mod.phoneNumber,
					avatar: mod.avatar,
					gender: mod.detail.gender,
					dateOfBirth: mod.detail.dateOfBirth,
					description: mod.detail.description
				},
				totalRevenue,
				totalBookings: bookings,
				paid,
				unPaid
			};
		});

		const normalizedKeyword = params.Keyword?.trim().toLocaleLowerCase();
		const filteredRevenueList = normalizedKeyword
			? revenueList.filter(({ mod }) =>
				[mod.id, mod.name, mod.phoneNumber].some(value => value?.toLocaleLowerCase().includes(normalizedKeyword))
			)
			: revenueList;
		const pageIndex = Number(params.PageIndex) || 1;
		const pageSize = Number(params.PageSize) || 10;
		const totalCount = filteredRevenueList.length;
		const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
		const startIndex = (pageIndex - 1) * pageSize;

		return {
			meta: {
				pageIndex,
				pageSize,
				totalPages,
				totalCount
			},
			data: filteredRevenueList.slice(startIndex, startIndex + pageSize)
		};
	}

	// NOTIFICATIONS
	getNotifications(pageIndex = 1, pageSize = 10): PagingResponse<MockNotification> {
		const totalCount = this.notifications.length;
		const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
		const startIndex = (pageIndex - 1) * pageSize;

		return {
			meta: {
				pageIndex,
				pageSize,
				totalPages,
				totalCount
			},
			data: this.notifications.slice(startIndex, startIndex + pageSize)
		};
	}
}

export const mockDb = new MockDatabase();
