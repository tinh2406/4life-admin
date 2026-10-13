import {
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography
} from "@mui/material";
import typography from "../assets/theme/base/typography";
import colors from "../assets/theme/base/colors";

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

const DataTable = <T extends { [key: string]: unknown }>({
	columns,
	rows,
	isLoading
}: {
	columns: GridColDefMe<T>[];
	rows: T[];
	isLoading?: boolean;
}) => {
	return (
		<TableContainer component={Paper} sx={{ boxShadow: "none" }}>
			<Table sx={{ minWidth: 700, minHeight: 400 }} aria-label="customized table">
				<TableBody
					sx={{
						display: "flex",
						flexDirection: "column"
					}}
				>
					<TableRow sx={{ display: "flex" }}>
						{columns.map(column => (
							<TableCell
								align={column.align}
								sx={{ width: column.width }}
								key={String(column.field)}
							>
								<Typography
									fontWeight={typography.fontWeightBold}
									fontSize={typography.size.xs}
									color={colors.text.main}
								>
									{column.headerName || String(column.field)}
								</Typography>
							</TableCell>
						))}
					</TableRow>
					{rows.map(row => (
						<TableRow sx={{ display: "flex" }} key={String(row.id ?? Math.random())}>
							{columns.map(column => (
								<TableCell
									align={column.align}
									sx={{ width: column.width, display: "flex", alignItems: "center" }}
									key={String(column.field)}
								>
									<Typography
										fontWeight={typography.fontWeightBold}
										fontSize={typography.size.xs}
										color={colors.text.main}
										sx={{ width: "100%" }}
									>
										{row[column.field] as React.ReactNode}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			{isLoading && <LinearProgress />}
		</TableContainer>
	);
};

export default DataTable;
