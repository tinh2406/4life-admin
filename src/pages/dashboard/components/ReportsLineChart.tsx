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
			? "#ff8094"
			: color === "success"
			? "#63D995"
			: color === "info"
			? "#ff8094"
			: color === "dark"
			? "#A1A8A5"
			: colors.primary.main;

	const chartBg =
		color === "primary"
			? "rgba(135, 146, 255, 0.10)"
			: color === "success"
			? "rgba(99, 217, 149, 0.08)"
			: color === "info"
			? "rgba(135, 146, 255, 0.08)"
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
						color: "rgba(255, 255, 255, 0.07)"
					},
					ticks: {
						padding: 8,
						font: { size: 11, family: '"Plus Jakarta Sans", sans-serif' },
						color: "#A1A8A5"
					}
				},
				x: {
					grid: { display: false },
					ticks: {
						padding: 8,
						font: { size: 11, family: '"Plus Jakarta Sans", sans-serif' },
						color: "#A1A8A5"
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
				backgroundColor: "#171C1D",
				border: "1px solid #303738",
				borderRadius: "10px",
				boxShadow: "none",
				transition: "border-color 150ms ease",
				"&:hover": { borderColor: "#465151" },
			}}
		>
			<Box mb={2}>
				<Typography variant="subtitle1" fontWeight={600} sx={{ color: "#F2F4F3" }}>
					{title}
				</Typography>
				{description && (
					<Typography variant="caption" sx={{ color: "#A1A8A5" }}>
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
				borderTop="1px solid #303738"
				gap={0.75}
			>
				<Schedule sx={{ fontSize: 15, color: "#A1A8A5" }} />
				<Typography variant="caption" sx={{ color: "#A1A8A5", fontSize: 11.5 }}>
					{date}
				</Typography>
			</Box>
		</Card>
	);
});

export default ReportsLineChart;
