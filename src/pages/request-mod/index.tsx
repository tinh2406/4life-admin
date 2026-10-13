import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Skeleton, Typography } from "@mui/material";
import { memo, useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { PagingResponse } from "../../type/Paging";
import { CollapseUser } from "./api/User";
import { getRequestMod } from "./api/getList";
import { acceptMod } from "./api/acceptRequest";
import { denyMod } from "./api/denyRequest";
import UserCard from "./components/UserCard";
import { ArrowDropDownCircleOutlined, CheckCircleOutline } from "@mui/icons-material";
import { useFilter } from "../../context/filter";
import { useNotify } from "../../context/notify";
import colors from "../../assets/theme/base/colors";
import { toast } from "react-toastify";

const RequestsMod = memo(function RequestsMod() {
	const SKELETON_COUNT = 8;
	const { requestParams } = useFilter();
	const { newRequest, removeRequest } = useNotify();
	const queryClient = useQueryClient();
	const [actingState, setActingState] = useState<{ id: string; type: "accept" | "reject" } | null>(null);

	const { data, isLoading, isFetching, isError, fetchNextPage } = useInfiniteQuery<
		PagingResponse<CollapseUser>,
		unknown,
		PagingResponse<CollapseUser>
	>(
		["all-request-mod", ...Object.values(requestParams)],
		async ({ pageParam = requestParams.PageIndex }) => {
			return await getRequestMod({ ...requestParams, PageIndex: pageParam });
		},
		{
			getNextPageParam: lastPage => {
				if (lastPage.meta.pageIndex >= lastPage.meta.totalPages) return undefined;
				return lastPage.meta.pageIndex + 1;
			}
		}
	);

	const acceptMutation = useMutation({
		mutationFn: (id: string) => acceptMod(id),
		onMutate: id => setActingState({ id, type: "accept" }),
		onSuccess: (_, id) => {
			toast.success("Host application approved successfully");
			if (removeRequest) removeRequest(id);
			queryClient.invalidateQueries({ queryKey: ["all-request-mod"] });
		},
		onError: () => {
			toast.error("Failed to approve host application. Please try again.");
		},
		onSettled: () => setActingState(null)
	});

	const rejectMutation = useMutation({
		mutationFn: (payload: { id: string; reason: string }) => denyMod(payload.id),
		onMutate: ({ id }) => setActingState({ id, type: "reject" }),
		onSuccess: (_, { id }) => {
			toast.info("Host application rejected");
			if (removeRequest) removeRequest(id);
			queryClient.invalidateQueries({ queryKey: ["all-request-mod"] });
		},
		onError: () => {
			toast.error("Failed to reject host application. Please try again.");
		},
		onSettled: () => setActingState(null)
	});

	const users = useMemo(() => {
		if (!data?.pages) return [];
		return data.pages.flatMap(page => page.data);
	}, [data]);

	const hasMore = useMemo(() => {
		if (!data?.pages || data.pages.length === 0) return false;
		const lastPage = data.pages[data.pages.length - 1];
		return lastPage.meta.pageIndex < lastPage.meta.totalPages;
	}, [data]);

	return (
		<Box pb={4}>
			<Grid container spacing={3}>
				{users.map(user => (
					<Grid key={user.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
						<Box mb={1.5}>
							<UserCard
								user={user}
								active={Boolean(newRequest[user.id])}
								isAccepting={actingState?.id === user.id && actingState.type === "accept"}
								isRejecting={actingState?.id === user.id && actingState.type === "reject"}
								onAccept={id => acceptMutation.mutate(id)}
								onReject={(id, reason) => rejectMutation.mutate({ id, reason })}
								onCardClick={id => removeRequest?.(id)}
							/>
						</Box>
					</Grid>
				))}

				{isLoading &&
					Array.from({ length: SKELETON_COUNT }).map((_, index) => (
						<Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
							<Card sx={{ p: 2, height: 220 }}>
								<Box display="flex" alignItems="center" mb={2}>
									<Skeleton variant="circular" width={48} height={48} sx={{ mr: 1.5 }} />
									<Box flex={1}>
										<Skeleton variant="text" width="70%" height={24} />
										<Skeleton variant="text" width="40%" height={16} />
									</Box>
								</Box>
								<Skeleton variant="text" width="90%" height={20} />
								<Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
								<Box display="flex" gap={1}>
									<Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: 1 }} />
									<Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: 1 }} />
								</Box>
							</Card>
						</Grid>
					))}

				{!isLoading && users.length === 0 && (
					<Grid item xs={12}>
						<Card sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
							<CheckCircleOutline sx={{ fontSize: 56, color: colors.success.main, mb: 1.5 }} />
							<Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
								Verification Queue Cleared
							</Typography>
							<Typography variant="body2" color="text.secondary">
								There are currently no pending host applications requiring moderation.
							</Typography>
						</Card>
					</Grid>
				)}

				{hasMore && (
					<Grid item xs={12} display="flex" justifyContent="center" mt={2}>
						<LoadingButton
							size="medium"
							onClick={() => fetchNextPage()}
							loading={isFetching}
							loadingPosition="start"
							startIcon={<ArrowDropDownCircleOutlined />}
							variant="contained"
							disabled={isLoading || isError}
							sx={{
								backgroundColor: colors.primary.main,
								color: "#ffffff",
								minHeight: 44,
								px: 4,
								borderRadius: 2,
								fontWeight: "bold",
								"&:hover": {
									backgroundColor: colors.gradients.primary.state
								}
							}}
						>
							See more
						</LoadingButton>
					</Grid>
				)}
			</Grid>
		</Box>
	);
});

export default RequestsMod;
