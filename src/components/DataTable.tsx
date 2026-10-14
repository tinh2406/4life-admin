import {
	Box,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import { InboxOutlined } from "@mui/icons-material";
import colors from "../assets/theme/base/colors";
import { memo } from "react";

export type GridColDefMe<T> = {
	field: keyof T;
	headerName?: string;
	width?: number | string;
	align?: "left" | "right" | "center" | "inherit" | "justify";
	type?: string;
	sortable?: boolean;
	valueGetter?: (params: unknown) => unknown;
	[key: string]: unknown;
};

type DataTableProps<T> = {
	columns: GridColDefMe<T>[];
	rows: T[];
	isLoading?: boolean;
	emptyMessage?: string;
};

function DataTableInner<T extends { [key: string]: unknown }>({
	columns,
	rows,
	isLoading = false,
	emptyMessage = "No records found"
}: DataTableProps<T>) {
	return (
		<TableContainer
			component={Paper}
			sx={{
				boxShadow: "none",
				border: "1px solid #303738",
				borderRadius: "8px",
				overflow: "hidden",
				backgroundColor: "#171C1D"
			}}
		>
			{isLoading && (
				<LinearProgress
					sx={{
						height: 2.5,
						backgroundColor: "rgba(135, 146, 255, 0.16)",
						"& .MuiLinearProgress-bar": { backgroundColor: "#ff8094" }
					}}
				/>
			)}
			<Table sx={{ minWidth: 650 }} aria-label="data table">
				<TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
					<TableRow>
						{columns.map(column => (
							<TableCell
								key={String(column.field)}
								align={column.align || "left"}
								sx={{
									width: column.width,
									py: 1.25,
									px: 2,
									borderBottom: `1px solid rgba(255, 255, 255, 0.06)`
								}}
							>
								<Typography
									variant="caption"
									sx={{
										textTransform: "uppercase",
										letterSpacing: "0.06em",
										fontSize: 11,
										fontWeight: 700,
										color: "#A1A8A5"
									}}
								>
									{column.headerName || String(column.field)}
								</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{rows.map((row, idx) => (
						<TableRow
							key={String(row.id ?? idx)}
							sx={{
								transition: "background-color 120ms ease",
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.04)"
								},
								"&:last-child td, &:last-child th": {
									border: 0
								}
							}}
						>
							{columns.map(column => (
								<TableCell
									key={String(column.field)}
									align={column.align || "left"}
									sx={{
										width: column.width,
										py: 1.25,
										px: 2,
										borderBottom: `1px solid rgba(255, 255, 255, 0.04)`
									}}
								>
									{typeof row[column.field] === "string" || typeof row[column.field] === "number" ? (
									<Typography variant="body2" sx={{ color: "#F2F4F3" }} fontSize={13}>
											{row[column.field] as React.ReactNode}
										</Typography>
									) : (
										(row[column.field] as React.ReactNode)
									)}
								</TableCell>
							))}
						</TableRow>
					))}

					{!isLoading && rows.length === 0 && (
						<TableRow>
							<TableCell colSpan={columns.length} sx={{ py: 6, textAlign: "center" }}>
								<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
									<InboxOutlined sx={{ fontSize: 36, color: colors.grey[400], mb: 1 }} />
									<Typography variant="body2" color="text.secondary" fontSize={13}>
										{emptyMessage}
									</Typography>
								</Box>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const DataTable = memo(DataTableInner) as typeof DataTableInner;

export default DataTable;
