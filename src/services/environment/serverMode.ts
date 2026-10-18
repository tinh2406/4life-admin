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
		name: "Sandbox Trình duyệt (Data Mới Tinh)",
		shortName: "Sandbox Browser",
		badge: "CLEAN SANDBOX",
		badgeColor: "#38bdf8",
		badgeBg: "rgba(56, 189, 248, 0.12)",
		badgeBorder: "rgba(56, 189, 248, 0.28)",
		defaultUrl: "/api",
		signalRUrl: "/NotificationHub",
		description: "Tự host API ngay trong trình duyệt bằng Service Worker. Bắt đầu với Database trắng tinh, toàn bộ dữ liệu thêm mới hay chỉnh sửa đều được lưu vào LocalStorage của bạn. Không cần cài đặt hay chạy bất kỳ server nào!",
		databaseInfo: "Database sạch sẽ (Clean State) được lưu trữ trực tiếp trong LocalStorage trình duyệt của bạn. Bắt đầu từ con số 0 và không cần chạy server.",
		adminGuide: {
			accountOverview: "Tài khoản Super Admin mặc định được khởi tạo sẵn để bạn đăng nhập ngay vào hệ thống trắng.",
			email: "admin@4life.vn",
			passwordHint: "Bất kỳ mật khẩu nào (ví dụ: Admin@123 hoặc Admin@4life).",
			roleRequirement: "Tài khoản có sẵn quyền 'Admin' để bạn toàn quyền tạo mới dữ liệu, duyệt phòng, thêm tiện ích.",
			howToMakeAdmin: [
				"Nhấn nút '⚡ Tự động điền tài khoản mẫu' hoặc nhập email: admin@4life.vn.",
				"Bấm 'Đăng nhập': Hệ thống mở Dashboard với dữ liệu trắng tinh.",
				"Bạn có thể bắt đầu tạo người dùng mới, thêm địa điểm, thêm tiện ích trực tiếp trên web.",
				"Mọi dữ liệu bạn tạo ra sẽ được lưu tự động trong LocalStorage máy bạn (F5 không mất)."
			],
			specialNotes: "Chạy 100% trong trình duyệt. Không cần tạo hay chạy bất kỳ server nào trên máy tính!"
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
			passwordHint: "Bất kỳ mật khẩu nào (ví dụ: Admin@123 hoặc Admin@4life).",
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
	if (currentMode === "mock" || currentMode === "fresh") {
		return "/api";
	}
	return (
		localStorage.getItem("admin_real_url") ||
		import.meta.env.VITE_API_BASE_URL ||
		SERVER_MODES.real.defaultUrl
	);
};

export const getSignalRUrl = (mode?: ServerMode): string => {
	const currentMode = mode || getServerMode();
	if (currentMode === "mock" || currentMode === "fresh") {
		return "/NotificationHub";
	}
	return (
		import.meta.env.VITE_SIGNALR_HUB_URL ||
		SERVER_MODES.real.signalRUrl
	);
};
