import { BlockOutlined, CheckCircleOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { UserStatus } from "../types";

interface UserStatusChipProps {
	status?: UserStatus;
	isBlocked?: boolean;
	size?: "small" | "medium";
}

export const UserStatusChip = memo<UserStatusChipProps>(({ status, isBlocked, size = "small" }) => {
	const blocked = isBlocked || status === "Blocked";
	const isSmall = size === "small";

	return (
		<Box
			component="span"
			sx={{
				display: "inline-flex",
				alignItems: "center",
				gap: 0.6,
				px: isSmall ? 0.9 : 1.25,
				py: isSmall ? 0.35 : 0.5,
				bgcolor: blocked ? "rgba(239, 68, 68, 0.12)" : "rgba(52, 211, 153, 0.12)",
				color: blocked ? "#f87171" : "#34d399",
				border: `1px solid ${blocked ? "rgba(239, 68, 68, 0.26)" : "rgba(52, 211, 153, 0.26)"}`,
				borderRadius: "6px",
				whiteSpace: "nowrap",
				userSelect: "none"
			}}
		>
			<Box
				component="span"
				sx={{
					width: 6,
					height: 6,
					borderRadius: "50%",
					bgcolor: blocked ? "#ef4444" : "#10b981",
					boxShadow: blocked
						? "0 0 6px rgba(239, 68, 68, 0.6)"
						: "0 0 6px rgba(16, 185, 129, 0.6)"
				}}
			/>
			{blocked ? (
				<BlockOutlined sx={{ fontSize: isSmall ? 12 : 14, color: "#f87171" }} />
			) : (
				<CheckCircleOutline sx={{ fontSize: isSmall ? 12 : 14, color: "#34d399" }} />
			)}
			<Typography
				component="span"
				sx={{
					font: "inherit",
					fontSize: isSmall ? 11 : 12,
					fontWeight: 600,
					letterSpacing: "0.01em",
					color: blocked ? "#f87171" : "#34d399",
					lineHeight: 1
				}}
			>
				{blocked ? "Blacklist / Khóa" : "Đang hoạt động"}
			</Typography>
		</Box>
	);
});

export default UserStatusChip;
