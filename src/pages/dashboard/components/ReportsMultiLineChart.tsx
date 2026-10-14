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
import { ReportMultiChartType } from "./type";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const PALETTE = ["#8792FF", "#63D995", "#F4C96B"];

const ReportsMultiLineChart = memo(function ReportsMultiLineChart({
	title,
	description,
	date,
	chart
}: ReportMultiChartType) {
	const { labels, datasets } = chart;

	const chartData = useMemo(() => {
		return {
			labels,
			datasets: datasets.map((dataset, idx) => ({
				label: dataset.label,
				tension: 0.35,
				pointRadius: 3,
				pointHoverRadius: 6,
				pointBorderColor: "#ffffff",
				pointBackgroundColor: PALETTE[idx % PALETTE.length],
				borderColor: PALETTE[idx % PALETTE.length],
				borderWidth: 2.5,
				backgroundColor: "transparent",
				fill: false,
				data: dataset.data
			}))
		};
	}, [labels, datasets]);

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: "top" as const,
					align: "end" as const,
					labels: {
						boxWidth: 10,
						boxHeight: 10,
						usePointStyle: true,
						font: { size: 11, family: "Roboto, sans-serif" },
						color: "#A1A8A5"
					}
				},
				tooltip: {
					backgroundColor: "#202829",
					titleColor: "#ffffff",
					bodyColor: "#ffffff",
					padding: 10,
					cornerRadius: 8
				}
			},
			interaction: {
				intersect: false,
				mode: "index" as const
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

			<Box height="13rem" width="100%" mb={2}>
				<Line data={chartData} options={chartOptions} redraw />
			</Box>

			<Box
				display="flex"
				alignItems="center"
				pt={1.5}
				borderTop="1px solid"
				borderColor="#303738"
				gap={0.75}
			>
				<Schedule sx={{ fontSize: 16, color: "#A1A8A5" }} />
				<Typography variant="caption" sx={{ color: "#A1A8A5" }}>
					{date}
				</Typography>
			</Box>
		</Card>
	);
});

export default ReportsMultiLineChart;
