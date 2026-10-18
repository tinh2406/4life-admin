import {
	Close,
	DeleteForeverOutlined,
	WarningAmberOutlined
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
import { memo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../users.api";

interface DeleteUserDialogProps {
	open: boolean;
	onClose: () => void;
	user: {
		id: string;
		name: string;
		email: string;
		avatar?: string;
	} | null;
	onSuccess?: () => void;
}

export const DeleteUserDialog = memo<DeleteUserDialogProps>(({ open, onClose, user, onSuccess }) => {
	const queryClient = useQueryClient();

	const mutation = useMutation(
		async (id: string) => deleteUser(id),
		{
			onSuccess: () => {
				toast.success(`Đã xóa vĩnh viễn tài khoản của ${user?.name || "người dùng"}.`);
				void queryClient.invalidateQueries(["users"]);
				onSuccess?.();
				onClose();
			},
			onError: () => {
				toast.error("Không thể xóa người dùng. Vui lòng thử lại sau.");
			}
		}
	);

	const handleDelete = () => {
		if (!user?.id || mutation.isLoading) return;
		mutation.mutate(user.id);
	};

	if (!user) return null;

	return (
		<Dialog
			open={open}
			onClose={mutation.isLoading ? undefined : onClose}
			maxWidth="xs"
			fullWidth
			PaperProps={{
				sx: {
					bgcolor: "#1a1b1f",
					backgroundImage: "none",
					color: "#f3f3f4",
					border: "1px solid rgba(239,68,68,.3)",
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
							bgcolor: "rgba(239,68,68,.14)",
							color: "#ef4444",
							display: "grid",
							placeItems: "center"
						}}
					>
						<DeleteForeverOutlined sx={{ fontSize: 22 }} />
					</Box>
					<Box>
						<Typography sx={{ fontSize: 16, fontWeight: 700, color: "#f5f5f6", lineHeight: 1.2 }}>
							Xác nhận xóa tài khoản
						</Typography>
						<Typography sx={{ fontSize: 12, color: "#8e9099", mt: 0.25 }}>
							Hành động mang tính phá hủy và vĩnh viễn
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
					<WarningAmberOutlined sx={{ color: "#f87171", fontSize: 22, mt: 0.25, flexShrink: 0 }} />
					<Typography sx={{ fontSize: 12.5, color: "#fca5a5", lineHeight: 1.5 }}>
						Bạn sắp xóa vĩnh viễn tài khoản người dùng này. Toàn bộ thông tin cá nhân và dữ liệu liên quan sẽ bị xóa khỏi hệ thống và không thể khôi phục.
					</Typography>
				</Box>

				{/* User Target Card */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1.5,
						p: 1.75,
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
							{user.email}
						</Typography>
						<Typography noWrap sx={{ fontSize: 11, color: "#6b6d76", fontFamily: "monospace" }}>
							ID: {user.id}
						</Typography>
					</Box>
				</Box>

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
						onClick={handleDelete}
						disabled={mutation.isLoading}
						startIcon={mutation.isLoading ? <CircularProgress size={14} color="inherit" /> : null}
						sx={{
							bgcolor: "#ef4444",
							color: "#fff",
							fontSize: 12.5,
							fontWeight: 650,
							textTransform: "none",
							px: 2.25,
							py: 0.9,
							borderRadius: "8px",
							boxShadow: "none",
							"&:hover": {
								bgcolor: "#dc2626",
								boxShadow: "none"
							}
						}}
					>
						{mutation.isLoading ? "Đang xóa..." : "Xóa vĩnh viễn"}
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
});

export default DeleteUserDialog;
