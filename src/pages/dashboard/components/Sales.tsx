import { CalendarMonth, ExpandMore, Search } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Menu, MenuItem, Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import DataTable, { GridColDefMe } from "../../../components/DataTable";
import { useEffect, useMemo, useRef, useState } from "react";
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
	{ field: "id", headerName: "Moderator ID", width: 150, align: "left" },
	{ field: "avatar", headerName: "", width: 64, align: "center" },
	{ field: "name", headerName: "Moderator", width: "30%", align: "left", type: "string" },
	{ field: "phoneNumber", headerName: "Phone number", width: "22%", align: "left", type: "string" },
	{ field: "bookings", headerName: "Bookings", width: "18%", align: "right", type: "number" },
	{ field: "total", headerName: "Revenue", width: "20%", align: "right", type: "number" }
];

function Sales() {
	const [menu, setMenu] = useState<HTMLElement | null>(null);
	const [keyword, setKeyword] = useState("");
	const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const openMenu = (event: React.MouseEvent<HTMLElement>) => setMenu(event.currentTarget);
	const closeMenu = () => setMenu(null);

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
	useEffect(() => {
		if (searchTimer.current) clearTimeout(searchTimer.current);
		searchTimer.current = setTimeout(() => {
			setParams(current => ({ ...current, Keyword: keyword.trim() || undefined, PageIndex: 1 }));
		}, 300);
		return () => {
			if (searchTimer.current) clearTimeout(searchTimer.current);
		};
	}, [keyword]);

	const { data, isLoading, isFetching } = useQuery<PagingResponse<RevenueResponse>, unknown, PagingResponse<RevenueResponse>>({
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
				bookings: <span style={{ color: "#C7C9FF", fontVariantNumeric: "tabular-nums" }}>{item.totalBookings}</span>,
				total: <span style={{ color: "#76E6A2", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>{new Intl.NumberFormat("vi-VN").format(item.totalRevenue)} ₫</span>
			})) || []
		);
	}, [data]);

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number): void => {
		setParams(state => {
			return { ...state, PageIndex: page };
		});
	};

	return (
		<Card sx={{ backgroundColor: "#171C1D", border: "1px solid #303738", borderRadius: "10px", boxShadow: "none", overflow: "hidden" }}>
			<Box display="flex" justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} flexDirection={{ xs: "column", sm: "row" }} gap={2} p={{ xs: 2, sm: 2.5 }}>
				<Box>
					<Typography variant="h6" fontWeight={600} fontSize={typography.size.lg} sx={{ color: "#F2F4F3", mb: 0.5 }}>
						Revenue by moderator
					</Typography>
					<Typography variant="body2" sx={{ color: "#B5BCB9", fontSize: 12.5 }}>Bookings and revenue in the selected period</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
					<Box sx={{ display: "flex", alignItems: "center", gap: 1, height: 38, px: 1.25, minWidth: { xs: "100%", sm: 220 }, bgcolor: "#24292A", borderRadius: "6px", transition: "box-shadow 150ms ease", "&:focus-within": { boxShadow: "0 0 0 2px rgba(135, 146, 255, 0.55)" } }}>
						<Search sx={{ fontSize: 18, color: "#A1A8A5" }} />
						<Box component="input" value={keyword} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value)} placeholder="Search moderators" aria-label="Search moderators" sx={{ width: "100%", border: 0, outline: 0, bgcolor: "transparent", color: "#F2F4F3", font: "inherit", fontSize: 13, "&::placeholder": { color: "#A1A8A5", opacity: 1 } }} />
					</Box>
					<Box sx={{ color: "#A1A8A5", fontSize: 12, whiteSpace: "nowrap" }}>{data?.meta.totalCount ?? 0} records</Box>
					<Button aria-label="Choose reporting period" size="small" onClick={openMenu} startIcon={<CalendarMonth sx={{ fontSize: 17 }} />} endIcon={<ExpandMore sx={{ fontSize: 17 }} />} sx={{ color: "#E5E1E4", bgcolor: "#24292A", borderRadius: "6px", minWidth: 104, height: 38, textTransform: "none", fontSize: 12.5, "&:hover": { bgcolor: "#303738" } }}>
						{params.TypeCycles}
					</Button>
				<Menu
					id="simple-menu"
					anchorEl={menu}
					PaperProps={{ sx: { bgcolor: "#202829", color: "#F2F4F3", border: "1px solid #303738", borderRadius: "8px" } }}
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
			</Box>
			<Box>
				<DataTable rows={list} columns={columns} isLoading={isLoading || isFetching} emptyMessage="No moderators found for this search" />
				<Stack alignItems="center" m={1.5} spacing={2}>
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
