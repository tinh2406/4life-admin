import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Skeleton, Typography } from "@mui/material";
import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import breakpoints from "../../assets/theme/base/breakpoints";
import useWindowSize from "../../hooks/useWindowSize";
import { PagingResponse } from "../../type/Paging";
import { CollapseUser } from "./api/User";
import { getRequestMod } from "./api/getList";
import UserCard from "./components/UserCard";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import { useFilter } from "../../context/filter";
import { useNotify } from "../../context/notify";


const RequestsMod = () => {
	const size = useWindowSize();
	const numCol = useMemo(() => {
		if (size[0] >= breakpoints.values.xl) return 4;
		if (size[0] >= breakpoints.values.md) return 3;
		return 2;
	}, [size]);
	const { requestParams } = useFilter()
	const {newRequest} = useNotify()
	
	const { data, isLoading, isFetching, isError, fetchNextPage } = useInfiniteQuery<
		PagingResponse<CollapseUser>,
		unknown,
		PagingResponse<CollapseUser>
	>(
		["all-request-mod",...Object.values(requestParams)],
		async ({ pageParam = requestParams.PageIndex }) => {
			return await getRequestMod({ ...requestParams, PageIndex: pageParam });
		},
		{
			getNextPageParam: lastPage => lastPage.meta.pageIndex + 1
		}
	);
	const skels = useMemo(() => {
		return [...Array(numCol).keys()];
	}, [numCol]);
	const users = useMemo(() => {
		if (!data?.pages) return [];
		const newData = data?.pages.flatMap(data => data.data);
		return newData;
	}, [data]);
	const remain = useMemo(() => {
		return (
			data?.pages &&
			data.pages[data.pages.length - 1].meta.pageIndex < data.pages[data.pages.length - 1].meta.totalPages
		);
	}, [data]);
	return (
		<>
			<Grid container spacing={3}>
				{users?.map(user => (
					<Grid key={user.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
						<Box mb={1.5}>
							<UserCard user={user} active={newRequest.hasOwnProperty(user.id)} />
						</Box>
					</Grid>
				))}
				{isLoading &&
					!users &&
					skels.map(i => (
						<Grid key={i} item xs={12} sm={6} md={4} lg={4} xl={3}>
							<Card>
								<Skeleton variant="rectangular" height={320} />
							</Card>
						</Grid>
					))}
				{isFetching && isLoading && data && (
					<Typography
						variant="caption"
						style={{
							textAlign: "center",
							marginTop: 20,
							marginLeft: 20
						}}
					>
						No request
					</Typography>
				)}
				{remain && (
					<Grid item xs={12} display={"flex"} alignItems={"center"}>
						<LoadingButton
							size="small"
							onClick={() => fetchNextPage()}
							loading={isFetching}
							loadingPosition="start"
							startIcon={<ArrowDropDownCircleOutlined />}
							variant="contained"
							disabled={isLoading || isError}
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
				)}
			</Grid>
		</>
	);
};

export default RequestsMod;
