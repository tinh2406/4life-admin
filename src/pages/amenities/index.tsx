import { Box, Card, CircularProgress, Divider, Grid, ListItemButton, Modal, Typography } from "@mui/material";
import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { useInfiniteScroll } from "../../shared/hooks/useInfiniteScroll";
import { Amenity } from "./api/Amenity";
import { PagingResponse } from "../../type/Paging";
import { getAmenities } from "./api/getList";
import { useInfiniteQuery } from "react-query";
import borders from "../../assets/theme/base/borders";
import typography from "../../assets/theme/base/typography";
import colors from "../../assets/theme/base/colors";
// import { LoadingButton } from "@mui/lab";
import { Add } from "@mui/icons-material";
import ManageAmenity from "./components/ManageAmenity";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useFilter } from "../../context/filter";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Amenities = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [icon, setIcon] = useState("");
	const [file, setFile] = useState<File>();

	const { amenityParams } = useFilter();

	const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<
		PagingResponse<Amenity>,
		unknown,
		PagingResponse<Amenity>
	>(
		["all-amenities", ...Object.values(amenityParams)],
		async ({ pageParam = 1 }) => {
			return await getAmenities({ ...amenityParams, PageIndex: pageParam });
		},
		{
			getNextPageParam: lastPage => {
				if (lastPage.meta.pageIndex >= lastPage.meta.totalPages) return;
				return lastPage.meta.pageIndex + 1;
			},
			keepPreviousData: true
		}
	);
	const amenities = useMemo(() => {
		if (!data?.pages) return [];
		const newData = data?.pages.flatMap(data => data.data);
		return newData;
	}, [data]);

	const handleSelect = (i: Amenity) => {
		setId(i.id);
		setName(i.name);
		setIcon(i.icon);
		setFile(undefined);
		setModalOpen(true);
	};
	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = useCallback(() => {
		setModalOpen(false);
		setId("");
		setName("");
		setIcon("");
		setFile(undefined);
	}, []);

	const boxRef = useRef<HTMLDivElement>(null);
	const { handleScroll } = useInfiniteScroll({
		ref: boxRef,
		isFetching: isFetching || isLoading,
		onLoadMore: () => fetchNextPage()
	});
	return (
		<Box pb={3}>
			<Grid container spacing={6}>
				<Grid item xs={12} md={6}>
					<Card>
						<Box
							ref={boxRef}
							onScroll={handleScroll}
							minHeight={500}
							p={2}
							sx={{ overflow: "scroll", height: "calc(100vh - 12rem)" }}
						>
							{amenities?.map(item => (
								<Fragment key={item.id}>
									<ListItemButton
										style={{
											width: "100%",
											borderRadius: borders.borderRadius.md,
											backgroundColor: item.id === id ? "rgba(255, 56, 92, 0.08)" : "transparent",
											padding: "4px 8px",
											transition: "background-color 150ms ease"
										}}
										component="button"
										onClick={() => {
											handleSelect(item);
										}}
									>
										<LazyLoadImage
											src={item.icon}
											alt={item.name}
											width={60}
											height={60}
											style={{ padding: 10, borderRadius: 16, overflow: "hidden" }}
										/>
										<Typography
											ml={1}
											fontWeight={typography.fontWeightBold}
											fontSize={typography.size.sm}
											color={colors.text.main}
										>
											{item.name}
										</Typography>
									</ListItemButton>
									<Divider sx={{ m: 0 }} />
								</Fragment>
							))}
							{/* {remain && (
								<Grid item display={"flex"} mt={1} alignItems={"center"}>
									<LoadingButton
										size="small"
										onClick={() => fetchNextPage()}
										loading={isFetching}
										loadingPosition="start"
										startIcon={<ArrowDropDownCircleOutlined />}
										variant="contained"
										disabled={isLoading}
										sx={{
											backgroundColor: "#ff385c",
											color: "white",
											height: 20,
											margin: "auto",
											":hover": {
												backgroundColor: "#ff4d6d"
											}
										}}
									>
										<span>See more</span>
									</LoadingButton>
								</Grid>
							)} */}
							{isFetching && (
								<ListItemButton
									style={{
										width: "100%",
										borderRadius: borders.borderRadius.md,
										backgroundColor: "transparent",
										display: "flex",
										justifyContent: "center"
									}}
								>
									<CircularProgress size={typography.size["2xl"]} color="success" />
								</ListItemButton>
							)}
						</Box>
					</Card>
				</Grid>
				<Grid
					item
					xs={6}
					sx={({ breakpoints }) => ({
						display: "none",
						[breakpoints.up("md")]: {
							display: "block"
						}
					})}
				>
					<Card>
						<Box p={2} height={300}>
							<ManageAmenity
								id={id}
								name={name}
								file={file}
								icon={icon}
								setFile={setFile}
								setIcon={setIcon}
								setName={setName}
								handleCloseModal={handleCloseModal}
							/>
						</Box>
					</Card>
				</Grid>
				<Modal
					open={isModalOpen}
					onClose={() => {
						setModalOpen(false);
					}}
					sx={{
						display: { sx: "flex", md: "none" },
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Box
						sx={({ breakpoints }) => ({
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							bgcolor: "background.paper",
							boxShadow: 24,
							p: 4,
							width: "90%",
							[breakpoints.up("md")]: {
								width: "60%"
							}
						})}
						borderRadius={2}
					>
						<ManageAmenity
							id={id}
							name={name}
							file={file}
							icon={icon}
							setFile={setFile}
							setIcon={setIcon}
							setName={setName}
							handleCloseModal={handleCloseModal}
						/>
					</Box>
				</Modal>
				<Box
					display={{ xs: "flex", md: "none" }}
					justifyContent="center"
					alignItems="center"
					width="3rem"
					height="3rem"
					bgcolor={colors.primary.main}
					boxShadow={boxShadows.tabsBoxShadow}
					borderRadius="50%"
					position="fixed"
					right="2rem"
					bottom="2rem"
					zIndex={99}
					color="dark"
					aria-label="Add Amenity"
					sx={{ cursor: "pointer", transition: "transform 150ms ease", "&:active": { transform: "scale(0.95)" } }}
					onClick={handleOpenModal}
				>
					<Add
						fontSize="medium"
						sx={{
							color: "white"
						}}
					/>
				</Box>
			</Grid>
		</Box>
	);
};

export default Amenities;
