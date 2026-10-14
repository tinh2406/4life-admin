import {
	Add,
	ArrowDownward,
	ArrowUpward,
	ChevronRight,
	LocationCity,
	LocationOn,
	Search
} from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useFilter } from "../../context/filter";
import { useInfiniteScroll } from "../../shared/hooks/useInfiniteScroll";
import { PagingResponse } from "../../type/Paging";
import { getLocations } from "./api/getList";
import { Location } from "./api/Location";
import ManageLocation from "./components/ManageLocation";

const surface = "#17181b";
const raisedSurface = "#202125";
const borderColor = "rgba(255,255,255,.09)";

const Locations = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isCreating, setCreating] = useState(false);
	const [id, setId] = useState("");
	const [district, setDistrict] = useState("");
	const [city, setCity] = useState("");
	const { locationParams, setLocationParams } = useFilter();
	const listRef = useRef<HTMLDivElement>(null);
	const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	useEffect(() => () => {
		if (searchTimer.current) clearTimeout(searchTimer.current);
	}, []);

	const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery<
		PagingResponse<Location>,
		unknown,
		PagingResponse<Location>
	>(
		["all-locations", ...Object.values(locationParams)],
		async ({ pageParam = 1 }) => getLocations({ ...locationParams, PageIndex: pageParam }),
		{
			getNextPageParam: lastPage =>
				lastPage.meta.pageIndex >= lastPage.meta.totalPages ? undefined : lastPage.meta.pageIndex + 1,
			keepPreviousData: true
		}
	);
	const locations = useMemo(() => data?.pages.flatMap(page => page.data) ?? [], [data]);
	const { handleScroll } = useInfiniteScroll({
		ref: listRef,
		isFetching: isFetching || isLoading,
		onLoadMore: () => {
			if (hasNextPage) void fetchNextPage();
		}
	});

	const handleSelect = (location: Location) => {
		setCreating(false);
		setId(location.id);
		setCity(location.city);
		setDistrict(location.district);
		setModalOpen(true);
	};
	const handleAdd = () => {
		setCreating(true);
		setId("");
		setCity("");
		setDistrict("");
		setModalOpen(true);
	};
	const handleClose = useCallback(() => {
		setModalOpen(false);
		setCreating(false);
		setId("");
		setCity("");
		setDistrict("");
	}, []);
	const handleSearch = (value: string) => {
		if (searchTimer.current) clearTimeout(searchTimer.current);
		searchTimer.current = setTimeout(() => {
			setLocationParams?.(previous => ({ ...previous, Keyword: value || undefined, PageIndex: 1 }));
		}, 300);
	};
	const handleSort = (sortBy: "City" | "District") => {
		setLocationParams?.(previous => ({ ...previous, SortBy: sortBy, PageIndex: 1 }));
	};
	const handleSortDirection = () => {
		setLocationParams?.(previous => ({ ...previous, IsDescending: !previous.IsDescending, PageIndex: 1 }));
	};

	return (
		<Box sx={{ color: "#f3f3f4", pb: 4 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2, mb: 3 }}>
				<Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
						<Typography sx={{ color: "#8e9099", fontSize: 12 }}>Danh mục</Typography>
						<ChevronRight sx={{ color: "#5f6169", fontSize: 16 }} />
						<Typography sx={{ color: "#ff667f", fontSize: 12, fontWeight: 600 }}>Địa điểm</Typography>
					</Box>
					<Typography component="h1" sx={{ fontSize: { xs: 23, sm: 27 }, fontWeight: 650, letterSpacing: "-.035em", color: "#f5f5f6" }}>
						Quản lý địa điểm
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
					<Box sx={{ display: "flex", gap: 0.5, p: 0.5, borderRadius: "9px", bgcolor: "#1b1c20", border: `1px solid ${borderColor}` }}>
						<Box component="span" sx={{ px: 1.25, py: 0.75, borderRadius: "6px", bgcolor: "#303137", color: "#f2f2f4", fontSize: 12, fontWeight: 600 }}>
							Địa điểm
						</Box>
						<Box component={Link} to="/amenities" sx={{ px: 1.25, py: 0.75, borderRadius: "6px", color: "#a3a4ac", fontSize: 12, textDecoration: "none", "&:hover": { color: "#fff", bgcolor: "#25262b" } }}>
							Tiện ích
						</Box>
					</Box>
					<Button onClick={handleAdd} startIcon={<Add />} sx={{ height: 38, px: 1.75, borderRadius: "7px", bgcolor: "#e84360", color: "#fff", fontSize: 13, fontWeight: 650, textTransform: "none", "&:hover": { bgcolor: "#f0526d" } }}>
						Thêm địa điểm
					</Button>
				</Box>
			</Box>

			<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(330px, .82fr) minmax(0, 1.18fr)" }, gap: 2, alignItems: "start" }}>
				<Box>
					<Box sx={{ p: 1.5, mb: 1.5, bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "10px" }}>
						<Box sx={{ height: 42, display: "flex", alignItems: "center", gap: 1, px: 1.25, bgcolor: raisedSurface, border: `1px solid ${borderColor}`, borderRadius: "7px", "&:focus-within": { borderColor: "rgba(255,102,127,.65)" } }}>
							<Search sx={{ fontSize: 19, color: "#999ba4" }} />
							<Box component="input" aria-label="Tìm địa điểm" defaultValue={locationParams.Keyword ?? ""} onChange={event => handleSearch(event.target.value)} placeholder="Tìm theo thành phố hoặc quận..." sx={{ minWidth: 0, flex: 1, color: "#f0f0f2", font: "inherit", fontSize: 13, bgcolor: "transparent", border: 0, outline: 0, "&::placeholder": { color: "#8a8c95" } }} />
						</Box>
						<Box sx={{ mt: 1.25, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
							<Typography sx={{ color: "#9698a1", fontSize: 12 }}>Sắp xếp theo</Typography>
							<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
								{(["City", "District"] as const).map(field => (
									<Button key={field} onClick={() => handleSort(field)} sx={{ minWidth: 0, px: 1, py: 0.5, borderRadius: "5px", color: locationParams.SortBy === field ? "#ff8094" : "#a8a9b0", bgcolor: locationParams.SortBy === field ? "rgba(232,67,96,.12)" : "transparent", fontSize: 11, textTransform: "none" }}>
										{field === "City" ? "Thành phố" : "Quận / huyện"}
									</Button>
								))}
								<IconButton aria-label="Đổi chiều sắp xếp" size="small" onClick={handleSortDirection} sx={{ color: "#a8a9b0", border: `1px solid ${borderColor}`, borderRadius: "6px", width: 28, height: 28 }}>
									{locationParams.IsDescending ? <ArrowDownward sx={{ fontSize: 15 }} /> : <ArrowUpward sx={{ fontSize: 15 }} />}
								</IconButton>
							</Box>
						</Box>
					</Box>

					<Box ref={listRef} onScroll={handleScroll} sx={{ maxHeight: { xs: 360, lg: "calc(100vh - 260px)" }, overflowY: "auto", display: "flex", flexDirection: "column", gap: 0.75, pr: 0.25 }}>
						{isLoading && locations.length === 0 && Array.from({ length: 5 }, (_, index) => <Box key={index} sx={{ height: 72, borderRadius: "8px", bgcolor: surface, border: `1px solid ${borderColor}`, animation: "location-pulse 1.4s ease-in-out infinite alternate", "@keyframes location-pulse": { to: { opacity: 0.55 } } }} />)}
						{locations.map(item => {
							const selected = item.id === id;
							return (
								<Box component="button" key={item.id} onClick={() => handleSelect(item)} sx={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, px: 1.5, py: 1.25, color: "inherit", bgcolor: selected ? "#292a30" : surface, border: `1px solid ${selected ? "rgba(255,102,127,.48)" : borderColor}`, borderRadius: "8px", transition: "background-color 160ms ease, border-color 160ms ease", "&:hover": { bgcolor: "#24252a", borderColor: "rgba(255,255,255,.16)" }, "&:focus-visible": { outline: "2px solid #ff667f", outlineOffset: 2 } }}>
									<Box sx={{ display: "flex", minWidth: 0, alignItems: "center", gap: 1.25 }}>
										<Box sx={{ width: 36, height: 36, flex: "0 0 auto", display: "grid", placeItems: "center", bgcolor: selected ? "rgba(232,67,96,.16)" : "#292a2f", color: selected ? "#ff8295" : "#adaeb5", borderRadius: "6px" }}><LocationOn sx={{ fontSize: 19 }} /></Box>
										<Box sx={{ minWidth: 0 }}>
											<Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: selected ? "#fff" : "#e2e2e5" }}>{item.city}, {item.district}</Typography>
											<Typography sx={{ mt: 0.25, fontSize: 11, color: "#999ba3" }}>Khu vực quản lý</Typography>
										</Box>
									</Box>
									<ChevronRight sx={{ flex: "0 0 auto", color: selected ? "#ff8295" : "#74767e", fontSize: 18 }} />
								</Box>
							);
						})}
						{!isLoading && locations.length === 0 && <Box sx={{ py: 6, px: 2, textAlign: "center", bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "8px" }}><LocationCity sx={{ color: "#777983", mb: 1 }} /><Typography sx={{ color: "#f0f0f2", fontSize: 14, fontWeight: 600 }}>Chưa có địa điểm phù hợp</Typography><Typography sx={{ color: "#999ba3", fontSize: 12, mt: 0.5 }}>Thử từ khóa khác hoặc thêm địa điểm mới.</Typography></Box>}
						{isFetching && <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}><CircularProgress size={20} sx={{ color: "#ff667f" }} /></Box>}
					</Box>
				</Box>

				<Box sx={{ display: { xs: "none", lg: "block" }, bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "10px", minHeight: 340, p: 2.5 }}>
					{(isCreating || id || city || district) ? <ManageLocation id={id} city={city} district={district} handleCloseModal={handleClose} setCity={setCity} setDistrict={setDistrict} /> : (
						<Box sx={{ minHeight: 290, display: "grid", placeContent: "center", textAlign: "center", px: 2 }}>
							<Box sx={{ mx: "auto", mb: 1.5, width: 44, height: 44, display: "grid", placeItems: "center", color: "#ff8295", bgcolor: "rgba(232,67,96,.13)", borderRadius: "8px" }}><LocationCity /></Box>
							<Typography sx={{ color: "#f1f1f3", fontWeight: 600, fontSize: 15 }}>Chọn một địa điểm</Typography>
							<Typography sx={{ color: "#999ba3", fontSize: 12, mt: 0.5 }}>Thông tin sẽ hiện tại đây để bạn chỉnh sửa.</Typography>
						</Box>
					)}
				</Box>
			</Box>

			<Modal open={isModalOpen} onClose={handleClose} sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center", justifyContent: "center", p: 2 }}>
				<Box sx={{ width: "min(100%, 520px)", maxHeight: "90dvh", overflowY: "auto", p: 2.5, bgcolor: "#1a1b1f", color: "#f5f5f6", border: `1px solid ${borderColor}`, borderRadius: "10px", outline: 0 }}>
					<ManageLocation id={id} city={city} district={district} handleCloseModal={handleClose} setCity={setCity} setDistrict={setDistrict} />
				</Box>
			</Modal>
		</Box>
	);
};

export default Locations;
