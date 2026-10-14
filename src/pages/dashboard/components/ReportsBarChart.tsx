import { Schedule } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { memo, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import colors from "../../../assets/theme/base/colors";
import { ReportChartType } from "./type";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportsBarChart = memo(function ReportsBarChart({
	color = "primary",
	title,
	description,
	date,
	chart
}: ReportChartType) {
	const { labels, datasets } = chart;

	const barColor =
		color === "primary"
			? "#8792FF"
			: color === "success"
			? "#63D995"
			: color === "info"
			? "#8792FF"
			: color === "dark"
			? "#A1A8A5"
			: "#8792FF";

	const chartData = useMemo(
		() => ({
			labels,
			datasets: [
				{
					label: datasets.label,
					borderWidth: 0,
					borderRadius: 6,
					borderSkipped: false,
					backgroundColor: barColor,
					data: datasets.data,
					maxBarThickness: 12
				}
			]
		}),
		[labels, datasets.label, datasets.data, barColor]
	);

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: "#202829",
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
						color: "rgba(255, 255, 255, 0.07)"
					},
					ticks: {
						padding: 8,
						font: { size: 11, family: "Roboto, sans-serif" },
							color: "#A1A8A5"
					}
				},
				x: {
					grid: { display: false },
					ticks: {
						padding: 8,
						font: { size: 11, family: "Roboto, sans-serif" },
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
				"&:hover": { borderColor: "#465151" }
			}}
		>
			<Box mb={2}>
				<Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#F2F4F3" }} textTransform="capitalize">
					{title}
				</Typography>
				<Typography variant="caption" sx={{ color: "#A1A8A5" }}>
					{description}
				</Typography>
			</Box>

			<Box height="12rem" width="100%" mb={2}>
				<Bar data={chartData} options={chartOptions} redraw />
			</Box>

			<Box
				display="flex"
				alignItems="center"
				pt={1.5}
				borderTop="1px solid"
				borderColor="#303738"
				gap={0.75}
			>
				<Schedule sx={{ fontSize: 16, color: colors.text.main }} />
				<Typography variant="caption" sx={{ color: "#A1A8A5" }}>
					{date}
				</Typography>
			</Box>
		</Card>
	);
});

export default ReportsBarChart;
