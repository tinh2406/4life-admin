export type ServerMode = "real" | "fresh" | "mock";

export interface ServerModeInfo {
	id: ServerMode;
	name: string;
	shortName: string;
	badge: string;
	badgeColor: string;
	badgeBg: string;
	badgeBorder: string;
	defaultUrl: string;
	signalRUrl: string;
	description: string;
	databaseInfo: string;
	adminGuide: {
		accountOverview: string;
		email: string;
		passwordHint: string;
		roleRequirement: string;
		howToMakeAdmin: string[];
		sqlSnippet?: string;
		specialNotes: string;
	};
}

export const SERVER_MODES: Record<ServerMode, ServerModeInfo> = {
	real: {
		id: "real",
		name: "API Server thực tế",
		shortName: "Live Backend",
		badge: "LIVE API",
		badgeColor: "#34d399",
		badgeBg: "rgba(52, 211, 153, 0.12)",
		badgeBorder: "rgba(52, 211, 153, 0.28)",
		defaultUrl: "https://tuna.whitemage.tech/api",
		signalRUrl: "https://tuna.whitemage.tech/NotificationHub",
		description: "Kết nối trực tiếp tới server backend thực tế đang vận hành trên môi trường Cloud/Staging của dự án.",
		databaseInfo: "Cơ sở dữ liệu chính của hệ thống (Production/Staging DB) với đầy đủ dữ liệu người dùng, đặt phòng và homestay đã triển khai.",
		adminGuide: {
			accountOverview: "Tài khoản quản trị viên chính thức đã tồn tại trong database backend thực tế.",
			email: "admin@4life.vn",
			passwordHint: "Mật khẩu quản trị viên được nhóm backend cấp trong DB.",
			roleRequirement: "Bắt buộc Role trong cơ sở dữ liệu phải là 'Admin'. Các tài khoản có Role = 'User' hoặc 'Mod' sẽ bị từ chối truy cập.",
			howToMakeAdmin: [
				"Sử dụng tài khoản Super Admin đã được thiết lập sẵn trong cơ sở dữ liệu backend của nhóm.",
				"Kiểm tra bảng Users trong DB thực tế, xác nhận trường Role = 'Admin'.",
				"Nếu đăng nhập thất bại: Kiểm tra lại mạng hoặc xác nhận xem server tuna.whitemage.tech có đang hoạt động hay không."
			],
			specialNotes: "Thao tác trên server này sẽ tác động trực tiếp vào cơ sở dữ liệu thật của dự án."
		}
	},
	fresh: {
		id: "fresh",
		name: "Server với data mới từ Web Users",
		shortName: "Fresh Web Users",
		badge: "FRESH DATA",
		badgeColor: "#38bdf8",
		badgeBg: "rgba(56, 189, 248, 0.12)",
		badgeBorder: "rgba(56, 189, 248, 0.28)",
		defaultUrl: "http://localhost:5000/api",
		signalRUrl: "http://localhost:5000/NotificationHub",
		description: "Kết nối tới server backend local hoặc máy chủ mới tinh, nơi dữ liệu sinh ra từ người dùng đăng ký trên Web Users (PBL6_FE_User).",
		databaseInfo: "Cơ sở dữ liệu mới khởi tạo (sau khi chạy migrations). Chưa có sẵn nhiều dữ liệu mẫu, người dùng đến từ luồng đăng ký thực tế trên web khách.",
		adminGuide: {
			accountOverview: "Tài khoản được tạo từ luồng đăng ký của Web Users hoặc tài khoản Seed của backend.",
			email: "admin@4life.vn",
			passwordHint: "Mật khẩu bạn tự đặt khi đăng ký trên Web Users hoặc mật khẩu seed ban đầu.",
			roleRequirement: "Mặc định người dùng đăng ký từ Web Khách hàng sẽ có Role = 'User'. Bạn cần nâng quyền lên 'Admin' trong database để truy cập Admin Console.",
			howToMakeAdmin: [
				"Bước 1: Mở ứng dụng Web Khách hàng (PBL6_FE_User) và đăng ký một tài khoản mới bằng email của bạn.",
				"Bước 2: Mở công cụ quản trị Database (SQL Server Management Studio / DBeaver / pgAdmin / MySQL Workbench).",
				"Bước 3: Chạy câu lệnh SQL bên dưới để nâng tài khoản vừa tạo thành Admin:",
				"Bước 4: Quay lại trang này và đăng nhập bằng email & mật khẩu bạn vừa đăng ký."
			],
			sqlSnippet: "UPDATE Users SET Role = 'Admin' WHERE Email = 'your_registered_email@domain.com';",
			specialNotes: "Nếu backend của bạn có kịch bản Seed sẵn tài khoản Admin, bạn có thể đăng nhập ngay bằng tài khoản seed được cấu hình trong backend."
		}
	},
	mock: {
		id: "mock",
		name: "Server với data mock có sẵn",
		shortName: "Mock Data (MSW)",
		badge: "IN-MEMORY MOCK",
		badgeColor: "#c084fc",
		badgeBg: "rgba(168, 85, 247, 0.14)",
		badgeBorder: "rgba(168, 85, 247, 0.3)",
		defaultUrl: "/api",
		signalRUrl: "/NotificationHub",
		description: "Chạy hoàn toàn trên trình duyệt thông qua Mock Service Worker (MSW). Không cần khởi động bất kỳ server backend hay cơ sở dữ liệu nào.",
		databaseInfo: "Bộ nhớ in-memory giả lập đầy đủ dữ liệu: người dùng, chủ phòng (Host), danh sách đen (Blacklist), duyệt host, tiện ích, địa điểm và thống kê doanh thu.",
		adminGuide: {
			accountOverview: "Tài khoản quản trị viên mẫu được nạp sẵn trong môi trường giả lập.",
			email: "admin@4life.vn",
			passwordHint: "Bất kỳ mật khẩu nào (ví dụ: admin123 hoặc 123456).",
			roleRequirement: "Mock Server tự động cấp quyền 'Admin' cho phiên đăng nhập này.",
			howToMakeAdmin: [
				"Nhấn nút '1-Click Tự động điền' phía dưới để tự động điền sẵn tài khoản Admin.",
				"Nhấn 'Đăng nhập vào hệ thống' để truy cập ngay lập tức vào dashboard.",
				"Mọi thao tác thay đổi vai trò, thêm vào blacklist, duyệt host, thêm/xóa tiện ích đều hoạt động mượt mà trong phiên làm việc."
			],
			specialNotes: "Môi trường lý tưởng nhất cho việc chấm bài, kiểm thử tính năng UI/UX và demo nhanh không phụ thuộc mạng."
		}
	}
};

export const getServerMode = (): ServerMode => {
	const saved = localStorage.getItem("admin_server_mode");
	if (saved === "real" || saved === "fresh" || saved === "mock") {
		return saved;
	}
	return import.meta.env.VITE_ENABLE_MOCK === "true" ? "mock" : "real";
};

export const setServerMode = (mode: ServerMode, customUrl?: string): void => {
	localStorage.setItem("admin_server_mode", mode);
	if (customUrl) {
		if (mode === "real") localStorage.setItem("admin_real_url", customUrl);
		if (mode === "fresh") localStorage.setItem("admin_fresh_url", customUrl);
	}
};

export const getServerBaseUrl = (mode?: ServerMode): string => {
	const currentMode = mode || getServerMode();
	if (currentMode === "mock") {
		return "/api";
	}
	if (currentMode === "fresh") {
		return localStorage.getItem("admin_fresh_url") || SERVER_MODES.fresh.defaultUrl;
	}
	return (
		localStorage.getItem("admin_real_url") ||
		import.meta.env.VITE_API_BASE_URL ||
		SERVER_MODES.real.defaultUrl
	);
};

export const getSignalRUrl = (mode?: ServerMode): string => {
	const currentMode = mode || getServerMode();
	if (currentMode === "mock") {
		return "/NotificationHub";
	}
	if (currentMode === "fresh") {
		const base = getServerBaseUrl("fresh").replace(/\/api\/?$/, "");
		return `${base}/NotificationHub`;
	}
	return (
		import.meta.env.VITE_SIGNALR_HUB_URL ||
		SERVER_MODES.real.signalRUrl
	);
};
