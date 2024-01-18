import { Box, Card, CircularProgress, Divider, Grid, ListItemButton, Modal, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PagingResponse } from "../../type/Paging";
import { useInfiniteQuery } from "react-query";
import borders from "../../assets/theme/base/borders";
import typography from "../../assets/theme/base/typography";
import colors from "../../assets/theme/base/colors";
// import { LoadingButton } from "@mui/lab";
import { Add, LocationOnSharp } from "@mui/icons-material";
import boxShadows from "../../assets/theme/base/boxShadows";
import { Location } from "./api/Location";
import ManageLocation from "./components/ManageLocation";
import { getLocations } from "./api/getList";
import { useFilter } from "../../context/filter";

const Locations = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const [id, setId] = useState("");
	const [district, setDistrict] = useState("");
	const [city, setCity] = useState("");

	const { locationParams } = useFilter();

	const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<
		PagingResponse<Location>,
		unknown,
		PagingResponse<Location>
	>(
		["all-locations", ...Object.values(locationParams)],
		async ({ pageParam = 1 }) => {
			return await getLocations({ ...locationParams, PageIndex: pageParam });
		},
		{
			getNextPageParam: lastPage => {
				if (lastPage.meta.pageIndex >= lastPage.meta.totalPages) return;
				return lastPage.meta.pageIndex + 1;
			},
			keepPreviousData: true
		}
	);
	const locations = useMemo(() => {
		if (!data?.pages) return [];
		const newData = data?.pages.flatMap(data => data.data);
		return newData;
	}, [data]);

	// const remain = useMemo(() => {
	// 	return (
	// 		data?.pages &&
	// 		data.pages[data.pages.length - 1].meta.pageIndex < data.pages[data.pages.length - 1].meta.totalPages
	// 	);
	// }, [data]);

	const handleSelect = (i: Location) => {
		setId(i.id);
		setCity(i.city);
		setDistrict(i.district);
		setModalOpen(true);
	};
	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = useCallback(() => {
		setModalOpen(false);
		setId("");
		setCity("");
		setDistrict("");
	}, []);
	const boxRef = useRef();
	const onScroll = () => {
		if (boxRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = boxRef.current;
			const isNearBottom = scrollTop + clientHeight >= scrollHeight;

			if (isNearBottom && !(isFetching || isLoading)) {
				fetchNextPage();
			}
		}
	};
	useEffect(() => {
		onScroll();
	}, [boxRef.current]);

	return (
		<Box pb={3}>
			<Grid container spacing={6}>
				<Grid item xs={12} md={6}>
					<Card>
						<Box
							ref={boxRef}
							onScroll={onScroll}
							minHeight={500}
							p={2}
							sx={{ overflow: "scroll", height: "calc(100vh - 12rem)" }}
						>
							{locations?.map(item => (
								<Fragment key={item.id}>
									<ListItemButton
										style={{
											width: "100%",
											borderRadius: borders.borderRadius.md,
											backgroundColor: item.id === id ? "#e6e6e6" : "transparent"
										}}
										component="button"
										onClick={() => {
											handleSelect(item);
										}}
									>
										<LocationOnSharp
											sx={{ color: colors.dark.main }}
											fontSize="large"
											style={{ padding: 10 }}
										/>
										<Typography
											fontWeight={typography.fontWeightBold}
											fontSize={typography.size.sm}
											color={colors.text.main}
										>
											{locationParams.SortBy === "City"
												? `${item.city}, ${item.district}`
												: `${item.district}, ${item.city}`}
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
							{isFetching&&(
								<ListItemButton
									style={{
										width: "100%",
										borderRadius: borders.borderRadius.md,
										backgroundColor: "transparent",
										display:"flex",
										justifyContent:"center",
									
									}}

								>
									<CircularProgress size={typography.size["2xl"]} color="success"/>
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
							<ManageLocation
								id={id}
								city={city}
								district={district}
								handleCloseModal={handleCloseModal}
								setCity={setCity}
								setDistrict={setDistrict}
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
						<ManageLocation
							id={id}
							city={city}
							district={district}
							handleCloseModal={handleCloseModal}
							setCity={setCity}
							setDistrict={setDistrict}
						/>
					</Box>
				</Modal>
				<Box
					display={{ xs: "flex", md: "none" }}
					justifyContent="center"
					alignItems="center"
					width="2.5rem"
					height="2.5rem"
					bgcolor={colors.primary.main}
					boxShadow={boxShadows.tabsBoxShadow}
					borderRadius="50%"
					position="fixed"
					right="4rem"
					bottom="4rem"
					zIndex={99}
					color="dark"
					sx={{ cursor: "pointer" }}
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

export default Locations;
