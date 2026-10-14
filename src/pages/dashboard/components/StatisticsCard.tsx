import { Box, Card, Typography } from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";

import { memo } from "react";

type StatisticsCardProps = {
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
	title,
	count,
	percentage,
	icon
}: StatisticsCardProps) {
	const isPositive = percentage.color === "success";
	const isNegative = percentage.color === "error";

	const iconBg = "rgba(88, 101, 242, 0.12)";
	const iconColor = "#AAB2FF";

	const deltaBg = isPositive ? "rgba(53, 237, 126, 0.10)" : isNegative ? "rgba(237, 66, 69, 0.10)" : "rgba(255, 255, 255, 0.06)";
	const deltaColor = isPositive ? "#76E6A2" : isNegative ? "#FF8587" : "#C2C8C5";

	return (
		<Card
			sx={{
				p: { xs: 2, sm: 2.5 },
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: "#171C1D",
				border: "1px solid #303738",
				borderRadius: "10px",
				boxShadow: "none",
				transition: "border-color 150ms ease",
				"&:hover": { borderColor: "#465151" }
			}}
		>
			<Box mb={2.25}>
				<Box display="flex" alignItems="center" gap={1.25} mb={1.75}>
					<Box
						sx={{
						width: 36,
						height: 36,
						borderRadius: "7px",
						backgroundColor: iconBg,
						color: iconColor,
						display: "grid",
						placeItems: "center",
						flexShrink: 0,
						"& svg": { fontSize: 20 }
						}}
					>
						{icon}
					</Box>
					<Typography variant="body2" fontWeight={500} sx={{ color: "#B5BCB9", fontSize: 13 }}>
						{title}
					</Typography>
				</Box>
				<Typography
					variant="h4"
					fontWeight={700}
					sx={{ color: "#F2F4F3", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.035em", fontSize: 28 }}
				>
					{count}
				</Typography>
			</Box>

			<Box
				display="flex"
				alignItems="center"
				pt={1.25}
				borderTop="1px solid #303738"
				gap={1}
			>
				<Box
					sx={{
						display: "inline-flex",
						alignItems: "center",
						gap: 0.5,
						px: 0.8,
						py: 0.25,
						borderRadius: "4px",
						backgroundColor: deltaBg,
						color: deltaColor,
						border: "1px solid rgba(255, 255, 255, 0.05)",
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
					noWrap
					sx={{ fontSize: 12, color: "#A1A8A5" }}
				>
					{percentage.label}
				</Typography>
			</Box>
		</Card>
	);
});

export default ComplexStatisticsCard;
