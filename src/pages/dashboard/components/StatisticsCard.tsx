import { Box, Card, Typography } from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";
import colors from "../../../assets/theme/base/colors";
import { ColorType } from "./type";
import linearGradient from "../../../assets/theme/functions/linearGradient";
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

	const gradientBg =
		color === "light"
			? linearGradient(colors.grey[200], colors.grey[300])
			: color === "dark"
			? linearGradient("#344767", "#1e2e4a")
			: colors.gradients[color]
			? linearGradient(colors.gradients[color].main, colors.gradients[color].state)
			: linearGradient(colors.gradients.primary.main, colors.gradients.primary.state);

	const badgeBg =
		isPositive
			? "rgba(76, 175, 80, 0.12)"
			: isNegative
			? "rgba(244, 67, 53, 0.12)"
			: "rgba(123, 128, 154, 0.12)";

	const badgeColor =
		isPositive
			? colors.success.main
			: isNegative
			? colors.error.main
			: colors.text.main;

	return (
		<Card
			sx={{
				p: 2.5,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				transition: "transform 150ms ease, box-shadow 150ms ease",
				"&:hover": {
					transform: "translateY(-3px)",
					boxShadow: 4
				}
			}}
		>
			<Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
				<Box
					sx={{
						width: 48,
						height: 48,
						borderRadius: 3,
						background: gradientBg,
						color: color === "light" ? colors.dark.main : "#ffffff",
						display: "grid",
						placeItems: "center",
						boxShadow: 2,
						flexShrink: 0
					}}
				>
					{icon}
				</Box>

				<Box textAlign="right">
					<Typography
						variant="caption"
						fontWeight="medium"
						color="text.secondary"
						textTransform="capitalize"
						display="block"
						mb={0.5}
					>
						{title}
					</Typography>
					<Typography variant="h4" fontWeight="bold" color="text.primary">
						{count}
					</Typography>
				</Box>
			</Box>

			<Box
				display="flex"
				alignItems="center"
				pt={1.5}
				borderTop="1px solid"
				borderColor={colors.grey[200]}
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
						backgroundColor: badgeBg,
						color: badgeColor,
						fontWeight: "bold",
						fontSize: 12
					}}
				>
					{isPositive && <TrendingUp sx={{ fontSize: 16 }} />}
					{isNegative && <TrendingDown sx={{ fontSize: 16 }} />}
					<span>{percentage.amount}</span>
				</Box>

				<Typography variant="caption" color="text.secondary" noWrap>
					{percentage.label}
				</Typography>
			</Box>
		</Card>
	);
});

export default ComplexStatisticsCard;
