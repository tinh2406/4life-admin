import { ArrowForward, Fingerprint } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { memo } from "react";
import { Link } from "react-router-dom";
import { CollapseUser } from "../api/User";

type UserCardProps = {
	user: CollapseUser;
	active: boolean;
	onCardClick?: (id: string) => void;
};

const UserCard = memo(function UserCard({
	user,
	active,
	onCardClick
}: UserCardProps) {
	return (
			<Card
				sx={{
					position: "relative",
					height: "100%",
					backgroundColor: "#171C1D",
					border: "1px solid #303738",
					borderRadius: "8px",
					boxShadow: "none",
					transition: "border-color 150ms ease, background-color 150ms ease",
					"&:hover": { borderColor: "#465151", backgroundColor: "#1B2021" }
				}}
			>
				{active && (
					<Box
						sx={{
							position: "absolute",
							top: 14,
							right: 14,
							px: 0.9,
							py: 0.35,
							borderRadius: "5px",
							bgcolor: "rgba(255, 178, 183, 0.12)",
							color: "#FFB2B7",
							fontSize: 10,
							fontWeight: 700,
							letterSpacing: "0.04em",
							textTransform: "uppercase"
						}}
					>
						New
					</Box>
				)}

				<Box sx={{ p: 2.25, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
					<Box
						component={Link}
						to={user.id}
						onClick={() => onCardClick?.(user.id)}
						sx={{ textDecoration: "none", color: "inherit", display: "block", borderRadius: "6px", "&:focus-visible": { outline: "2px solid #ff8094", outlineOffset: 3 } }}
					>
						<Box display="flex" alignItems="center" gap={1.5} mb={2}>
							<Avatar
								src={user.avatar}
								alt={user.name || "Applicant avatar"}
								sx={{ width: 46, height: 46, border: "1px solid #3B4142", bgcolor: "#2A2A2C", color: "#ff8094", fontSize: 14, fontWeight: 600 }}
							>
								{user.name ? user.name.charAt(0).toUpperCase() : "U"}
							</Avatar>
							<Box sx={{ minWidth: 0, flex: 1, pr: active ? 5 : 0 }}>
								<Typography variant="subtitle2" noWrap sx={{ color: "#F2F4F3", fontWeight: 650, fontSize: 14, "a:hover &": { color: "#ff8094" } }}>
									{user.name || "Chưa cập nhật tên"}
								</Typography>
								<Typography variant="caption" noWrap display="block" sx={{ color: "#A1A8A5", fontSize: 11.5 }}>
									Hồ sơ · {user.id.slice(0, 8)}
								</Typography>
							</Box>
						</Box>
					</Box>

						<Box sx={{ p: 1.25, mb: 1.5, bgcolor: "#111516", borderRadius: "6px", display: "grid", gap: 1.1 }}>
						<Box sx={{ minWidth: 0 }}>
						<Typography component="span" variant="caption" sx={{ color: "#A1A8A5", fontSize: 11.5, mr: 0.75 }}>Email</Typography>
							<Typography component="span" variant="body2" sx={{ color: "#E5E1E4", fontSize: 12.5, overflowWrap: "anywhere" }}>{user.email || "Chưa cung cấp"}</Typography>
						</Box>
						<Box sx={{ minWidth: 0 }}>
							<Typography component="span" variant="caption" sx={{ color: "#A1A8A5", fontSize: 11.5, mr: 0.75 }}>Điện thoại</Typography>
							<Typography component="span" variant="body2" sx={{ color: "#E5E1E4", fontSize: 12.5 }}>{user.phoneNumber || "Chưa cung cấp"}</Typography>
						</Box>
					</Box>

					<Box display="flex" alignItems="center" gap={0.75} sx={{ mt: "auto", mb: 1.75, color: "#ff8094" }}>
						<Fingerprint sx={{ fontSize: 16 }} />
						<Typography variant="caption" sx={{ color: "#ff8094", fontSize: 11.5 }}>Đã gửi giấy tờ tùy thân</Typography>
					</Box>

					<Button
						component={Link}
						to={user.id}
						onClick={() => onCardClick?.(user.id)}
						endIcon={<ArrowForward fontSize="small" />}
						fullWidth
						sx={{ mt: "auto", minHeight: 40, color: "#ff8094", borderTop: "1px solid #303738", borderRadius: 0, justifyContent: "space-between", textTransform: "none", fontWeight: 600, fontSize: 12, "&:hover": { bgcolor: "rgba(255,56,92,.08)" } }}
					>
						Xem giấy tờ
					</Button>
				</Box>
			</Card>
	);
});

export default UserCard;
