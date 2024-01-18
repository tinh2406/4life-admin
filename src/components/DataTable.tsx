import {
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableCellProps,
	TableContainer,
	// TableHead,
	TableRow,
	Typography
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import typography from "../assets/theme/base/typography";
import colors from "../assets/theme/base/colors";
import { memo } from "react";

export type GridColDefMe<T> = GridColDef & {
	field: keyof T;
	width?: any;
};

const TableHeader = memo(<T extends { [key: string]: any }>({ columns }: { columns: GridColDefMe<T>[] }) => {
	return (
		// <TableHead sx={{ p: 0 }}>
		<TableRow sx={{ display: "flex" }}>
			{columns.map(column => {
				const { field, headerName, sortable, valueGetter, ...others } = column;

				return (
					<TableCell {...(others as TableCellProps)} sx={{ width: column.width }} key={column.field}>
						<Typography
							fontWeight={typography.fontWeightBold}
							fontSize={typography.size.xs}
							color={colors.text.main}
						>
							{headerName || field}
						</Typography>
					</TableCell>
				);
			})}
		</TableRow>
		// </TableHead>
	);
});

const TableRowBody = memo(
	<RowType extends { [key: string]: any }>({ columns, row }: { columns: GridColDefMe<RowType>[]; row: RowType }) => {
		return (
				<TableRow sx={{ display: "flex"}}>
					{columns.map(column => {
						const { width, field, headerName, sortable, valueGetter, ...others } = column;

						return (
							<TableCell {...(others as TableCellProps)} sx={{ width: column.width,display:"flex", alignItems:"center" }} key={column.field}>
								<Typography
									fontWeight={typography.fontWeightBold}
									fontSize={typography.size.xs}
									color={colors.text.main}
									sx={{width:"100%"}}
								>
									{row[field] as string}
								</Typography>
							</TableCell>
						);
					})}
				</TableRow>
		);
	}
);

const DataTable = <T extends { [key: string]: any }>({
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
					<TableHeader columns={columns} />
					{rows.map(row => (
						<TableRowBody key={row.id} row={row} columns={columns} />
					))}
				</TableBody>
			</Table>
			{isLoading && <LinearProgress />}
		</TableContainer>
	);
};

export default DataTable;
