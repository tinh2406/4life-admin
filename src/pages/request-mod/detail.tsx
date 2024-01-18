import { Check, Close } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { DetailUser } from "./api/User";
import { getUser } from "./api/getDetail";
import typography from "../../assets/theme/base/typography";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import { acceptMod } from "./api/acceptRequest";
import { denyMod } from "./api/denyRequest";

export default () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: user, isLoading } = useQuery<DetailUser, unknown, DetailUser>({
		queryKey: ["user", id],
		queryFn: () => getUser(id as string)
	});
	const queryClient = useQueryClient();
	const acceptModMutation = useMutation({
		mutationFn: (id: string) => acceptMod(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["all-request-mod"]
			});
			navigate("/requests");
		}
	});
	const rejectModMutation = useMutation({
		mutationFn: (id: string) => denyMod(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["all-request-mod"]
			});
		}
	});
	if (isLoading) return <Loading />;
	if (!user?.backIdentityCard) return <NotFound />;
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Card>
					<Box width="100%" display="flex" flexDirection="column" p={2} mt={2}>
						<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
							<Avatar
								src={user?.avatar}
								sx={{
									width: "6rem",
									height: "6rem"
								}}
							/>
						</Box>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems={{ xs: "flex-start", sm: "center" }}
							flexDirection={{ xs: "column", sm: "row" }}
							mb={2}
						>
							<Typography
								variant="h6"
								fontWeight={typography.fontWeightMedium}
								textTransform="capitalize"
							>
								{user?.name}
							</Typography>

							<Box display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
								<Box mr={1}>
									<Button variant="text" color="error"
										onClick={()=>{
											rejectModMutation.mutate(user.id)
										}}
									>
										<Close />
										&nbsp;Reject
									</Button>
								</Box>
								<Button variant="text"
									onClick={()=>{
										acceptModMutation.mutate(user.id)
									}}
								>
									<Check />
									&nbsp;Accept
								</Button>
							</Box>
						</Box>
						<Typography variant="caption" color="text">
							Phone number:&nbsp;&nbsp;&nbsp;
							<Typography
								variant="caption"
								fontWeight={typography.fontWeightMedium}
								textTransform="capitalize"
							>
								{user?.phoneNumber || "Empty"}
							</Typography>
						</Typography>
						<Typography variant="caption" color="text">
							Email Address:&nbsp;&nbsp;&nbsp;
							<Typography variant="caption" fontWeight={typography.fontWeightMedium}>
								{user?.email}
							</Typography>
						</Typography>
						<Typography variant="caption" color="text">
							Gender:&nbsp;&nbsp;&nbsp;
							<Typography variant="caption" fontWeight={typography.fontWeightMedium}>
								{user?.gender !== null ? (user?.gender ? "Male" : "Female") : "None"}
							</Typography>
						</Typography>
						<Typography variant="caption" color="text">
							Birthday:&nbsp;&nbsp;&nbsp;
							<Typography variant="caption" fontWeight={typography.fontWeightMedium}>
								{user?.dateOfBirth}
							</Typography>
						</Typography>
						<Typography variant="caption" color="text">
							Description:&nbsp;&nbsp;&nbsp;
							<Typography variant="caption" fontWeight={typography.fontWeightMedium}>
								{user?.description || "Empty"}
							</Typography>
						</Typography>
					</Box>
				</Card>
			</Grid>
			<Grid item xs={12} lg={6}>
				<CardMedia
					component="img"
					style={{
						aspectRatio: 1.6,
						width: "96%",
						borderRadius: 20
					}}
					image={user?.frontIdentityCard}
					alt={user?.name}
				/>
			</Grid>
			<Grid item xs={12} lg={6}>
				<CardMedia
					component="img"
					style={{
						aspectRatio: 1.6,
						width: "96%",
						borderRadius: 20
					}}
					image={user?.backIdentityCard}
					alt={user?.name}
				/>
			</Grid>
		</Grid>
	);
};
