import { CollapseUser, DetailUser, User, UserRole, UserStatus } from "../../features/users/types";
import { Amenity } from "../../features/amenities/types";
import { Location } from "../../features/locations/types";

export const initialAdminProfile: User = {
	id: "admin-101",
	name: "Nguyen Quoc Tinh",
	email: "admin@4life.vn",
	avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
	gender: true,
	phoneNumber: "0901234567",
	dateOfBirth: "1998-06-24",
	description: "Platform Operations & Super Administrator"
};

export const initialUsers: (CollapseUser & { role: UserRole; status: UserStatus; isBlocked: boolean; blockReason?: string; detail: DetailUser })[] = [
	{
		id: "usr-001",
		name: "Le Hoang Nam",
		email: "nam.le@gmail.com",
		phoneNumber: "0912345671",
		avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80",
		role: "User",
		status: "Active",
		isBlocked: false,
		detail: {
			id: "usr-001",
			name: "Le Hoang Nam",
			email: "nam.le@gmail.com",
			phoneNumber: "0912345671",
			avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1996-03-12",
			gender: true,
			role: "User",
			status: "Active",
			isBlocked: false,
			description: "Khách hàng thân thiết, thường xuyên du lịch khu vực miền Trung.",
			frontIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "usr-002",
		name: "Tran Thi Mai",
		email: "mai.tran@homestay.vn",
		phoneNumber: "0987654322",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
		role: "Mod",
		status: "Active",
		isBlocked: false,
		detail: {
			id: "usr-002",
			name: "Tran Thi Mai",
			email: "mai.tran@homestay.vn",
			phoneNumber: "0987654322",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1992-11-20",
			gender: false,
			role: "Mod",
			status: "Active",
			isBlocked: false,
			description: "Chủ An Bang Beach Villa và chuỗi căn hộ boutique tại Đà Nẵng.",
			frontIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "usr-003",
		name: "Pham Minh Duc",
		email: "duc.pham@traveler.com",
		phoneNumber: "0934567893",
		avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=256&q=80",
		role: "Staff",
		status: "Active",
		isBlocked: false,
		detail: {
			id: "usr-003",
			name: "Pham Minh Duc",
			email: "duc.pham@traveler.com",
			phoneNumber: "0934567893",
			avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1999-08-14",
			gender: true,
			role: "Staff",
			status: "Active",
			isBlocked: false,
			description: "Chuyên viên vận hành hỗ trợ khách hàng và điều phối sự cố.",
			frontIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "usr-004",
		name: "Do Thi Kim Ngan",
		email: "kimngan.villa@gmail.com",
		phoneNumber: "0905123454",
		avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
		role: "Mod",
		status: "Active",
		isBlocked: false,
		detail: {
			id: "usr-004",
			name: "Do Thi Kim Ngan",
			email: "kimngan.villa@gmail.com",
			phoneNumber: "0905123454",
			avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1988-04-05",
			gender: false,
			role: "Mod",
			status: "Active",
			isBlocked: false,
			description: "Đồng sáng lập Pine Hills Retreat Đà Lạt.",
			frontIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "usr-005",
		name: "Nguyen Van An",
		email: "vanan.nguyen@yahoo.com",
		phoneNumber: "0971234565",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
		role: "User",
		status: "Blocked",
		isBlocked: true,
		blockReason: "Đã thêm vào danh sách đen do phát hiện thanh toán gian lận và hủy phòng liên tục",
		detail: {
			id: "usr-005",
			name: "Nguyen Van An",
			email: "vanan.nguyen@yahoo.com",
			phoneNumber: "0971234565",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "2000-01-25",
			gender: true,
			role: "User",
			status: "Blocked",
			isBlocked: true,
			blockReason: "Đã thêm vào danh sách đen do phát hiện thanh toán gian lận và hủy phòng liên tục",
			description: "Tài khoản bị tạm khóa để xác minh danh tính.",
			frontIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "usr-006",
		name: "Vo Thi Bich Thuy",
		email: "bichthuy.homestay@gmail.com",
		phoneNumber: "0908765436",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
		role: "Mod",
		status: "Active",
		isBlocked: false,
		detail: {
			id: "usr-006",
			name: "Vo Thi Bich Thuy",
			email: "bichthuy.homestay@gmail.com",
			phoneNumber: "0908765436",
			avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1994-09-18",
			gender: false,
			role: "Mod",
			status: "Active",
			isBlocked: false,
			description: "Chủ hệ thống Riverside Studio tại Thành phố Hồ Chí Minh.",
			frontIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "usr-007",
		name: "Nguyen Quoc Tinh",
		email: "admin@4life.vn",
		phoneNumber: "0901234567",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
		role: "Admin",
		status: "Active",
		isBlocked: false,
		detail: {
			id: "usr-007",
			name: "Nguyen Quoc Tinh",
			email: "admin@4life.vn",
			phoneNumber: "0901234567",
			avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1998-06-24",
			gender: true,
			role: "Admin",
			status: "Active",
			isBlocked: false,
			description: "Quản trị viên trưởng hệ thống 4Life Platform.",
			frontIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
		}
	}
];

export const initialHostRequests: (CollapseUser & { detail: DetailUser })[] = [
	{
		id: "req-001",
		name: "Dang Quoc Bao",
		email: "quocbao.dang@retreat.vn",
		phoneNumber: "0918234501",
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
		detail: {
			id: "req-001",
			name: "Dang Quoc Bao",
			email: "quocbao.dang@retreat.vn",
			phoneNumber: "0918234501",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1987-12-08",
			gender: true,
			description: "Registered business host managing 3 luxury hillside villas in Ba Na Hills, Da Nang.",
			frontIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "req-002",
		name: "Nguyen Thao My",
		email: "thaomy.beachhouse@gmail.com",
		phoneNumber: "0978123402",
		avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
		detail: {
			id: "req-002",
			name: "Nguyen Thao My",
			email: "thaomy.beachhouse@gmail.com",
			phoneNumber: "0978123402",
			avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1993-07-22",
			gender: false,
			description: "Operating beachfront apartments near My Khe beach with verified business license.",
			frontIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
		}
	},
	{
		id: "req-003",
		name: "Tran Dinh Khoa",
		email: "khoa.tran@heritage.vn",
		phoneNumber: "0932145603",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
		detail: {
			id: "req-003",
			name: "Tran Dinh Khoa",
			email: "khoa.tran@heritage.vn",
			phoneNumber: "0932145603",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
			dateOfBirth: "1990-02-15",
			gender: true,
			description: "Managing traditional wooden homestay property in Hoi An ancient town.",
			frontIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
			backIdentityCard: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
		}
	}
];

export const initialAmenities: Amenity[] = [
	{
		id: "amenity-001",
		name: "High-speed Wi-Fi",
		icon: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=128&q=80"
	},
	{
		id: "amenity-002",
		name: "Private Swimming Pool",
		icon: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=128&q=80"
	},
	{
		id: "amenity-003",
		name: "Air Conditioning",
		icon: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=128&q=80"
	},
	{
		id: "amenity-004",
		name: "Free On-premise Parking",
		icon: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=128&q=80"
	},
	{
		id: "amenity-005",
		name: "Fully Equipped Kitchen",
		icon: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=128&q=80"
	},
	{
		id: "amenity-006",
		name: "Panoramic Ocean View",
		icon: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=128&q=80"
	},
	{
		id: "amenity-007",
		name: "Pet Friendly",
		icon: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=128&q=80"
	},
	{
		id: "amenity-008",
		name: "Dedicated Workspace",
		icon: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=128&q=80"
	}
];

export const initialLocations: Location[] = [
	{ id: "loc-001", city: "Da Nang", district: "Hai Chau" },
	{ id: "loc-002", city: "Da Nang", district: "Son Tra" },
	{ id: "loc-003", city: "Da Nang", district: "Ngu Hanh Son" },
	{ id: "loc-004", city: "Da Nang", district: "Thanh Khe" },
	{ id: "loc-005", city: "Ho Chi Minh", district: "District 1" },
	{ id: "loc-006", city: "Ho Chi Minh", district: "District 3" },
	{ id: "loc-007", city: "Ho Chi Minh", district: "Thu Duc City" },
	{ id: "loc-008", city: "Ha Noi", district: "Hoan Kiem" },
	{ id: "loc-009", city: "Ha Noi", district: "Tay Ho" },
	{ id: "loc-010", city: "Ha Noi", district: "Ba Dinh" },
	{ id: "loc-011", city: "Lam Dong", district: "Da Lat City" },
	{ id: "loc-012", city: "Khanh Hoa", district: "Nha Trang City" }
];
