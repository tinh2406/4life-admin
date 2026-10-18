import {
	AdminPanelSettingsOutlined,
	ArrowBack,
	BlockOutlined,
	DeleteOutline,
	LockOpenOutlined,
	WarningAmberOutlined
} from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import colors from "../../assets/theme/base/colors";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import { DetailUser } from "./api/User";
import { getUser } from "./api/getDetail";
import UserRoleChip from "../../features/users/components/UserRoleChip";
import UserStatusChip from "../../features/users/components/UserStatusChip";
import ChangeRoleDialog from "../../features/users/components/ChangeRoleDialog";
import BlockUserDialog from "../../features/users/components/BlockUserDialog";
import DeleteUserDialog from "../../features/users/components/DeleteUserDialog";

const UserDetail = memo(function UserDetail() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [roleDialogOpen, setRoleDialogOpen] = useState(false);
	const [blockDialogOpen, setBlockDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const { data: user, isLoading } = useQuery<DetailUser, unknown, DetailUser>({
		queryKey: ["user", id],
		queryFn: () => getUser(id as string),
		enabled: Boolean(id)
	});

	if (isLoading) return <Loading />;
	if (!user) return <NotFound />;

	const isBlocked = Boolean(user.isBlocked || user.status === "Blocked");

	return (
		<Box pb={4}>
			{/* Back Link */}
			<Box mb={2.5}>
				<Button
					component={Link}
					to="/users"
					startIcon={<ArrowBack />}
					variant="text"
					sx={{
						color: colors.text.focus,
						fontWeight: 600,
						fontSize: 13,
						textTransform: "none",
						"&:hover": { backgroundColor: colors.grey[200] }
					}}
				>
					Quay lại danh sách người dùng
				</Button>
			</Box>

			{/* Blacklist Warning Banner if blocked */}
			{isBlocked && (
				<Box
					sx={{
						mb: 3,
						p: 2,
						bgcolor: "rgba(239, 68, 68, 0.1)",
						border: "1px solid rgba(239, 68, 68, 0.3)",
						borderRadius: "12px",
						display: "flex",
						alignItems: "flex-start",
						gap: 1.5
					}}
				>
					<WarningAmberOutlined sx={{ color: "#f87171", fontSize: 24, mt: 0.25, flexShrink: 0 }} />
					<Box sx={{ flex: 1 }}>
						<Typography sx={{ color: "#fca5a5", fontSize: 14, fontWeight: 700 }}>
							Tài khoản đang bị khóa và nằm trong Danh sách đen (Blacklist)
						</Typography>
						<Typography sx={{ color: "#fecaca", fontSize: 12.5, mt: 0.5, lineHeight: 1.5 }}>
							{user.blockReason
								? `Lý do xử lý: ${user.blockReason}`
								: "Tài khoản hiện đang bị đình chỉ mọi quyền hạn đăng nhập và giao dịch trên nền tảng."}
						</Typography>
					</Box>
					<Button
						variant="outlined"
						size="small"
						onClick={() => setBlockDialogOpen(true)}
						startIcon={<LockOpenOutlined sx={{ fontSize: 16 }} />}
						sx={{
							borderColor: "rgba(52, 211, 153, 0.4)",
							color: "#34d399",
							textTransform: "none",
							fontSize: 12,
							fontWeight: 650,
							bgcolor: "rgba(52, 211, 153, 0.1)",
							"&:hover": {
								borderColor: "#34d399",
								bgcolor: "rgba(52, 211, 153, 0.2)"
							}
						}}
					>
						Mở khóa ngay
					</Button>
				</Box>
			)}

			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Card
						sx={{
							p: 3,
							backgroundColor: colors.dark.main,
							border: `1px solid ${colors.grey[300]}`,
							borderRadius: 2.5,
							boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)"
						}}
					>
						{/* User Header & Action Controls */}
						<Box
							display="flex"
							alignItems={{ xs: "flex-start", md: "center" }}
							justifyContent="space-between"
							flexDirection={{ xs: "column", md: "row" }}
							gap={2.5}
							mb={3}
						>
							<Box display="flex" alignItems="center" gap={2.5}>
								<Avatar
									src={user?.avatar}
									sx={{
										width: 68,
										height: 68,
										border: isBlocked ? "2px solid #ef4444" : `1px solid ${colors.grey[300]}`,
										bgcolor: colors.grey[200],
										color: colors.text.focus,
										fontSize: 22,
										fontWeight: 700
									}}
								>
									{user?.name ? user.name.charAt(0).toUpperCase() : "U"}
								</Avatar>

								<Box>
									<Box display="flex" alignItems="center" gap={1.25} flexWrap="wrap" mb={0.5}>
										<Typography variant="h5" fontWeight={700} color="text.primary">
											{user?.name}
										</Typography>
										<UserRoleChip role={user?.role ?? "User"} size="small" />
										<UserStatusChip status={user?.status} isBlocked={user?.isBlocked} size="small" />
									</Box>
									<Typography variant="caption" color="text.secondary">
										Mã tài khoản (User ID): {user?.id}
									</Typography>
								</Box>
							</Box>

							{/* Top Actions: Phân quyền, Khóa / Blacklist, Xóa */}
							<Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
								<Button
									variant="outlined"
									size="small"
									onClick={() => setRoleDialogOpen(true)}
									startIcon={<AdminPanelSettingsOutlined sx={{ fontSize: 16 }} />}
									sx={{
										color: "#c084fc",
										borderColor: "rgba(168, 85, 247, 0.35)",
										bgcolor: "rgba(168, 85, 247, 0.08)",
										textTransform: "none",
										fontSize: 12.5,
										fontWeight: 650,
										borderRadius: "8px",
										px: 1.5,
										py: 0.65,
										"&:hover": {
											borderColor: "#c084fc",
											bgcolor: "rgba(168, 85, 247, 0.16)"
										}
									}}
								>
									Phân quyền vai trò
								</Button>

								<Button
									variant="outlined"
									size="small"
									onClick={() => setBlockDialogOpen(true)}
									startIcon={isBlocked ? <LockOpenOutlined sx={{ fontSize: 16 }} /> : <BlockOutlined sx={{ fontSize: 16 }} />}
									sx={{
										color: isBlocked ? "#34d399" : "#f87171",
										borderColor: isBlocked ? "rgba(52, 211, 153, 0.35)" : "rgba(239, 68, 68, 0.35)",
										bgcolor: isBlocked ? "rgba(52, 211, 153, 0.08)" : "rgba(239, 68, 68, 0.08)",
										textTransform: "none",
										fontSize: 12.5,
										fontWeight: 650,
										borderRadius: "8px",
										px: 1.5,
										py: 0.65,
										"&:hover": {
											borderColor: isBlocked ? "#34d399" : "#f87171",
											bgcolor: isBlocked ? "rgba(52, 211, 153, 0.16)" : "rgba(239, 68, 68, 0.16)"
										}
									}}
								>
									{isBlocked ? "Mở khóa tài khoản" : "Khóa / Blacklist"}
								</Button>

								<Button
									variant="outlined"
									size="small"
									onClick={() => setDeleteDialogOpen(true)}
									startIcon={<DeleteOutline sx={{ fontSize: 16 }} />}
									sx={{
										color: "#ef4444",
										borderColor: "rgba(239, 68, 68, 0.3)",
										bgcolor: "transparent",
										textTransform: "none",
										fontSize: 12.5,
										fontWeight: 650,
										borderRadius: "8px",
										px: 1.5,
										py: 0.65,
										"&:hover": {
											borderColor: "#ef4444",
											bgcolor: "rgba(239, 68, 68, 0.12)"
										}
									}}
								>
									Xóa tài khoản
								</Button>
							</Box>
						</Box>

						{/* Detail Info Grid */}
						<Box
							display="grid"
							gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}
							gap={2.5}
							pt={2.5}
							borderTop={`1px solid ${colors.grey[200]}`}
						>
							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Số điện thoại
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.phoneNumber || "Chưa cung cấp"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Địa chỉ Email
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.email}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Giới tính
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.gender !== null ? (user?.gender ? "Nam" : "Nữ") : "Chưa xác định"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Ngày sinh
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.dateOfBirth || "Chưa cung cấp"}
								</Typography>
							</Box>
						</Box>

						{user?.description && (
							<Box mt={2.5} pt={2} borderTop={`1px dashed ${colors.grey[200]}`}>
								<Typography variant="caption" color="text.secondary" display="block">
									Mô tả / Tiểu sử
								</Typography>
								<Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
									{user.description}
								</Typography>
							</Box>
						)}
					</Card>
				</Grid>

				{/* Identity Verification Cards */}
				{user?.frontIdentityCard && (
					<Grid item xs={12} md={6}>
						<Card
							sx={{
								p: 2,
								backgroundColor: colors.dark.main,
								border: `1px solid ${colors.grey[300]}`,
								borderRadius: 2.5,
								boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)"
							}}
						>
							<Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1.5}>
								Căn cước công dân — Mặt trước
							</Typography>
							<CardMedia
								component="img"
								sx={{
									aspectRatio: "1.6 / 1",
									width: "100%",
									borderRadius: 2,
									objectFit: "cover"
								}}
								image={user.frontIdentityCard}
								alt={`${user.name} Mặt trước CCCD`}
							/>
						</Card>
					</Grid>
				)}

				{user?.backIdentityCard && (
					<Grid item xs={12} md={6}>
						<Card
							sx={{
								p: 2,
								backgroundColor: colors.dark.main,
								border: `1px solid ${colors.grey[300]}`,
								borderRadius: 2.5,
								boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)"
							}}
						>
							<Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1.5}>
								Căn cước công dân — Mặt sau
							</Typography>
							<CardMedia
								component="img"
								sx={{
									aspectRatio: "1.6 / 1",
									width: "100%",
									borderRadius: 2,
									objectFit: "cover"
								}}
								image={user.backIdentityCard}
								alt={`${user.name} Mặt sau CCCD`}
							/>
						</Card>
					</Grid>
				)}
			</Grid>

			{/* Interactive Modals */}
			<ChangeRoleDialog
				open={roleDialogOpen}
				onClose={() => setRoleDialogOpen(false)}
				user={user}
			/>

			<BlockUserDialog
				open={blockDialogOpen}
				onClose={() => setBlockDialogOpen(false)}
				user={user}
			/>

			<DeleteUserDialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				user={user}
				onSuccess={() => navigate("/users")}
			/>
		</Box>
	);
});

export default UserDetail;
