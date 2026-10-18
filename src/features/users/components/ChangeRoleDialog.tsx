import {
	AdminPanelSettingsOutlined,
	BadgeOutlined,
	Close,
	HomeWorkOutlined,
	PersonOutline
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { changeUserRole } from "../users.api";
import { UserRole } from "../types";
import UserRoleChip from "./UserRoleChip";

interface ChangeRoleDialogProps {
	open: boolean;
	onClose: () => void;
	user: {
		id: string;
		name: string;
		email: string;
		avatar?: string;
		role?: UserRole;
	} | null;
	onSuccess?: () => void;
}

const roleOptions: {
	role: UserRole;
	title: string;
	subtitle: string;
	description: string;
	color: string;
	icon: React.ComponentType<{ sx?: Record<string, unknown> }>;
	isRevoke?: boolean;
}[] = [
	{
		role: "Admin",
		title: "Quản trị viên (Admin)",
		subtitle: "Toàn quyền tối cao",
		description: "Quản trị toàn bộ hệ thống, phân quyền nhân sự, kiểm soát tài chính và cấu hình nền tảng.",
		color: "#c084fc",
		icon: AdminPanelSettingsOutlined
	},
	{
		role: "Staff",
		title: "Nhân viên (Staff)",
		subtitle: "Vận hành & Hỗ trợ",
		description: "Quản lý dữ liệu người dùng, tiếp nhận khiếu nại, hỗ trợ khách hàng và kiểm tra giao dịch.",
		color: "#38bdf8",
		icon: BadgeOutlined
	},
	{
		role: "Mod",
		title: "Chủ phòng (Host)",
		subtitle: "Chủ nhà cho thuê phòng / Homestay",
		description: "Đăng tin cho thuê phòng, quản lý tiện ích phòng, quản lý cơ sở lưu trú và tiếp nhận đặt phòng từ khách.",
		color: "#fbbf24",
		icon: HomeWorkOutlined
	},
	{
		role: "User",
		title: "Khách hàng (User - Xóa quyền)",
		subtitle: "Tài khoản khách thông thường",
		description: "Thu hồi quyền chủ phòng hoặc quyền quản trị. Người dùng trở về tài khoản khách hàng đặt phòng thông thường.",
		color: "#a1a1aa",
		icon: PersonOutline,
		isRevoke: true
	}
];

export const ChangeRoleDialog = memo<ChangeRoleDialogProps>(({ open, onClose, user, onSuccess }) => {
	const queryClient = useQueryClient();
	const [selectedRole, setSelectedRole] = useState<UserRole>("User");

	useEffect(() => {
		if (user?.role) {
			setSelectedRole(user.role);
		} else {
			setSelectedRole("User");
		}
	}, [user]);

	const mutation = useMutation(
		async ({ id, role }: { id: string; role: UserRole }) => changeUserRole(id, role),
		{
			onSuccess: () => {
				const roleName = roleOptions.find(r => r.role === selectedRole)?.title || selectedRole;
				toast.success(`Đã cập nhật quyền của ${user?.name || "người dùng"} thành: ${roleName}`);
				void queryClient.invalidateQueries(["users"]);
				if (user?.id) {
					void queryClient.invalidateQueries(["user", user.id]);
				}
				onSuccess?.();
				onClose();
			},
			onError: () => {
				toast.error("Không thể thay đổi quyền người dùng. Vui lòng thử lại.");
			}
		}
	);

	const handleSave = () => {
		if (!user?.id || mutation.isLoading) return;
		mutation.mutate({ id: user.id, role: selectedRole });
	};

	if (!user) return null;

	return (
		<Dialog
			open={open}
			onClose={mutation.isLoading ? undefined : onClose}
			maxWidth="sm"
			fullWidth
			PaperProps={{
				sx: {
					bgcolor: "#1a1b1f",
					backgroundImage: "none",
					color: "#f3f3f4",
					border: "1px solid rgba(255,255,255,.1)",
					borderRadius: "14px",
					boxShadow: "0 20px 45px rgba(0,0,0,0.6)"
				}
			}}
		>
			<DialogTitle
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: 3,
					pt: 2.5,
					pb: 1.5,
					borderBottom: "1px solid rgba(255,255,255,.07)"
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
					<Box
						sx={{
							width: 38,
							height: 38,
							borderRadius: "10px",
							bgcolor: "rgba(232,67,96,.14)",
							color: "#ff667f",
							display: "grid",
							placeItems: "center"
						}}
					>
						<AdminPanelSettingsOutlined sx={{ fontSize: 22 }} />
					</Box>
					<Box>
						<Typography sx={{ fontSize: 16, fontWeight: 700, color: "#f5f5f6", lineHeight: 1.2 }}>
							Phân quyền tài khoản
						</Typography>
						<Typography sx={{ fontSize: 12, color: "#8e9099", mt: 0.25 }}>
							Chỉ định vai trò hoặc xóa quyền quản trị của người dùng
						</Typography>
					</Box>
				</Box>
				<IconButton
					onClick={onClose}
					disabled={mutation.isLoading}
					size="small"
					sx={{ color: "#8a8c95", "&:hover": { color: "#fff", bgcolor: "#26272c" } }}
				>
					<Close fontSize="small" />
				</IconButton>
			</DialogTitle>

			<DialogContent sx={{ px: 3, py: 2.5 }}>
				{/* User Info Bar */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 2,
						p: 1.75,
						mb: 2.5,
						bgcolor: "#131417",
						border: "1px solid rgba(255,255,255,.07)",
						borderRadius: "10px"
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
						<Avatar
							src={user.avatar}
							sx={{
								width: 42,
								height: 42,
								bgcolor: "#2c2d33",
								color: "#ff8aa0",
								fontSize: 16,
								fontWeight: 700
							}}
						>
							{user.name?.charAt(0).toUpperCase() || "?"}
						</Avatar>
						<Box sx={{ minWidth: 0 }}>
							<Typography noWrap sx={{ fontSize: 14, fontWeight: 600, color: "#f0f0f2" }}>
								{user.name}
							</Typography>
							<Typography noWrap sx={{ fontSize: 12, color: "#92949c" }}>
								{user.email}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ textAlign: "right", flexShrink: 0 }}>
						<Typography sx={{ fontSize: 10.5, color: "#777983", mb: 0.5 }}>Vai trò hiện tại</Typography>
						<UserRoleChip role={user.role ?? "User"} size="small" />
					</Box>
				</Box>

				{/* Role Options */}
				<Typography sx={{ fontSize: 12, fontWeight: 600, color: "#b0b2ba", mb: 1.25, letterSpacing: ".02em" }}>
					CHỌN VAI TRÒ MỚI
				</Typography>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
					{roleOptions.map(option => {
						const isSelected = selectedRole === option.role;
						const Icon = option.icon;

						return (
							<Box
								key={option.role}
								onClick={() => setSelectedRole(option.role)}
								sx={{
									p: 1.5,
									borderRadius: "10px",
									cursor: "pointer",
									border: "1px solid",
									borderColor: isSelected
										? option.isRevoke
											? "rgba(255,255,255,.3)"
											: "rgba(255,102,127,.6)"
										: "rgba(255,255,255,.06)",
									bgcolor: isSelected
										? option.isRevoke
											? "rgba(255,255,255,.06)"
											: "rgba(232,67,96,.1)"
										: "#131417",
									transition: "all 150ms ease",
									"&:hover": {
										borderColor: isSelected ? undefined : "rgba(255,255,255,.18)",
										bgcolor: isSelected ? undefined : "rgba(255,255,255,.03)"
									}
								}}
							>
								<Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
									<Box
										sx={{
											width: 32,
											height: 32,
											borderRadius: "8px",
											display: "grid",
											placeItems: "center",
											bgcolor: isSelected ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.04)",
											color: option.color,
											flexShrink: 0,
											mt: 0.25
										}}
									>
										<Icon sx={{ fontSize: 18, color: option.color }} />
									</Box>
									<Box sx={{ flex: 1, minWidth: 0 }}>
										<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
											<Typography
												sx={{
													fontSize: 13,
													fontWeight: 650,
													color: isSelected ? "#fff" : "#dedfe3"
												}}
											>
												{option.title}
											</Typography>
											<Typography
												sx={{
													fontSize: 11,
													color: option.color,
													fontWeight: 600
												}}
											>
												{option.subtitle}
											</Typography>
										</Box>
										<Typography sx={{ fontSize: 11.5, color: "#8a8c95", mt: 0.5, lineHeight: 1.4 }}>
											{option.description}
										</Typography>
									</Box>
								</Box>
							</Box>
						);
					})}
				</Box>

				{/* Dialog Buttons */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						gap: 1.25,
						mt: 3,
						pt: 2,
						borderTop: "1px solid rgba(255,255,255,.07)"
					}}
				>
					<Button
						variant="text"
						onClick={onClose}
						disabled={mutation.isLoading}
						sx={{
							color: "#a4a6af",
							fontSize: 12.5,
							fontWeight: 600,
							textTransform: "none",
							px: 2,
							py: 0.9,
							borderRadius: "8px",
							"&:hover": { color: "#fff", bgcolor: "#24252a" }
						}}
					>
						Đóng
					</Button>
					<Button
						variant="contained"
						onClick={handleSave}
						disabled={mutation.isLoading || selectedRole === user.role}
						startIcon={mutation.isLoading ? <CircularProgress size={14} color="inherit" /> : null}
						sx={{
							bgcolor: selectedRole === "User" ? "#3b3d44" : "#e84360",
							color: "#fff",
							fontSize: 12.5,
							fontWeight: 650,
							textTransform: "none",
							px: 2.25,
							py: 0.9,
							borderRadius: "8px",
							boxShadow: "none",
							"&:hover": {
								bgcolor: selectedRole === "User" ? "#4a4c55" : "#ff5473",
								boxShadow: "none"
							},
							"&:disabled": {
								bgcolor: "#24252b",
								color: "#6b6d75"
							}
						}}
					>
						{mutation.isLoading
							? "Đang lưu..."
							: selectedRole === "User"
							? "Xác nhận xóa quyền"
							: "Áp dụng vai trò mới"}
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
});

export default ChangeRoleDialog;
