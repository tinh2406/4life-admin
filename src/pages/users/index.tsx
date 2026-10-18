import {
	ArrowDownward,
	ArrowUpward,
	BlockOutlined,
	ChevronRight,
	DeleteOutline,
	FilterList,
	LockOpenOutlined,
	ManageAccountsOutlined,
	MoreVert,
	Search,
	VisibilityOutlined
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	CircularProgress,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Pagination,
	Select,
	Typography
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useFilter } from "../../context/filter";
import { CollapseUser, UserRole, UserStatus } from "../../features/users/types";
import { getUsers } from "./api/getList";
import { PagingResponse } from "../../type/Paging";
import UserRoleChip from "../../features/users/components/UserRoleChip";
import UserStatusChip from "../../features/users/components/UserStatusChip";
import ChangeRoleDialog from "../../features/users/components/ChangeRoleDialog";
import BlockUserDialog from "../../features/users/components/BlockUserDialog";
import DeleteUserDialog from "../../features/users/components/DeleteUserDialog";

const surface = "#17181b";
const raisedSurface = "#202125";
const borderColor = "rgba(255,255,255,.09)";

const roleLabels: Record<"All" | UserRole, string> = {
	All: "Tất cả vai trò",
	User: "Khách hàng",
	Staff: "Nhân viên",
	Mod: "Chủ phòng (Host)",
	Admin: "Quản trị viên"
};

const statusLabels: Record<"All" | UserStatus, string> = {
	All: "Tất cả trạng thái",
	Active: "Đang hoạt động",
	Blocked: "Blacklist (Khóa)"
};

const Users = memo(function Users() {
	const { userParams, setUserParams } = useFilter();
	const [searchValue, setSearchValue] = useState(userParams.Keyword ?? "");
	const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Action menu state
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
	const [activeUser, setActiveUser] = useState<CollapseUser | null>(null);

	// Dialog states
	const [roleDialogOpen, setRoleDialogOpen] = useState(false);
	const [blockDialogOpen, setBlockDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

	const handleRoleChange = (role: "All" | UserRole) => {
		setUserParams?.(current => ({ ...current, Role: role, PageIndex: 1 }));
	};

	const handleStatusChange = (status: "All" | UserStatus) => {
		setUserParams?.(current => ({ ...current, Status: status, PageIndex: 1 }));
	};

	const handleSort = (event: SelectChangeEvent) => {
		const sortBy = event.target.value;
		if (sortBy === "Name" || sortBy === "Email" || sortBy === "PhoneNumber") {
			setUserParams?.(current => ({ ...current, SortBy: sortBy, PageIndex: 1 }));
		}
	};

	const handlePageSize = (event: SelectChangeEvent<number>) => {
		const nextPageSize = Number(event.target.value);
		if ([10, 25, 50].includes(nextPageSize)) {
			setUserParams?.(current => ({ ...current, PageSize: nextPageSize, PageIndex: 1 }));
		}
	};

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, user: CollapseUser) => {
		event.stopPropagation();
		setMenuAnchor(event.currentTarget);
		setActiveUser(user);
	};

	const handleCloseMenu = () => {
		setMenuAnchor(null);
	};

	const handleOpenRoleDialog = () => {
		handleCloseMenu();
		setRoleDialogOpen(true);
	};

	const handleOpenBlockDialog = () => {
		handleCloseMenu();
		setBlockDialogOpen(true);
	};

	const handleOpenDeleteDialog = () => {
		handleCloseMenu();
		setDeleteDialogOpen(true);
	};

	const currentRole = userParams.Role ?? "All";
	const currentStatus = userParams.Status ?? "All";

	return (
		<Box sx={{ color: "#f3f3f4", pb: 4 }}>
			{/* Breadcrumb & Title */}
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2, mb: 3 }}>
				<Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
						<Typography sx={{ color: "#8e9099", fontSize: 12 }}>Quản trị tài khoản</Typography>
						<ChevronRight sx={{ color: "#5f6169", fontSize: 16 }} />
						<Typography sx={{ color: "#ff667f", fontSize: 12, fontWeight: 600 }}>Người dùng</Typography>
					</Box>
					<Typography component="h1" sx={{ fontSize: { xs: 23, sm: 27 }, fontWeight: 650, letterSpacing: "-.035em", color: "#f5f5f6" }}>
						Quản lý Người dùng
					</Typography>
					<Typography sx={{ color: "#9b9da5", mt: 0.5, fontSize: 12.5 }}>
						{totalCount.toLocaleString("vi-VN")} tài khoản trong hệ thống • Phân quyền vai trò, quản lý danh sách đen và kiểm duyệt người dùng.
					</Typography>
				</Box>
			</Box>

			{/* Filter Toolbar */}
			<Box sx={{ mb: 1.5, p: 1.5, bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "10px" }}>
				{/* Search Bar */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
						minHeight: 42,
						px: 1.5,
						bgcolor: raisedSurface,
						border: `1px solid ${borderColor}`,
						borderRadius: "8px",
						"&:focus-within": { borderColor: "rgba(255,102,127,.65)" }
					}}
				>
					<Search sx={{ color: "#999ba4", fontSize: 19 }} />
					<Box
						component="input"
						aria-label="Tìm kiếm người dùng"
						value={searchValue}
						onChange={event => handleSearch(event.target.value)}
						placeholder="Tìm theo tên, email hoặc số điện thoại..."
						sx={{
							minWidth: 0,
							flex: 1,
							color: "#f0f0f2",
							font: "inherit",
							fontSize: 13,
							bgcolor: "transparent",
							border: 0,
							outline: 0,
							"&::placeholder": { color: "#8a8c95" }
						}}
					/>
				</Box>

				{/* Filter Options: Role & Status & Sort */}
				<Box
					sx={{
						mt: 1.5,
						display: "flex",
						alignItems: { xs: "flex-start", sm: "center" },
						justifyContent: "space-between",
						flexDirection: { xs: "column", lg: "row" },
						gap: 1.5
					}}
				>
					{/* Role Filter Tabs */}
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mr: 0.5 }}>
							<FilterList sx={{ fontSize: 14, color: "#8a8c95" }} />
							<Typography sx={{ color: "#9698a1", fontSize: 12 }}>Vai trò:</Typography>
						</Box>
						{(["All", "User", "Staff", "Mod", "Admin"] as const).map(role => {
							const selected = currentRole === role;
							return (
								<Box
									key={role}
									component="button"
									onClick={() => handleRoleChange(role)}
									aria-pressed={selected}
									sx={{
										px: 1.1,
										py: 0.5,
										cursor: "pointer",
										color: selected ? "#ff8094" : "#a8a9b0",
										bgcolor: selected ? "rgba(232,67,96,.14)" : "transparent",
										border: `1px solid ${selected ? "rgba(232,67,96,.25)" : "transparent"}`,
										borderRadius: "6px",
										font: "inherit",
										fontSize: 11.5,
										fontWeight: selected ? 600 : 400,
										transition: "all 140ms ease",
										"&:hover": { color: "#fff", bgcolor: "#25262b" },
										"&:focus-visible": { outline: "2px solid #ff667f", outlineOffset: 1 }
									}}
								>
									{roleLabels[role]}
								</Box>
							);
						})}
					</Box>

					{/* Status & Sort Controls */}
					<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
						{/* Status Filter */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
							<Typography sx={{ color: "#9698a1", fontSize: 12, whiteSpace: "nowrap" }}>Trạng thái:</Typography>
							<Select
								value={currentStatus}
								onChange={event => handleStatusChange(event.target.value as "All" | UserStatus)}
								size="small"
								inputProps={{ "aria-label": "Lọc theo trạng thái" }}
								MenuProps={{
									PaperProps: {
										sx: {
											bgcolor: "#26272c",
											color: "#eeeeef",
											border: `1px solid ${borderColor}`,
											"& .MuiMenuItem-root.Mui-selected": { bgcolor: "rgba(232,67,96,.16)" }
										}
									}
								}}
								sx={{
									minWidth: 140,
									height: 33,
									color: "#e4e4e6",
									bgcolor: raisedSurface,
									borderRadius: "6px",
									fontSize: 12,
									".MuiOutlinedInput-notchedOutline": { borderColor },
									"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,.22)" },
									".MuiSvgIcon-root": { color: "#a5a6ad" }
								}}
							>
								{(["All", "Active", "Blocked"] as const).map(status => (
									<MenuItem key={status} value={status}>
										{statusLabels[status]}
									</MenuItem>
								))}
							</Select>
						</Box>

						{/* Sắp xếp */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
							<Typography sx={{ color: "#9698a1", fontSize: 12, whiteSpace: "nowrap" }}>Sắp xếp:</Typography>
							<Select
								value={userParams.SortBy ?? "Email"}
								onChange={handleSort}
								size="small"
								inputProps={{ "aria-label": "Sắp xếp người dùng" }}
								MenuProps={{
									PaperProps: {
										sx: {
											bgcolor: "#26272c",
											color: "#eeeeef",
											border: `1px solid ${borderColor}`,
											"& .MuiMenuItem-root.Mui-selected": { bgcolor: "rgba(232,67,96,.16)" }
										}
									}
								}}
								sx={{
									minWidth: 125,
									height: 33,
									color: "#e4e4e6",
									bgcolor: raisedSurface,
									borderRadius: "6px",
									fontSize: 12,
									".MuiOutlinedInput-notchedOutline": { borderColor },
									"&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,.22)" },
									".MuiSvgIcon-root": { color: "#a5a6ad" }
								}}
							>
								<MenuItem value="Name">Tên</MenuItem>
								<MenuItem value="Email">Email</MenuItem>
								<MenuItem value="PhoneNumber">Số điện thoại</MenuItem>
							</Select>
							<IconButton
								aria-label={userParams.IsDescending ? "Đổi sang tăng dần" : "Đổi sang giảm dần"}
								onClick={() => setUserParams?.(current => ({ ...current, IsDescending: !current.IsDescending, PageIndex: 1 }))}
								sx={{
									width: 33,
									height: 33,
									color: "#a8a9b0",
									bgcolor: raisedSurface,
									border: `1px solid ${borderColor}`,
									borderRadius: "6px",
									"&:hover": { color: "#fff", bgcolor: "#2a2b30" }
								}}
							>
								{userParams.IsDescending ? <ArrowDownward sx={{ fontSize: 16 }} /> : <ArrowUpward sx={{ fontSize: 16 }} />}
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Box>

			{/* User Table */}
			<Box sx={{ bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "10px", overflow: "hidden" }}>
				<Box sx={{ overflowX: "auto" }}>
					<Box component="table" sx={{ width: "100%", minWidth: 880, borderCollapse: "collapse", textAlign: "left" }}>
						<Box component="thead" sx={{ bgcolor: "#121316" }}>
							<Box component="tr">
								{[
									{ label: "ID", align: "left" },
									{ label: "NGƯỜI DÙNG", align: "left" },
									{ label: "EMAIL", align: "left" },
									{ label: "SỐ ĐIỆN THOẠI", align: "left" },
									{ label: "VAI TRÒ", align: "left" },
									{ label: "TRẠNG THÁI", align: "left" },
									{ label: "THAO TÁC", align: "right" }
								].map((heading, index) => (
									<Box
										key={`${heading.label}-${index}`}
										component="th"
										sx={{
											px: index === 0 ? 2.5 : 1.75,
											py: 1.4,
											borderBottom: `1px solid ${borderColor}`,
											color: "#989aa3",
											fontSize: 10.5,
											fontWeight: 700,
											letterSpacing: ".07em",
											whiteSpace: "nowrap",
											textAlign: heading.align
										}}
									>
										{heading.label}
									</Box>
								))}
							</Box>
						</Box>
						<Box component="tbody">
							{isLoading ? (
								<Box component="tr">
									<Box component="td" colSpan={7} sx={{ py: 9, textAlign: "center", color: "#999ba3" }}>
										<CircularProgress size={24} sx={{ color: "#ff667f" }} />
									</Box>
								</Box>
							) : (
								users.map(user => {
									const isBlocked = user.isBlocked || user.status === "Blocked";

									return (
										<Box
											component="tr"
											key={user.id}
											sx={{
												transition: "background-color 140ms ease",
												bgcolor: isBlocked ? "rgba(239, 68, 68, 0.025)" : "transparent",
												"&:hover": { bgcolor: "rgba(255,255,255,.035)" },
												"&:last-child td": { borderBottom: 0 }
											}}
										>
											{/* ID */}
											<Box
												component="td"
												sx={{
													px: 2.5,
													py: 1.5,
													borderBottom: `1px solid ${borderColor}`,
													color: "#8a8c95",
													fontFamily: "monospace",
													fontSize: 11,
													whiteSpace: "nowrap"
												}}
											>
												{user.id}
											</Box>

											{/* User Avatar & Name */}
											<Box component="td" sx={{ px: 1.75, py: 1.35, borderBottom: `1px solid ${borderColor}` }}>
												<Box sx={{ display: "flex", alignItems: "center", gap: 1.35, minWidth: 200 }}>
													<Avatar
														src={user.avatar}
														alt=""
														sx={{
															width: 36,
															height: 36,
															bgcolor: "#35363c",
															color: "#ff9aaa",
															fontSize: 13.5,
															fontWeight: 650,
															border: isBlocked ? "1.5px solid #ef4444" : "1px solid rgba(255,255,255,.1)"
														}}
													>
														{user.name?.trim().charAt(0).toUpperCase() || "?"}
													</Avatar>
													<Box sx={{ minWidth: 0 }}>
														<Typography noWrap sx={{ color: "#ededee", fontSize: 13, fontWeight: 600 }}>
															{user.name || "Chưa cập nhật"}
														</Typography>
														{isBlocked && (
															<Typography noWrap sx={{ color: "#f87171", fontSize: 11, mt: 0.25 }}>
																{user.blockReason || "Đã bị khóa"}
															</Typography>
														)}
													</Box>
												</Box>
											</Box>

											{/* Email */}
											<Box
												component="td"
												sx={{
													px: 1.75,
													py: 1.5,
													borderBottom: `1px solid ${borderColor}`,
													color: "#c2c3c8",
													fontSize: 12.5,
													whiteSpace: "nowrap"
												}}
											>
												{user.email}
											</Box>

											{/* Phone */}
											<Box
												component="td"
												sx={{
													px: 1.75,
													py: 1.5,
													borderBottom: `1px solid ${borderColor}`,
													color: user.phoneNumber ? "#c2c3c8" : "#6f717b",
													fontSize: 12.5,
													whiteSpace: "nowrap"
												}}
											>
												{user.phoneNumber || "Chưa cung cấp"}
											</Box>

											{/* Role */}
											<Box component="td" sx={{ px: 1.75, py: 1.5, borderBottom: `1px solid ${borderColor}` }}>
												<UserRoleChip role={user.role ?? "User"} size="small" />
											</Box>

											{/* Status */}
											<Box component="td" sx={{ px: 1.75, py: 1.5, borderBottom: `1px solid ${borderColor}` }}>
												<UserStatusChip status={user.status} isBlocked={user.isBlocked} size="small" />
											</Box>

											{/* Actions */}
											<Box component="td" sx={{ px: 1.75, py: 1.35, borderBottom: `1px solid ${borderColor}`, textAlign: "right" }}>
												<Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
													<IconButton
														component={Link}
														to={user.id}
														aria-label={`Xem hồ sơ ${user.name}`}
														sx={{
															width: 32,
															height: 32,
															color: "#a2a4ad",
															borderRadius: "6px",
															"&:hover": { color: "#ff8295", bgcolor: "rgba(232,67,96,.12)" }
														}}
													>
														<VisibilityOutlined sx={{ fontSize: 18 }} />
													</IconButton>

													<IconButton
														aria-label={`Thao tác tài khoản ${user.name}`}
														onClick={e => handleOpenMenu(e, user)}
														sx={{
															width: 32,
															height: 32,
															color: "#a2a4ad",
															borderRadius: "6px",
															"&:hover": { color: "#fff", bgcolor: "#2a2b31" }
														}}
													>
														<MoreVert sx={{ fontSize: 18 }} />
													</IconButton>
												</Box>
											</Box>
										</Box>
									);
								})
							)}
							{!isLoading && users.length === 0 && (
								<Box component="tr">
									<Box component="td" colSpan={7} sx={{ py: 8, textAlign: "center", borderBottom: 0 }}>
										<Typography sx={{ color: "#eee", fontWeight: 600, fontSize: 14 }}>
											Không tìm thấy người dùng
										</Typography>
										<Typography sx={{ color: "#9698a1", fontSize: 12, mt: 0.5 }}>
											Thử thay đổi từ khóa, vai trò hoặc trạng thái đang lọc.
										</Typography>
									</Box>
								</Box>
							)}
						</Box>
					</Box>
				</Box>

				{/* Table Footer with Pagination */}
				<Box
					sx={{
						display: "flex",
						alignItems: { xs: "flex-start", sm: "center" },
						justifyContent: "space-between",
						flexDirection: { xs: "column", sm: "row" },
						gap: 1.5,
						px: 2.5,
						py: 1.5,
						bgcolor: "#121316",
						borderTop: `1px solid ${borderColor}`
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, color: "#a3a5ad" }}>
						<Typography sx={{ fontSize: 11.5 }}>Số dòng mỗi trang</Typography>
						<Select
							value={pageSize}
							onChange={handlePageSize}
							inputProps={{ "aria-label": "Số dòng mỗi trang" }}
							sx={{
								minWidth: 64,
								height: 29,
								color: "#e4e4e6",
								bgcolor: raisedSurface,
								borderRadius: "5px",
								fontSize: 11,
								".MuiOutlinedInput-notchedOutline": { borderColor },
								".MuiSvgIcon-root": { color: "#a5a6ad" }
							}}
							MenuProps={{ PaperProps: { sx: { bgcolor: "#26272c", color: "#eeeeef" } } }}
						>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={25}>25</MenuItem>
							<MenuItem value={50}>50</MenuItem>
						</Select>
						<Typography sx={{ fontSize: 11.5 }}>
							Hiển thị{" "}
							<Box component="span" sx={{ color: "#ededee", fontWeight: 600 }}>
								{firstResult}-{lastResult}
							</Box>{" "}
							trên{" "}
							<Box component="span" sx={{ color: "#ededee", fontWeight: 600 }}>
								{totalCount.toLocaleString("vi-VN")}
							</Box>
						</Typography>
						{isFetching && !isLoading && <CircularProgress size={13} sx={{ ml: 0.5, color: "#ff667f" }} />}
					</Box>
					<Pagination
						count={totalPages}
						page={page}
						onChange={(_, nextPage) => setUserParams?.(current => ({ ...current, PageIndex: nextPage }))}
						size="small"
						sx={{
							"& .MuiPaginationItem-root": {
								minWidth: 29,
								height: 29,
								borderRadius: "5px",
								color: "#b7b8be",
								fontSize: 11,
								"&:hover": { bgcolor: "#292a30" }
							},
							"& .MuiPaginationItem-root.Mui-selected": {
								bgcolor: "#e84360",
								color: "#fff",
								"&:hover": { bgcolor: "#f0526d" }
							}
						}}
					/>
				</Box>
			</Box>

			{/* Context Action Menu */}
			<Menu
				anchorEl={menuAnchor}
				open={Boolean(menuAnchor)}
				onClose={handleCloseMenu}
				PaperProps={{
					sx: {
						bgcolor: "#1e1f24",
						color: "#ededef",
						border: `1px solid ${borderColor}`,
						borderRadius: "10px",
						minWidth: 210,
						py: 0.5,
						boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
						"& .MuiMenuItem-root": {
							fontSize: 12.5,
							py: 1,
							px: 1.75,
							gap: 1.25,
							"&:hover": { bgcolor: "rgba(255,255,255,.06)" }
						}
					}
				}}
			>
				{activeUser && (
					<MenuItem component={Link} to={activeUser.id} onClick={handleCloseMenu}>
						<ListItemIcon sx={{ color: "#9da0aa", minWidth: 28 }}>
							<VisibilityOutlined fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Xem chi tiết hồ sơ" />
					</MenuItem>
				)}

				<MenuItem onClick={handleOpenRoleDialog}>
					<ListItemIcon sx={{ color: "#c084fc", minWidth: 28 }}>
						<ManageAccountsOutlined fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Phân quyền vai trò" />
				</MenuItem>

				<MenuItem onClick={handleOpenBlockDialog}>
					<ListItemIcon
						sx={{
							color: activeUser?.isBlocked || activeUser?.status === "Blocked" ? "#34d399" : "#f87171",
							minWidth: 28
						}}
					>
						{activeUser?.isBlocked || activeUser?.status === "Blocked" ? (
							<LockOpenOutlined fontSize="small" />
						) : (
							<BlockOutlined fontSize="small" />
						)}
					</ListItemIcon>
					<ListItemText
						primary={
							activeUser?.isBlocked || activeUser?.status === "Blocked"
								? "Mở khóa tài khoản"
								: "Khóa / Thêm vào Blacklist"
						}
					/>
				</MenuItem>

				<Divider sx={{ my: 0.5, borderColor }} />

				<MenuItem onClick={handleOpenDeleteDialog} sx={{ color: "#f87171 !important", "&:hover": { bgcolor: "rgba(239,68,68,.1) !important" } }}>
					<ListItemIcon sx={{ color: "#ef4444", minWidth: 28 }}>
						<DeleteOutline fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Xóa tài khoản" />
				</MenuItem>
			</Menu>

			{/* Role Dialog */}
			<ChangeRoleDialog
				open={roleDialogOpen}
				onClose={() => setRoleDialogOpen(false)}
				user={activeUser}
			/>

			{/* Block / Blacklist Dialog */}
			<BlockUserDialog
				open={blockDialogOpen}
				onClose={() => setBlockDialogOpen(false)}
				user={activeUser}
			/>

			{/* Delete User Dialog */}
			<DeleteUserDialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				user={activeUser}
			/>
		</Box>
	);
});

export default Users;
