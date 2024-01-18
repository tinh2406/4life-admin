import { Avatar, Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { DetailUser } from "./api/User";
import { getUser } from "./api/getDetail";
import typography from "../../assets/theme/base/typography";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

export default () => {
	const { id } = useParams();

	const { data: user, isLoading } = useQuery<DetailUser, unknown, DetailUser>({
		queryKey: ["user", id],
		queryFn: () => getUser(id as string)
	});
	if (isLoading) return <Loading />;
	if (!user) return <NotFound />;
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
			{user?.frontIdentityCard && (
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
			)}
			{user?.backIdentityCard && (
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
			)}
		</Grid>
	);
};
