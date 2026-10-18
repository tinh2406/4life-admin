import {
	BlockOutlined,
	Close,
	LockOpenOutlined,
	WarningAmberOutlined
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { blockUser } from "../users.api";
import { UserStatus } from "../types";

interface BlockUserDialogProps {
	open: boolean;
	onClose: () => void;
	user: {
		id: string;
		name: string;
		email: string;
		avatar?: string;
		isBlocked?: boolean;
		status?: UserStatus;
		blockReason?: string;
	} | null;
	onSuccess?: () => void;
}

const suggestedReasons = [
	"Vi phạm chính sách thanh toán & hoàn tiền",
	"Nghi vấn gian lận hoặc mạo danh người khác",
	"Liên tục hủy phòng và quấy rối dịch vụ",
	"Vi phạm tiêu chuẩn cộng đồng lưu trú"
];

export const BlockUserDialog = memo<BlockUserDialogProps>(({ open, onClose, user, onSuccess }) => {
	const queryClient = useQueryClient();
	const isBlocked = Boolean(user?.isBlocked || user?.status === "Blocked");
	const [reason, setReason] = useState("");

	useEffect(() => {
		setReason("");
	}, [open, user]);

	const mutation = useMutation(
		async ({ id, targetBlocked, blockReason }: { id: string; targetBlocked: boolean; blockReason?: string }) =>
			blockUser(id, targetBlocked, blockReason),
		{
			onSuccess: () => {
				if (isBlocked) {
					toast.success(`Đã mở khóa tài khoản cho ${user?.name || "người dùng"}.`);
				} else {
					toast.warning(`Đã đưa ${user?.name || "người dùng"} vào danh sách đen (Blacklist).`);
				}
				void queryClient.invalidateQueries(["users"]);
				if (user?.id) {
					void queryClient.invalidateQueries(["user", user.id]);
				}
				onSuccess?.();
				onClose();
			},
			onError: () => {
				toast.error(
					isBlocked
						? "Không thể mở khóa tài khoản. Vui lòng thử lại."
						: "Không thể khóa tài khoản. Vui lòng thử lại."
				);
			}
		}
	);

	const handleConfirm = () => {
		if (!user?.id || mutation.isLoading) return;
		const nextBlockedState = !isBlocked;
		mutation.mutate({
			id: user.id,
			targetBlocked: nextBlockedState,
			blockReason: nextBlockedState ? reason.trim() || undefined : undefined
		});
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
							bgcolor: isBlocked ? "rgba(52,211,153,.14)" : "rgba(239,68,68,.14)",
							color: isBlocked ? "#34d399" : "#f87171",
							display: "grid",
							placeItems: "center"
						}}
					>
						{isBlocked ? <LockOpenOutlined sx={{ fontSize: 22 }} /> : <BlockOutlined sx={{ fontSize: 22 }} />}
					</Box>
					<Box>
						<Typography sx={{ fontSize: 16, fontWeight: 700, color: "#f5f5f6", lineHeight: 1.2 }}>
							{isBlocked ? "Mở khóa tài khoản" : "Khóa tài khoản (Blacklist)"}
						</Typography>
						<Typography sx={{ fontSize: 12, color: "#8e9099", mt: 0.25 }}>
							{isBlocked
								? "Khôi phục quyền truy cập hệ thống cho người dùng"
								: "Đưa tài khoản vào danh sách đen & hạn chế truy cập"}
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
						gap: 1.5,
						p: 1.75,
						mb: 2.5,
						bgcolor: "#131417",
						border: "1px solid rgba(255,255,255,.07)",
						borderRadius: "10px"
					}}
				>
					<Avatar
						src={user.avatar}
						sx={{
							width: 44,
							height: 44,
							bgcolor: "#2c2d33",
							color: "#ff8aa0",
							fontSize: 16,
							fontWeight: 700
						}}
					>
						{user.name?.charAt(0).toUpperCase() || "?"}
					</Avatar>
					<Box sx={{ minWidth: 0, flex: 1 }}>
						<Typography noWrap sx={{ fontSize: 14, fontWeight: 600, color: "#f0f0f2" }}>
							{user.name}
						</Typography>
						<Typography noWrap sx={{ fontSize: 12, color: "#92949c" }}>
							{user.email} (ID: {user.id})
						</Typography>
					</Box>
				</Box>

				{isBlocked ? (
					/* Unblock confirmation view */
					<Box>
						<Box
							sx={{
								p: 2,
								borderRadius: "10px",
								bgcolor: "rgba(52,211,153,.08)",
								border: "1px solid rgba(52,211,153,.2)",
								display: "flex",
								gap: 1.25,
								alignItems: "flex-start",
								mb: 2
							}}
						>
							<LockOpenOutlined sx={{ color: "#34d399", fontSize: 20, mt: 0.25, flexShrink: 0 }} />
							<Box>
								<Typography sx={{ fontSize: 13, fontWeight: 600, color: "#6ee7b7" }}>
									Khôi phục quyền truy cập
								</Typography>
								<Typography sx={{ fontSize: 12, color: "#a7f3d0", mt: 0.5, lineHeight: 1.45 }}>
									Người dùng sẽ có thể đăng nhập trở lại, nhận thông báo và thực hiện các giao dịch đặt phòng hoặc quản lý bình thường.
								</Typography>
							</Box>
						</Box>

						{user.blockReason && (
							<Box
								sx={{
									p: 1.5,
									borderRadius: "8px",
									bgcolor: "rgba(255,255,255,.04)",
									border: "1px solid rgba(255,255,255,.07)"
								}}
							>
								<Typography sx={{ fontSize: 11, color: "#8a8c95", fontWeight: 600 }}>
									LÝ DO KHÓA TRƯỚC ĐÓ:
								</Typography>
								<Typography sx={{ fontSize: 12.5, color: "#fca5a5", mt: 0.5 }}>
									{user.blockReason}
								</Typography>
							</Box>
						)}
					</Box>
				) : (
					/* Block / Blacklist view */
					<Box>
						<Box
							sx={{
								p: 2,
								borderRadius: "10px",
								bgcolor: "rgba(239,68,68,.08)",
								border: "1px solid rgba(239,68,68,.2)",
								display: "flex",
								gap: 1.25,
								alignItems: "flex-start",
								mb: 2.5
							}}
						>
							<WarningAmberOutlined sx={{ color: "#f87171", fontSize: 20, mt: 0.25, flexShrink: 0 }} />
							<Box>
								<Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fca5a5" }}>
									Cảnh báo đình chỉ tài khoản
								</Typography>
								<Typography sx={{ fontSize: 12, color: "#fecaca", mt: 0.5, lineHeight: 1.45 }}>
									Tài khoản sẽ bị đưa vào danh sách đen, hủy các phiên đăng nhập đang hoạt động và không thể thực hiện hành động trên hệ thống cho tới khi được gỡ bỏ.
								</Typography>
							</Box>
						</Box>

						<Typography sx={{ fontSize: 12, fontWeight: 600, color: "#b0b2ba", mb: 1, letterSpacing: ".02em" }}>
							GỢI Ý LÝ DO KHÓA
						</Typography>

						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
							{suggestedReasons.map(item => (
								<Chip
									key={item}
									label={item}
									onClick={() => setReason(item)}
									size="small"
									sx={{
										fontSize: 11,
										bgcolor: reason === item ? "rgba(232,67,96,.2)" : "#222328",
										color: reason === item ? "#ff8094" : "#a8a9b2",
										border: `1px solid ${reason === item ? "rgba(232,67,96,.4)" : "rgba(255,255,255,.08)"}`,
										"&:hover": {
											bgcolor: "#2c2d33",
											color: "#fff"
										}
									}}
								/>
							))}
						</Box>

						<TextField
							fullWidth
							multiline
							rows={3}
							label="Lý do khóa / ghi chú kiểm duyệt"
							placeholder="Nhập lý do cụ thể để lưu vết hành vi kiểm duyệt..."
							value={reason}
							onChange={e => setReason(e.target.value)}
							sx={{
								"& .MuiOutlinedInput-root": {
									bgcolor: "#131417",
									color: "#f0f0f2",
									borderRadius: "8px",
									fontSize: 12.5,
									"& fieldset": { borderColor: "rgba(255,255,255,.1)" },
									"&:hover fieldset": { borderColor: "rgba(255,255,255,.22)" },
									"&.Mui-focused fieldset": { borderColor: "#ff667f" }
								},
								"& .MuiInputLabel-root": { color: "#8a8c95", fontSize: 12.5 },
								"& .MuiInputLabel-root.Mui-focused": { color: "#ff8094" }
							}}
						/>
					</Box>
				)}

				{/* Action Buttons */}
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
						Hủy bỏ
					</Button>
					<Button
						variant="contained"
						onClick={handleConfirm}
						disabled={mutation.isLoading}
						startIcon={mutation.isLoading ? <CircularProgress size={14} color="inherit" /> : null}
						sx={{
							bgcolor: isBlocked ? "#10b981" : "#ef4444",
							color: "#fff",
							fontSize: 12.5,
							fontWeight: 650,
							textTransform: "none",
							px: 2.25,
							py: 0.9,
							borderRadius: "8px",
							boxShadow: "none",
							"&:hover": {
								bgcolor: isBlocked ? "#059669" : "#dc2626",
								boxShadow: "none"
							}
						}}
					>
						{mutation.isLoading
							? "Đang xử lý..."
							: isBlocked
							? "Xác nhận mở khóa"
							: "Xác nhận đưa vào Blacklist"}
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
});

export default BlockUserDialog;
