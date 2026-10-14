import {
	Add,
	ArrowDownward,
	ArrowUpward,
	ChevronRight,
	ImageOutlined,
	Search,
	SpaOutlined
} from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useFilter } from "../../context/filter";
import { useInfiniteScroll } from "../../shared/hooks/useInfiniteScroll";
import { PagingResponse } from "../../type/Paging";
import { Amenity } from "./api/Amenity";
import { getAmenities } from "./api/getList";
import ManageAmenity from "./components/ManageAmenity";

const surface = "#17181b";
const raisedSurface = "#202125";
const borderColor = "rgba(255,255,255,.09)";

const Amenities = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isCreating, setCreating] = useState(false);
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [icon, setIcon] = useState("");
	const [file, setFile] = useState<File>();
	const { amenityParams, setAmenityParams } = useFilter();
	const listRef = useRef<HTMLDivElement>(null);
	const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	useEffect(() => () => {
		if (searchTimer.current) clearTimeout(searchTimer.current);
	}, []);

	const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery<
		PagingResponse<Amenity>,
		unknown,
		PagingResponse<Amenity>
	>(
		["all-amenities", ...Object.values(amenityParams)],
		async ({ pageParam = 1 }) => getAmenities({ ...amenityParams, PageIndex: pageParam }),
		{
			getNextPageParam: lastPage =>
				lastPage.meta.pageIndex >= lastPage.meta.totalPages ? undefined : lastPage.meta.pageIndex + 1,
			keepPreviousData: true
		}
	);
	const amenities = useMemo(() => data?.pages.flatMap(page => page.data) ?? [], [data]);
	const { handleScroll } = useInfiniteScroll({
		ref: listRef,
		isFetching: isFetching || isLoading,
		onLoadMore: () => {
			if (hasNextPage) void fetchNextPage();
		}
	});

	const handleSelect = (amenity: Amenity) => {
		if (icon.startsWith("blob:")) URL.revokeObjectURL(icon);
		setCreating(false);
		setId(amenity.id);
		setName(amenity.name);
		setIcon(amenity.icon);
		setFile(undefined);
		setModalOpen(true);
	};
	const handleAdd = () => {
		if (icon.startsWith("blob:")) URL.revokeObjectURL(icon);
		setCreating(true);
		setId("");
		setName("");
		setIcon("");
		setFile(undefined);
		setModalOpen(true);
	};
	const handleClose = useCallback(() => {
		if (icon.startsWith("blob:")) URL.revokeObjectURL(icon);
		setModalOpen(false);
		setCreating(false);
		setId("");
		setName("");
		setIcon("");
		setFile(undefined);
	}, [icon]);
	const handleIconFile = (selectedFile: File) => {
		if (icon.startsWith("blob:")) URL.revokeObjectURL(icon);
		setIcon(URL.createObjectURL(selectedFile));
		setFile(selectedFile);
	};
	const handleSearch = (value: string) => {
		if (searchTimer.current) clearTimeout(searchTimer.current);
		searchTimer.current = setTimeout(() => {
			setAmenityParams?.(previous => ({ ...previous, Keyword: value || undefined, PageIndex: 1 }));
		}, 300);
	};
	const handleSort = (sortBy: "Name" | "CreatedDate") => {
		setAmenityParams?.(previous => ({ ...previous, SortBy: sortBy, PageIndex: 1 }));
	};
	const handleSortDirection = () => {
		setAmenityParams?.(previous => ({ ...previous, IsDescending: !previous.IsDescending, PageIndex: 1 }));
	};

	const editor = (compact = false) => (
		<ManageAmenity
			id={id}
			name={name}
			file={file}
			icon={icon}
			setName={setName}
			onFileSelect={handleIconFile}
			handleCloseModal={handleClose}
			compact={compact}
		/>
	);

	return (
		<Box sx={{ color: "#f3f3f4", pb: 4 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2, mb: 3 }}>
				<Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
						<Typography sx={{ color: "#8e9099", fontSize: 12 }}>Danh mục</Typography>
						<ChevronRight sx={{ color: "#5f6169", fontSize: 16 }} />
						<Typography sx={{ color: "#ff667f", fontSize: 12, fontWeight: 600 }}>Tiện ích</Typography>
					</Box>
					<Typography component="h1" sx={{ fontSize: { xs: 23, sm: 27 }, fontWeight: 650, letterSpacing: "-.035em", color: "#f5f5f6" }}>
						Tiện ích nền tảng
					</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
					<Box sx={{ display: "flex", gap: 0.5, p: 0.5, borderRadius: "9px", bgcolor: "#1b1c20", border: `1px solid ${borderColor}` }}>
						<Box component={Link} to="/locations" sx={{ px: 1.25, py: 0.75, borderRadius: "6px", color: "#a3a4ac", fontSize: 12, textDecoration: "none", "&:hover": { color: "#fff", bgcolor: "#25262b" } }}>
							Địa điểm
						</Box>
						<Box component="span" sx={{ px: 1.25, py: 0.75, borderRadius: "6px", bgcolor: "#303137", color: "#f2f2f4", fontSize: 12, fontWeight: 600 }}>
							Tiện ích
						</Box>
					</Box>
					<Button onClick={handleAdd} startIcon={<Add />} sx={{ height: 38, px: 1.75, borderRadius: "7px", bgcolor: "#e84360", color: "#fff", fontSize: 13, fontWeight: 650, textTransform: "none", "&:hover": { bgcolor: "#f0526d" } }}>
						Thêm tiện ích
					</Button>
				</Box>
			</Box>

			<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(330px, .82fr) minmax(0, 1.18fr)" }, gap: 2, alignItems: "start" }}>
				<Box>
					<Box sx={{ p: 1.5, mb: 1.5, bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "10px" }}>
						<Box sx={{ height: 42, display: "flex", alignItems: "center", gap: 1, px: 1.25, bgcolor: raisedSurface, border: `1px solid ${borderColor}`, borderRadius: "7px", "&:focus-within": { borderColor: "rgba(255,102,127,.65)" } }}>
							<Search sx={{ fontSize: 19, color: "#999ba4" }} />
							<Box component="input" aria-label="Tìm tiện ích" defaultValue={amenityParams.Keyword ?? ""} onChange={event => handleSearch(event.target.value)} placeholder="Tìm theo tên tiện ích..." sx={{ minWidth: 0, flex: 1, color: "#f0f0f2", font: "inherit", fontSize: 13, bgcolor: "transparent", border: 0, outline: 0, "&::placeholder": { color: "#8a8c95" } }} />
						</Box>
						<Box sx={{ mt: 1.25, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
							<Typography sx={{ color: "#9698a1", fontSize: 12 }}>Sắp xếp theo</Typography>
							<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
								{(["Name", "CreatedDate"] as const).map(field => (
									<Button key={field} onClick={() => handleSort(field)} sx={{ minWidth: 0, px: 1, py: 0.5, borderRadius: "5px", color: amenityParams.SortBy === field ? "#ff8094" : "#a8a9b0", bgcolor: amenityParams.SortBy === field ? "rgba(232,67,96,.12)" : "transparent", fontSize: 11, textTransform: "none" }}>
										{field === "Name" ? "Tên" : "Ngày tạo"}
									</Button>
								))}
								<IconButton aria-label="Đổi chiều sắp xếp" size="small" onClick={handleSortDirection} sx={{ color: "#a8a9b0", border: `1px solid ${borderColor}`, borderRadius: "6px", width: 28, height: 28 }}>
									{amenityParams.IsDescending ? <ArrowDownward sx={{ fontSize: 15 }} /> : <ArrowUpward sx={{ fontSize: 15 }} />}
								</IconButton>
							</Box>
						</Box>
					</Box>

					<Box ref={listRef} onScroll={handleScroll} sx={{ maxHeight: { xs: 360, lg: "calc(100vh - 260px)" }, overflowY: "auto", display: "flex", flexDirection: "column", gap: 0.75, pr: 0.25 }}>
						{isLoading && amenities.length === 0 && Array.from({ length: 5 }, (_, index) => <Box key={index} sx={{ height: 72, borderRadius: "8px", bgcolor: surface, border: `1px solid ${borderColor}`, animation: "amenity-pulse 1.4s ease-in-out infinite alternate", "@keyframes amenity-pulse": { to: { opacity: 0.55 } } }} />)}
						{amenities.map(item => {
							const selected = item.id === id;
							return (
								<Box component="button" key={item.id} onClick={() => handleSelect(item)} sx={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, px: 1.5, py: 1.25, color: "inherit", bgcolor: selected ? "#292a30" : surface, border: `1px solid ${selected ? "rgba(255,102,127,.48)" : borderColor}`, borderRadius: "8px", transition: "background-color 160ms ease, border-color 160ms ease", "&:hover": { bgcolor: "#24252a", borderColor: "rgba(255,255,255,.16)" }, "&:focus-visible": { outline: "2px solid #ff667f", outlineOffset: 2 } }}>
									<Box sx={{ display: "flex", minWidth: 0, alignItems: "center", gap: 1.25 }}>
										<Box sx={{ width: 36, height: 36, flex: "0 0 auto", display: "grid", placeItems: "center", overflow: "hidden", bgcolor: selected ? "rgba(232,67,96,.16)" : "#292a2f", color: selected ? "#ff8295" : "#adaeb5", borderRadius: "6px" }}>
											{item.icon ? <Box component="img" src={item.icon} alt="" sx={{ width: 23, height: 23, objectFit: "contain" }} /> : <ImageOutlined sx={{ fontSize: 18 }} />}
										</Box>
										<Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: selected ? "#fff" : "#e2e2e5" }}>{item.name}</Typography>
									</Box>
									<ChevronRight sx={{ flex: "0 0 auto", color: selected ? "#ff8295" : "#74767e", fontSize: 18 }} />
								</Box>
							);
						})}
						{!isLoading && amenities.length === 0 && <Box sx={{ py: 6, px: 2, textAlign: "center", bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "8px" }}><SpaOutlined sx={{ color: "#777983", mb: 1 }} /><Typography sx={{ color: "#f0f0f2", fontSize: 14, fontWeight: 600 }}>Chưa có tiện ích phù hợp</Typography><Typography sx={{ color: "#999ba3", fontSize: 12, mt: 0.5 }}>Thử từ khóa khác hoặc thêm tiện ích mới.</Typography></Box>}
						{isFetching && <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}><CircularProgress size={20} sx={{ color: "#ff667f" }} /></Box>}
					</Box>
				</Box>

				<Box sx={{ display: { xs: "none", lg: "block" }, bgcolor: surface, border: `1px solid ${borderColor}`, borderRadius: "10px", minHeight: 340, p: 2.5 }}>
					{(isCreating || id || name) ? editor() : (
						<Box sx={{ minHeight: 290, display: "grid", placeContent: "center", textAlign: "center", px: 2 }}>
							<Box sx={{ mx: "auto", mb: 1.5, width: 44, height: 44, display: "grid", placeItems: "center", color: "#ff8295", bgcolor: "rgba(232,67,96,.13)", borderRadius: "8px" }}><ImageOutlined /></Box>
							<Typography sx={{ color: "#f1f1f3", fontWeight: 600, fontSize: 15 }}>Chọn một tiện ích</Typography>
							<Typography sx={{ color: "#999ba3", fontSize: 12, mt: 0.5 }}>Thông tin và biểu tượng sẽ hiện tại đây để bạn chỉnh sửa.</Typography>
						</Box>
					)}
				</Box>
			</Box>

			<Modal open={isModalOpen} onClose={handleClose} sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center", justifyContent: "center", p: 2 }}>
				<Box sx={{ width: "min(100%, 520px)", maxHeight: "90dvh", overflowY: "auto", p: 2.5, bgcolor: "#1a1b1f", color: "#f5f5f6", border: `1px solid ${borderColor}`, borderRadius: "10px", outline: 0 }}>
					{editor(true)}
				</Box>
			</Modal>
		</Box>
	);
};

export default Amenities;
