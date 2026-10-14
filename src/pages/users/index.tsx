import { ArrowDownward, ArrowUpward, ChevronRight, Search, Visibility } from "@mui/icons-material";
import {
	Avatar,
	Box,
	CircularProgress,
	IconButton,
	MenuItem,
	Pagination,
	Select,
	Typography
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useFilter } from "../../context/filter";
import { CollapseUser } from "./api/User";
import { getUsers } from "./api/getList";
import { PagingResponse } from "../../type/Paging";

const surface = "#17181b";
const raisedSurface = "#202125";
const borderColor = "rgba(255,255,255,.09)";
const roleLabels: Record<"User" | "Mod" | "Admin", string> = {
	User: "Khách hàng",
	Mod: "Điều hành viên",
	Admin: "Quản trị viên"
};

const Users = () => {
	const { userParams, setUserParams } = useFilter();
	const [searchValue, setSearchValue] = useState(userParams.Keyword ?? "");
	const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	useEffect(() => () => {
		if (searchTimer.current) clearTimeout(searchTimer.current);
	}, []);
	useEffect(() => setSearchValue(userParams.Keyword ?? ""), [userParams.Keyword]);

	const { data, isLoading, isFetching } = useQuery<PagingResponse<CollapseUser>, unknown, PagingResponse<CollapseUser>>({
		queryKey: ["users", ...Object.values(userParams)],
		queryFn: () => getUsers(userParams),
		keepPreviousData: true
	});
	const users = useMemo(() => data?.data ?? [], [data]);
	const page = data?.meta.pageIndex ?? userParams.PageIndex ?? 1;
	const totalPages = data?.meta.totalPages ?? 1;
	const totalCount = data?.meta.totalCount ?? 0;
	const pageSize = data?.meta.pageSize ?? userParams.PageSize ?? 10;
	const firstResult = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
	const lastResult = Math.min(page * pageSize, totalCount);

	const handleSearch = (value: string) => {
		setSearchValue(value);
		if (searchTimer.current) clearTimeout(searchTimer.current);
		searchTimer.current = setTimeout(() => {
			setUserParams?.(current => ({ ...current, Keyword: value, PageIndex: 1 }));
		}, 300);
	};
	const handleRole = (role: "User" | "Mod" | "Admin") => {
		setUserParams?.(current => ({ ...current, Role: role, PageIndex: 1 }));
	};
	const handleSort = (event: SelectChangeEvent) => {
		const sortBy = event.target.value;
		if (sortBy === "Name" || sortBy === "Email" || sortBy === "PhoneNumber") {
			setUserParams?.(current => ({ ...current, SortBy: sortBy, PageIndex: 1 }));
		}
	};
	const handlePageSize = (event: SelectChangeEvent<number>) => {
		const nextPageSize = Number(event.target.value);
		if ([10, 25, 50].includes(nextPageSize)) setUserParams?.(current => ({ ...current, PageSize: nextPageSize, PageIndex: 1 }));
	};

	return (
		<Box sx={{ color: "#f3f3f4", pb: 4 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2, mb: 3 }}>
				<Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
						<Typography sx={{ color: "#8e9099", fontSize: 12 }}>Quản trị tài khoản</Typography>
						<ChevronRight sx={{ color: "#5f6169", fontSize: 16 }} />
						<Typography sx={{ color: "#ff667f", fontSize: 12, fontWeight: 600 }}>Người dùng</Typography>
					</Box>
					<Typography component="h1" sx={{ fontSize: { xs: 23, sm: 27 }, fontWeight: 650, letterSpacing: "-.035em", color: "#f5f5f6" }}>
						Users
					</Typography>
					<Typography sx={{ color: "#9b9da5", mt: 0.5, fontSize: 12.5 }}>
						{totalCount.toLocaleString("vi-VN")} tài khoản thuộc nhóm {roleLabels[userParams.Role].toLowerCase()}.
					</Typography>
				</Box>
			</Box>

			<Box sx={{ mb: 1.5, p: 1.5, bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "9px" }}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, minHeight: 42, px: 1.25, bgcolor: raisedSurface, border: `1px solid ${borderColor}`, borderRadius: "6px", "&:focus-within": { borderColor: "rgba(255,102,127,.65)" } }}>
					<Search sx={{ color: "#999ba4", fontSize: 19 }} />
					<Box component="input" aria-label="Tìm kiếm người dùng" value={searchValue} onChange={event => handleSearch(event.target.value)} placeholder="Tìm theo tên, email hoặc số điện thoại..." sx={{ minWidth: 0, flex: 1, color: "#f0f0f2", font: "inherit", fontSize: 13, bgcolor: "transparent", border: 0, outline: 0, "&::placeholder": { color: "#8a8c95" } }} />
				</Box>
				<Box sx={{ mt: 1.25, display: "flex", alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, gap: 1.25 }}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
						<Typography sx={{ color: "#9698a1", fontSize: 12, mr: 0.5 }}>Vai trò</Typography>
						{(["User", "Mod", "Admin"] as const).map(role => {
							const selected = userParams.Role === role;
							return <Box key={role} component="button" onClick={() => handleRole(role)} aria-pressed={selected} sx={{ px: 1.1, py: 0.6, cursor: "pointer", color: selected ? "#ff8094" : "#a8a9b0", bgcolor: selected ? "rgba(232,67,96,.12)" : "transparent", border: `1px solid ${selected ? "rgba(232,67,96,.18)" : "transparent"}`, borderRadius: "5px", font: "inherit", fontSize: 11, "&:hover": { color: "#fff", bgcolor: "#25262b" }, "&:focus-visible": { outline: "2px solid #ff667f", outlineOffset: 1 } }}>{roleLabels[role]}</Box>;
						})}
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<Typography sx={{ color: "#9698a1", fontSize: 12, whiteSpace: "nowrap" }}>Sắp xếp</Typography>
						<Select
							value={userParams.SortBy ?? "Email"}
							onChange={handleSort}
							inputProps={{ "aria-label": "Sort users by" }}
							MenuProps={{ PaperProps: { sx: { bgcolor: "#26272c", color: "#eeeeef", border: `1px solid ${borderColor}`, "& .MuiMenuItem-root.Mui-selected": { bgcolor: "rgba(232,67,96,.16)" } } } }}
							sx={{ minWidth: 135, height: 34, color: "#e4e4e6", bgcolor: raisedSurface, borderRadius: "6px", fontSize: 12, ".MuiOutlinedInput-notchedOutline": { borderColor }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,.22)" }, ".MuiSvgIcon-root": { color: "#a5a6ad" } }}
						>
							<MenuItem value="Name">Tên</MenuItem><MenuItem value="Email">Email</MenuItem><MenuItem value="PhoneNumber">Số điện thoại</MenuItem>
						</Select>
						<IconButton aria-label={userParams.IsDescending ? "Đổi sang tăng dần" : "Đổi sang giảm dần"} onClick={() => setUserParams?.(current => ({ ...current, IsDescending: !current.IsDescending, PageIndex: 1 }))} sx={{ width: 34, height: 34, color: "#a8a9b0", bgcolor: raisedSurface, border: `1px solid ${borderColor}`, borderRadius: "6px", "&:hover": { color: "#fff", bgcolor: "#2a2b30" } }}>
							{userParams.IsDescending ? <ArrowDownward sx={{ fontSize: 16 }} /> : <ArrowUpward sx={{ fontSize: 16 }} />}
						</IconButton>
					</Box>
				</Box>
			</Box>

			<Box sx={{ bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "9px", overflow: "hidden" }}>
				<Box sx={{ overflowX: "auto" }}>
					<Box component="table" sx={{ width: "100%", minWidth: 800, borderCollapse: "collapse", textAlign: "left" }}>
						<Box component="thead" sx={{ bgcolor: "#121316" }}>
							<Box component="tr">
								{["ID", "NGƯỜI DÙNG", "EMAIL", "SỐ ĐIỆN THOẠI", "VAI TRÒ", ""].map((heading, index) => <Box key={`${heading}-${index}`} component="th" sx={{ px: index === 0 ? 2 : 1.5, py: 1.25, borderBottom: `1px solid ${borderColor}`, color: "#989aa3", fontSize: 10, fontWeight: 700, letterSpacing: ".07em", whiteSpace: "nowrap", textAlign: index === 5 ? "right" : "left" }}>{heading}</Box>)}
							</Box>
						</Box>
						<Box component="tbody">
							{isLoading ? <Box component="tr"><Box component="td" colSpan={6} sx={{ py: 9, textAlign: "center", color: "#999ba3" }}><CircularProgress size={22} sx={{ color: "#ff667f" }} /></Box></Box> : users.map(user => (
								<Box component="tr" key={user.id} sx={{ transition: "background-color 140ms ease", "&:hover": { bgcolor: "rgba(255,255,255,.035)" }, "&:last-child td": { borderBottom: 0 } }}>
									<Box component="td" sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${borderColor}`, color: "#a7a8af", fontFamily: "monospace", fontSize: 11, whiteSpace: "nowrap" }}>{user.id}</Box>
									<Box component="td" sx={{ px: 1.5, py: 1.25, borderBottom: `1px solid ${borderColor}` }}>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 190 }}>
											<Avatar src={user.avatar} alt="" sx={{ width: 34, height: 34, bgcolor: "#35363c", color: "#ff9aaa", fontSize: 13, fontWeight: 650 }}>{user.name?.trim().charAt(0).toUpperCase() || "?"}</Avatar>
											<Typography noWrap sx={{ color: "#ededee", fontSize: 12.5, fontWeight: 550 }}>{user.name || "Chưa cập nhật"}</Typography>
										</Box>
									</Box>
									<Box component="td" sx={{ px: 1.5, py: 1.5, borderBottom: `1px solid ${borderColor}`, color: "#c2c3c8", fontSize: 12, whiteSpace: "nowrap" }}>{user.email}</Box>
									<Box component="td" sx={{ px: 1.5, py: 1.5, borderBottom: `1px solid ${borderColor}`, color: user.phoneNumber ? "#c2c3c8" : "#777983", fontSize: 12, whiteSpace: "nowrap" }}>{user.phoneNumber || "Chưa cung cấp"}</Box>
									<Box component="td" sx={{ px: 1.5, py: 1.5, borderBottom: `1px solid ${borderColor}` }}><Box component="span" sx={{ display: "inline-flex", alignItems: "center", px: 0.9, py: 0.4, bgcolor: "rgba(255,255,255,.06)", color: "#c6c7cd", border: "1px solid rgba(255,255,255,.07)", borderRadius: "4px", fontSize: 10.5, whiteSpace: "nowrap" }}>{roleLabels[userParams.Role]}</Box></Box>
									<Box component="td" sx={{ px: 1.5, py: 1.25, borderBottom: `1px solid ${borderColor}`, textAlign: "right" }}><IconButton component={Link} to={user.id} aria-label={`Xem hồ sơ ${user.name}`} sx={{ width: 30, height: 30, color: "#a2a4ad", border: "1px solid transparent", borderRadius: "5px", "&:hover": { color: "#ff8295", bgcolor: "rgba(232,67,96,.12)", borderColor: "rgba(232,67,96,.18)" } }}><Visibility sx={{ fontSize: 16 }} /></IconButton></Box>
								</Box>
							))}
							{!isLoading && users.length === 0 && <Box component="tr"><Box component="td" colSpan={6} sx={{ py: 8, textAlign: "center", borderBottom: 0 }}><Typography sx={{ color: "#eee", fontWeight: 600, fontSize: 14 }}>Không tìm thấy người dùng</Typography><Typography sx={{ color: "#9698a1", fontSize: 12, mt: 0.5 }}>Thử thay đổi từ khóa hoặc vai trò đang lọc.</Typography></Box></Box>}
						</Box>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, gap: 1.5, px: 2, py: 1.5, bgcolor: "#121316", borderTop: `1px solid ${borderColor}` }}>
					<Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, color: "#a3a5ad" }}>
						<Typography sx={{ fontSize: 11.5 }}>Số dòng mỗi trang</Typography>
						<Select value={pageSize} onChange={handlePageSize} inputProps={{ "aria-label": "Số dòng mỗi trang" }} sx={{ minWidth: 64, height: 29, color: "#e4e4e6", bgcolor: raisedSurface, borderRadius: "5px", fontSize: 11, ".MuiOutlinedInput-notchedOutline": { borderColor }, ".MuiSvgIcon-root": { color: "#a5a6ad" } }} MenuProps={{ PaperProps: { sx: { bgcolor: "#26272c", color: "#eeeeef" } } }}>
							<MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem>
						</Select>
						<Typography sx={{ fontSize: 11.5 }}>Hiển thị <Box component="span" sx={{ color: "#ededee", fontWeight: 600 }}>{firstResult}-{lastResult}</Box> trên <Box component="span" sx={{ color: "#ededee", fontWeight: 600 }}>{totalCount.toLocaleString("vi-VN")}</Box></Typography>
						{isFetching && !isLoading && <CircularProgress size={13} sx={{ ml: 0.5, color: "#ff667f" }} />}
					</Box>
					<Pagination count={totalPages} page={page} onChange={(_, nextPage) => setUserParams?.(current => ({ ...current, PageIndex: nextPage }))} size="small" sx={{ "& .MuiPaginationItem-root": { minWidth: 29, height: 29, borderRadius: "5px", color: "#b7b8be", fontSize: 11, "&:hover": { bgcolor: "#292a30" } }, "& .MuiPaginationItem-root.Mui-selected": { bgcolor: "#e84360", color: "#fff", "&:hover": { bgcolor: "#f0526d" } } }} />
				</Box>
			</Box>
		</Box>
	);
};

export default Users;
