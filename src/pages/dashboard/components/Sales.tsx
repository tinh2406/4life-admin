import { MoreVert } from "@mui/icons-material";
import { Avatar, Box, Card, Menu, MenuItem, Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import colors from "../../../assets/theme/base/colors";
import DataTable, { GridColDefMe } from "../../../components/DataTable";
import { useMemo, useState } from "react";
import typography from "../../../assets/theme/base/typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from "react-query";
import { PagingParams, PagingResponse } from "../../../type/Paging";
import axiosInstance from "../../../constants/AxiosInstance";
import { User } from "../../../type/User";

type RowType = {
	id: string;
	name: string;
	phoneNumber?: string;
	avatar?: string | React.ReactNode;
	// paid: string | React.ReactNode;
	// unpaid: string | React.ReactNode;

	total: number | React.ReactNode;
	bookings: number | React.ReactNode;
};
type RevenueResponse = {
	mod: User;
	totalRevenue: number;
	totalBookings: number;
	unPaid: number;
	paid: number;
};
const columns: GridColDefMe<RowType>[] = [
	{ field: "id", headerName: "Id", width: 80, align: "center" },
	{ field: "avatar", headerName: "Avatar", width: 90, align: "center" },
	{ field: "name", headerName: "Name", width: "25%", align: "left", type: "string" },
	{ field: "phoneNumber", headerName: "Phone number", width: "20%", align: "left", type: "string" },
	{ field: "bookings", headerName: "Total reservations", width: "20%", align: "center", type: "string" },
	// { field: "paid", headerName: "Paid", width: 90, align: "center" },
	// { field: "unpaid", headerName: "Unpay", width: 90, align: "center" },
	{ field: "total", headerName: "Total", width: 90, align: "center" }
];

function Sales() {
	const [menu, setMenu] = useState<EventTarget & SVGSVGElement>();

	const openMenu = ({ currentTarget }: React.MouseEvent<SVGSVGElement, MouseEvent>) => setMenu(currentTarget);
	const closeMenu = () => setMenu(undefined);

	const [params, setParams] = useState<
		PagingParams<""> & {
			TypeCycles: "Day" | "Week" | "Month" | "Year";
			PaidType: "Paid" | "Unpaid" | "All";
		}
	>({
		PageIndex: 1,
		PaidType: "All",
		TypeCycles: "Week"
	});
	const { data } = useQuery<PagingResponse<RevenueResponse>, unknown, PagingResponse<RevenueResponse>>({
		queryKey: ["transactions", ...Object.values(params)],
		queryFn: async () => {
			const res = await axiosInstance.get<PagingResponse<RevenueResponse>>(
				"statistics/admin-revenue-management",
				{
					params
				}
			);
			return res.data;
		},
		keepPreviousData: true
	});
	const list: RowType[] = useMemo(() => {
		return (
			data?.data.map(item => ({
				id: item.mod.id,
				name: item.mod.name,
				phoneNumber: item.mod.phoneNumber,
				avatar: <Avatar src={item.mod.avatar} />,
				// paid:<span style={{ color: "green" }}>{item.paid}</span>,
				// unpaid:<span style={{ color: "red" }}>{item.unPaid}</span>,
				bookings: <span style={{ color: "green" }}>{item.totalBookings}</span>,
				total: <span style={{ color: "green" }}>{item.totalRevenue}</span>
			})) || []
		);
	}, [data]);

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number): void => {
		setParams(state => {
			return { ...state, PageIndex: page };
		});
	};

	return (
		<Card>
			<Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
				<Box>
					<Typography
						variant="h6"
						fontWeight={600}
						fontSize={typography.size.lg}
						color={colors.dark.main}
						gutterBottom
					>
						Transactions
					</Typography>
				</Box>
				<Box color="text" px={2}>
					<MoreVert sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu} />
				</Box>
				<Menu
					id="simple-menu"
					anchorEl={menu}
					anchorOrigin={{
						vertical: "top",
						horizontal: "left"
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right"
					}}
					open={Boolean(menu)}
					onClose={closeMenu}
				>
					<MenuItem
						onClick={() => {
							setParams({ ...params, TypeCycles: "Day" });
							closeMenu();
						}}
					>
						Day
					</MenuItem>
					<MenuItem
						onClick={() => {
							setParams({ ...params, TypeCycles: "Week" });
							closeMenu();
						}}
					>
						Week
					</MenuItem>
					<MenuItem
						onClick={() => {
							setParams({ ...params, TypeCycles: "Month" });
							closeMenu();
						}}
					>
						Month
					</MenuItem>
					<MenuItem
						onClick={() => {
							setParams({ ...params, TypeCycles: "Year" });
							closeMenu();
						}}
					>
						Year
					</MenuItem>
				</Menu>
			</Box>
			<Box>
				<DataTable rows={list} columns={columns} />
				<Stack alignItems="center" m={1} spacing={2}>
					<Pagination
						count={data?.meta.totalPages || 0}
						onChange={handlePageChange}
						renderItem={item => (
							<PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
						)}
					/>
				</Stack>
			</Box>
		</Card>
	);
}

export default Sales;
