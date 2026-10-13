import { Box, Card, Typography } from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";
import colors from "../../../assets/theme/base/colors";
import { ColorType } from "./type";

import { memo } from "react";

type StatisticsCardProps = {
	color: ColorType;
	title: string;
	count: string | number;
	percentage: {
		color: "success" | "warning" | "error" | "light";
		amount: string;
		label: string;
	};
	icon: React.ReactNode;
};

const ComplexStatisticsCard = memo(function ComplexStatisticsCard({
	color,
	title,
	count,
	percentage,
	icon
}: StatisticsCardProps) {
	const isPositive = percentage.color === "success";
	const isNegative = percentage.color === "error";

	const iconBg =
		color === "primary"
			? "rgba(88, 101, 242, 0.15)"
			: color === "info"
			? "rgba(0, 176, 244, 0.15)"
			: color === "success"
			? "rgba(53, 237, 126, 0.15)"
			: color === "warning"
			? "rgba(254, 231, 92, 0.15)"
			: color === "error"
			? "rgba(237, 66, 69, 0.15)"
			: "rgba(255, 255, 255, 0.08)";

	const iconColor =
		color === "primary"
			? colors.primary.main
			: color === "info"
			? colors.info.main
			: color === "success"
			? colors.success.main
			: color === "warning"
			? colors.warning.main
			: color === "error"
			? colors.error.main
			: colors.text.focus;

	const deltaBg = isPositive ? "rgba(53, 237, 126, 0.15)" : isNegative ? "rgba(237, 66, 69, 0.15)" : "rgba(255, 255, 255, 0.08)";
	const deltaColor = isPositive ? colors.success.main : isNegative ? colors.error.main : colors.text.main;
	const deltaBorder = isPositive ? "rgba(53, 237, 126, 0.25)" : isNegative ? "rgba(237, 66, 69, 0.25)" : "rgba(255, 255, 255, 0.1)";

	return (
		<Card
			sx={{
				p: 2.5,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: colors.dark.main,
				border: `1px solid rgba(255, 255, 255, 0.06)`,
				borderRadius: "16px",
				boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
				transition: "border-color 150ms ease, box-shadow 150ms ease",
				"&:hover": {
					borderColor: colors.grey[400],
					boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
				}
			}}
		>
			<Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
				<Box
					sx={{
						width: 44,
						height: 44,
						borderRadius: 2,
						backgroundColor: iconBg,
						color: iconColor,
						display: "grid",
						placeItems: "center",
						flexShrink: 0,
						border: `1px solid ${colors.grey[300]}`,
						"& svg": {
							fontSize: 22
						}
					}}
				>
					{icon}
				</Box>

				<Box textAlign="right">
					<Typography
						variant="caption"
						fontWeight={500}
						color="text.secondary"
						display="block"
						mb={0.5}
						sx={{ fontSize: 12.5 }}
					>
						{title}
					</Typography>
					<Typography
						variant="h4"
						fontWeight={700}
						color="text.primary"
						sx={{
							fontVariantNumeric: "tabular-nums",
							letterSpacing: "-0.02em",
							fontSize: 26
						}}
					>
						{count}
					</Typography>
				</Box>
			</Box>

			<Box
				display="flex"
				alignItems="center"
				pt={1.5}
				borderTop={`1px solid ${colors.grey[200]}`}
				gap={1}
			>
				<Box
					sx={{
						display: "inline-flex",
						alignItems: "center",
						gap: 0.5,
						px: 1,
						py: 0.25,
						borderRadius: 1.5,
						backgroundColor: deltaBg,
						color: deltaColor,
						border: `1px solid ${deltaBorder}`,
						fontWeight: 600,
						fontSize: 11.5
					}}
				>
					{isPositive && <TrendingUp sx={{ fontSize: 14 }} />}
					{isNegative && <TrendingDown sx={{ fontSize: 14 }} />}
					<span>{percentage.amount}</span>
				</Box>

				<Typography
					variant="caption"
					color="text.secondary"
					noWrap
					sx={{ fontSize: 12 }}
				>
					{percentage.label}
				</Typography>
			</Box>
		</Card>
	);
});

export default ComplexStatisticsCard;
