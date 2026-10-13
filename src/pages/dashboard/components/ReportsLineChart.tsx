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

	const chartData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					label: datasets.label,
					tension: 0.35,
					pointRadius: 4,
					pointHoverRadius: 6,
					pointBorderColor: "#ffffff",
					pointBackgroundColor: lineColor,
					borderColor: lineColor,
					borderWidth: 3,
					backgroundColor: "rgba(255, 56, 92, 0.08)",
					fill: true,
					data: datasets.data
				}
			]
		}),
		[labels, datasets.label, datasets.data, lineColor]
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
					cornerRadius: 8
				}
			},
			scales: {
				y: {
					grid: {
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						color: "rgba(0, 0, 0, 0.05)"
					},
					ticks: {
						padding: 8,
						font: { size: 11, family: "Roboto, sans-serif" },
						color: colors.text.main
					}
				},
				x: {
					grid: { display: false },
					ticks: {
						padding: 8,
						font: { size: 11, family: "Roboto, sans-serif" },
						color: colors.text.main
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
				transition: "transform 150ms ease, box-shadow 150ms ease",
				"&:hover": { transform: "translateY(-2px)", boxShadow: 3 }
			}}
		>
			<Box mb={2}>
				<Typography variant="subtitle1" fontWeight="bold" color="text.primary" textTransform="capitalize">
					{title}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					{description}
				</Typography>
			</Box>

			<Box height="12rem" width="100%" mb={2}>
				<Line data={chartData} options={chartOptions} redraw />
			</Box>

			<Box
				display="flex"
				alignItems="center"
				pt={1.5}
				borderTop="1px solid"
				borderColor={colors.grey[200]}
				gap={0.75}
			>
				<Schedule sx={{ fontSize: 16, color: colors.text.main }} />
				<Typography variant="caption" color="text.secondary">
					{date}
				</Typography>
			</Box>
		</Card>
	);
});

export default ReportsLineChart;