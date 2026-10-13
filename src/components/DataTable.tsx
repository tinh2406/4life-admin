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
				border: "1px solid",
				borderColor: colors.grey[300],
				borderRadius: 3,
				overflow: "hidden"
			}}
		>
			{isLoading && <LinearProgress sx={{ height: 3 }} />}
			<Table sx={{ minWidth: 650 }} aria-label="data table">
				<TableHead sx={{ backgroundColor: colors.grey[100] }}>
					<TableRow>
						{columns.map(column => (
							<TableCell
								key={String(column.field)}
								align={column.align || "left"}
								sx={{
									width: column.width,
									py: 1.5,
									px: 2,
									borderBottom: `1px solid ${colors.grey[300]}`
								}}
							>
								<Typography
									variant="caption"
									fontWeight="bold"
									color="text.secondary"
									sx={{
										textTransform: "uppercase",
										letterSpacing: "0.05em",
										fontSize: 11
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
									backgroundColor: "rgba(0, 0, 0, 0.02)"
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
										py: 1.5,
										px: 2,
										borderBottom: `1px solid ${colors.grey[200]}`
									}}
								>
									{typeof row[column.field] === "string" || typeof row[column.field] === "number" ? (
										<Typography variant="body2" color="text.primary" fontSize={13}>
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
									<InboxOutlined sx={{ fontSize: 40, color: colors.text.main, mb: 1, opacity: 0.6 }} />
									<Typography variant="body2" color="text.secondary">
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
