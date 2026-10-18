import {
	AdminPanelSettingsOutlined,
	BadgeOutlined,
	HomeWorkOutlined,
	PersonOutline
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { UserRole } from "../types";

interface UserRoleChipProps {
	role?: UserRole;
	size?: "small" | "medium";
}

const roleConfigs: Record<
	UserRole,
	{
		label: string;
		color: string;
		bg: string;
		border: string;
		icon: React.ComponentType<{ sx?: Record<string, unknown> }>;
	}
> = {
	Admin: {
		label: "Quản trị viên",
		color: "#c084fc",
		bg: "rgba(168, 85, 247, 0.14)",
		border: "rgba(168, 85, 247, 0.28)",
		icon: AdminPanelSettingsOutlined
	},
	Staff: {
		label: "Nhân viên",
		color: "#38bdf8",
		bg: "rgba(56, 189, 248, 0.14)",
		border: "rgba(56, 189, 248, 0.28)",
		icon: BadgeOutlined
	},
	Mod: {
		label: "Chủ phòng",
		color: "#fbbf24",
		bg: "rgba(251, 191, 36, 0.14)",
		border: "rgba(251, 191, 36, 0.28)",
		icon: HomeWorkOutlined
	},
	User: {
		label: "Khách hàng",
		color: "#a1a1aa",
		bg: "rgba(255, 255, 255, 0.06)",
		border: "rgba(255, 255, 255, 0.1)",
		icon: PersonOutline
	}
};

export const UserRoleChip = memo<UserRoleChipProps>(({ role = "User", size = "small" }) => {
	const config = roleConfigs[role] ?? roleConfigs.User;
	const IconComponent = config.icon;
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
				bgcolor: config.bg,
				color: config.color,
				border: `1px solid ${config.border}`,
				borderRadius: "6px",
				whiteSpace: "nowrap",
				userSelect: "none"
			}}
		>
			<IconComponent sx={{ fontSize: isSmall ? 13 : 15, color: config.color }} />
			<Typography
				component="span"
				sx={{
					font: "inherit",
					fontSize: isSmall ? 11 : 12,
					fontWeight: 600,
					letterSpacing: "0.01em",
					color: config.color,
					lineHeight: 1
				}}
			>
				{config.label}
			</Typography>
		</Box>
	);
});

export default UserRoleChip;
