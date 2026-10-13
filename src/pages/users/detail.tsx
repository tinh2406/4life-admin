import { Avatar, Box, Card, CardMedia, Grid, Typography, Button } from "@mui/material";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { DetailUser } from "./api/User";
import { getUser } from "./api/getDetail";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import colors from "../../assets/theme/base/colors";
import { ArrowBack } from "@mui/icons-material";
import { memo } from "react";

const UserDetail = memo(function UserDetail() {
	const { id } = useParams();

	const { data: user, isLoading } = useQuery<DetailUser, unknown, DetailUser>({
		queryKey: ["user", id],
		queryFn: () => getUser(id as string)
	});

	if (isLoading) return <Loading />;
	if (!user) return <NotFound />;

	return (
		<Box pb={4}>
			<Box mb={2.5}>
				<Button
					component={Link}
					to="/users"
					startIcon={<ArrowBack />}
					variant="text"
					sx={{
						color: colors.text.focus,
						fontWeight: 600,
						fontSize: 13,
						textTransform: "none",
						"&:hover": { backgroundColor: colors.grey[200] }
					}}
				>
					Back to Users
				</Button>
			</Box>

			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Card
						sx={{
							p: 3,
							backgroundColor: colors.dark.main,
							border: `1px solid ${colors.grey[300]}`,
							borderRadius: 2.5,
							boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)"
						}}
					>
						<Box display="flex" alignItems="center" gap={2.5} mb={3}>
							<Avatar
								src={user?.avatar}
								sx={{
									width: 64,
									height: 64,
									border: `1px solid ${colors.grey[300]}`,
									bgcolor: colors.grey[200],
									color: colors.text.focus,
									fontSize: 20,
									fontWeight: 700
								}}
							>
								{user?.name ? user.name.charAt(0).toUpperCase() : "U"}
							</Avatar>

							<Box>
								<Typography variant="h5" fontWeight={700} color="text.primary">
									{user?.name}
								</Typography>
								<Typography variant="caption" color="text.secondary">
									User ID: {user?.id}
								</Typography>
							</Box>
						</Box>

						<Box
							display="grid"
							gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}
							gap={2.5}
							pt={2.5}
							borderTop={`1px solid ${colors.grey[200]}`}
						>
							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Phone Number
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.phoneNumber || "Not provided"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Email Address
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.email}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Gender
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.gender !== null ? (user?.gender ? "Male" : "Female") : "Not specified"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Date of Birth
								</Typography>
								<Typography variant="body2" fontWeight={500} color="text.primary">
									{user?.dateOfBirth || "Not provided"}
								</Typography>
							</Box>
						</Box>

						{user?.description && (
							<Box mt={2.5} pt={2} borderTop={`1px dashed ${colors.grey[200]}`}>
								<Typography variant="caption" color="text.secondary" display="block">
									Description
								</Typography>
								<Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
									{user.description}
								</Typography>
							</Box>
						)}
					</Card>
				</Grid>

				{user?.frontIdentityCard && (
					<Grid item xs={12} md={6}>
						<Card
							sx={{
								p: 2,
								backgroundColor: colors.dark.main,
								border: `1px solid ${colors.grey[300]}`,
								borderRadius: 2.5,
								boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)"
							}}
						>
							<Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1.5}>
								National ID — Front View
							</Typography>
							<CardMedia
								component="img"
								sx={{
									aspectRatio: "1.6 / 1",
									width: "100%",
									borderRadius: 2,
									objectFit: "cover"
								}}
								image={user.frontIdentityCard}
								alt={`${user.name} Front ID`}
							/>
						</Card>
					</Grid>
				)}

				{user?.backIdentityCard && (
					<Grid item xs={12} md={6}>
						<Card
							sx={{
								p: 2,
								backgroundColor: colors.dark.main,
								border: `1px solid ${colors.grey[300]}`,
								borderRadius: 2.5,
								boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)"
							}}
						>
							<Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1.5}>
								National ID — Back View
							</Typography>
							<CardMedia
								component="img"
								sx={{
									aspectRatio: "1.6 / 1",
									width: "100%",
									borderRadius: 2,
									objectFit: "cover"
								}}
								image={user.backIdentityCard}
								alt={`${user.name} Back ID`}
							/>
						</Card>
					</Grid>
				)}
			</Grid>
		</Box>
	);
});

export default UserDetail;
