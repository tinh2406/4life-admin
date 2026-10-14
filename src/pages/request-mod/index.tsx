import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Grid, Skeleton, Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { PagingResponse } from "../../type/Paging";
import { CollapseUser } from "./api/User";
import { getRequestMod } from "./api/getList";
import UserCard from "./components/UserCard";
import { ArrowDropDownCircleOutlined, CheckCircleOutline } from "@mui/icons-material";
import { useFilter } from "../../context/filter";
import { useNotify } from "../../context/notify";
import colors from "../../assets/theme/base/colors";
import { RequestFilter } from "../../components/Filter";

const RequestsMod = memo(function RequestsMod() {
	const SKELETON_COUNT = 8;
	const { requestParams } = useFilter();
	const { newRequest, removeRequest } = useNotify();

	const { data, isLoading, isFetching, isError, fetchNextPage, refetch } = useInfiniteQuery<
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

	const users = useMemo(() => {
		if (!data?.pages) return [];
		return data.pages.flatMap(page => page.data);
	}, [data]);

	const hasMore = useMemo(() => {
		if (!data?.pages || data.pages.length === 0) return false;
		const lastPage = data.pages[data.pages.length - 1];
		return lastPage.meta.pageIndex < lastPage.meta.totalPages;
	}, [data]);

	const totalApplications = data?.pages[0]?.meta.totalCount ?? 0;

	return (
		<Box pb={4}>
			<Box sx={{ mb: { xs: 2.5, md: 3 } }}>
				<Box sx={{ mb: 2.5 }}>
					<Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mb={0.5}>
						<Typography component="h1" variant="h5" sx={{ color: "#F2F4F3", fontWeight: 700, letterSpacing: "-0.03em" }}>
							Hồ sơ đăng ký chủ nhà và điều hành viên
						</Typography>
						<Box sx={{ px: 1, py: 0.35, bgcolor: "rgba(255, 178, 183, 0.1)", color: "#FFB2B7", borderRadius: "5px", fontSize: 11.5, fontWeight: 600 }}>
							{totalApplications} chờ xét duyệt
						</Box>
					</Box>
					<Typography variant="body2" sx={{ color: "#B5BCB9" }}>
						Kiểm tra giấy tờ tùy thân và xét duyệt hồ sơ tham gia nền tảng.
					</Typography>
				</Box>
				<Box sx={{ width: "100%", minWidth: 0 }}>
					<RequestFilter visible />
				</Box>
			</Box>
				<Box display="flex" alignItems="center" justifyContent="space-between" gap={1} mb={1.5}>
					<Typography variant="subtitle2" sx={{ color: "#E5E1E4", fontWeight: 600 }}>Hồ sơ chờ xét duyệt</Typography>
					<Typography variant="caption" sx={{ color: "#A1A8A5" }}>{users.length} đã tải</Typography>
				</Box>
			<Grid container spacing={{ xs: 1.5, md: 2 }}>
				{users.map(user => (
					<Grid key={user.id} item xs={12} sm={6} md={6} lg={4} xl={3}>
						<Box mb={1.5}>
							<UserCard
								user={user}
								active={Boolean(newRequest[user.id])}
								onCardClick={id => removeRequest?.(id)}
							/>
						</Box>
					</Grid>
				))}

				{isLoading &&
					Array.from({ length: SKELETON_COUNT }).map((_, index) => (
						<Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3}>
							<Card sx={{ p: 2, height: 220, bgcolor: "#171C1D", border: "1px solid #303738", borderRadius: "8px", boxShadow: "none" }}>
								<Box display="flex" alignItems="center" mb={2}>
									<Skeleton variant="circular" width={48} height={48} sx={{ mr: 1.5 }} />
									<Box flex={1}>
										<Skeleton variant="text" width="70%" height={24} />
										<Skeleton variant="text" width="40%" height={16} />
									</Box>
								</Box>
								<Skeleton variant="text" width="90%" height={20} />
								<Skeleton variant="text" width="80%" height={20} sx={{ mb: 2, bgcolor: "#2A2A2C" }} />
								<Box display="flex" gap={1}>
									<Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: 1 }} />
									<Skeleton variant="rectangular" width="50%" height={36} sx={{ borderRadius: 1 }} />
								</Box>
							</Card>
						</Grid>
					))}

				{!isLoading && !isError && users.length === 0 && (
					<Grid item xs={12}>
						<Card sx={{ p: { xs: 3, md: 5 }, textAlign: "center", bgcolor: "#171C1D", border: "1px solid #303738", borderRadius: "10px", boxShadow: "none" }}>
							<CheckCircleOutline sx={{ fontSize: 44, color: colors.success.main, mb: 1.5 }} />
							<Typography variant="h6" fontWeight="bold" sx={{ color: "#F2F4F3" }} gutterBottom>
								Đã xử lý hết hồ sơ
							</Typography>
							<Typography variant="body2" sx={{ color: "#B5BCB9" }}>
								Hiện không có hồ sơ chủ nhà nào cần xét duyệt.
							</Typography>
						</Card>
					</Grid>
				)}

				{isError && (
					<Grid item xs={12}>
						<Card sx={{ p: 3, bgcolor: "#171C1D", border: "1px solid rgba(237,66,69,.35)", borderRadius: "10px", boxShadow: "none" }}>
							<Typography variant="body2" sx={{ color: "#F2F4F3", mb: 1.5 }}>Không thể tải hồ sơ. Kiểm tra kết nối rồi thử lại.</Typography>
						<Button onClick={() => refetch()} size="small" sx={{ color: "#ff8094", textTransform: "none" }}>Thử lại</Button>
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
							Tải thêm hồ sơ
						</LoadingButton>
					</Grid>
				)}
			</Grid>
		</Box>
	);
});

export default RequestsMod;
