import { Schedule } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip
} from "chart.js";
import { memo, useMemo } from "react";
import { Line } from "react-chartjs-2";
import colors from "../../../assets/theme/base/colors";
import { ReportChartType } from "./type";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ReportsLineChart = memo(function ReportsLineChart({
	color = "primary",
	title,
	description,
	date,
	chart
}: ReportChartType) {
	const { labels, datasets } = chart;

	const lineColor =
		color === "primary"
			? colors.primary.main
			: color === "success"
			? colors.success.main
			: color === "info"
			? colors.info.main
			: color === "dark"
			? colors.dark.main
			: colors.primary.main;

	const chartBg =
		color === "primary"
			? "rgba(225, 29, 72, 0.08)"
			: color === "success"
			? "rgba(5, 150, 105, 0.08)"
			: color === "info"
			? "rgba(37, 99, 235, 0.08)"
			: "rgba(24, 24, 27, 0.06)";

	const chartData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					label: datasets.label,
					tension: 0.35,
					pointRadius: 3,
					pointHoverRadius: 6,
					pointBorderColor: "#ffffff",
					pointBackgroundColor: lineColor,
					borderColor: lineColor,
					borderWidth: 2.5,
					backgroundColor: chartBg,
					fill: true,
					data: datasets.data
				}
			]
		}),
		[labels, datasets.label, datasets.data, lineColor, chartBg]
	);

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: colors.dark.main,
					titleColor: "#ffffff",
					bodyColor: "#ffffff",
					padding: 10,
					cornerRadius: 8,
					titleFont: { family: '"Plus Jakarta Sans", sans-serif', weight: "bold" as const },
					bodyFont: { family: '"Plus Jakarta Sans", sans-serif' }
				}
			},
			scales: {
				y: {
					grid: {
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						color: "rgba(0, 0, 0, 0.04)"
					},
					ticks: {
						padding: 8,
						font: { size: 11, family: '"Plus Jakarta Sans", sans-serif' },
						color: colors.grey[600]
					}
				},
				x: {
					grid: { display: false },
					ticks: {
						padding: 8,
						font: { size: 11, family: '"Plus Jakarta Sans", sans-serif' },
						color: colors.grey[600]
					}
				}
			}
		}),
		[]
	);

	return (
		<Card
			sx={{
				p: 2.5,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: colors.dark.main,
				border: `1px solid ${colors.grey[300]}`,
				borderRadius: 2.5,
				boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
				transition: "border-color 150ms ease, box-shadow 150ms ease",
				"&:hover": { borderColor: colors.grey[400], boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }
			}}
		>
			<Box mb={2}>
				<Typography variant="subtitle1" fontWeight={600} color="text.primary">
					{title}
				</Typography>
				{description && (
					<Typography variant="caption" color="text.secondary">
						{description}
					</Typography>
				)}
			</Box>

			<Box height="12rem" width="100%" mb={2}>
				<Line data={chartData} options={chartOptions} redraw />
			</Box>

			<Box
				display="flex"
				alignItems="center"
				pt={1.5}
				borderTop={`1px solid ${colors.grey[200]}`}
				gap={0.75}
			>
				<Schedule sx={{ fontSize: 15, color: colors.grey[500] }} />
				<Typography variant="caption" color="text.secondary" sx={{ fontSize: 11.5 }}>
					{date}
				</Typography>
			</Box>
		</Card>
	);
});

export default ReportsLineChart;