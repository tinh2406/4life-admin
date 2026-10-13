import { ArrowBack, Check, Close, ZoomIn } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardMedia,
	CircularProgress,
	Grid,
	Typography
} from "@mui/material";
import { memo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DetailUser } from "./api/User";
import { getUser } from "./api/getDetail";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import { acceptMod } from "./api/acceptRequest";
import { denyMod } from "./api/denyRequest";
import colors from "../../assets/theme/base/colors";
import RejectConfirmModal from "./components/RejectConfirmModal";
import DocumentLightbox from "./components/DocumentLightbox";
import { toast } from "react-toastify";

const RequestDetail = memo(function RequestDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [rejectModalOpen, setRejectModalOpen] = useState(false);
	const [lightboxState, setLightboxState] = useState<{
		open: boolean;
		src?: string;
		title?: string;
	}>({ open: false });

	const { data: user, isLoading } = useQuery<DetailUser, unknown, DetailUser>({
		queryKey: ["user", id],
		queryFn: () => getUser(id as string),
		enabled: Boolean(id)
	});

	const acceptModMutation = useMutation({
		mutationFn: (userId: string) => acceptMod(userId),
		onSuccess: () => {
			toast.success("Host application approved successfully");
			queryClient.invalidateQueries({ queryKey: ["all-request-mod"] });
			navigate("/requests");
		},
		onError: () => {
			toast.error("Failed to approve application. Please try again.");
		}
	});

	const rejectModMutation = useMutation({
		mutationFn: (payload: { userId: string; reason: string }) => denyMod(payload.userId),
		onSuccess: () => {
			toast.info("Host application rejected");
			queryClient.invalidateQueries({ queryKey: ["all-request-mod"] });
			navigate("/requests");
		},
		onError: () => {
			toast.error("Failed to reject application. Please try again.");
		}
	});

	if (isLoading) return <Loading />;
	if (!user || !user.backIdentityCard) return <NotFound />;

	const handleOpenLightbox = (src: string, title: string) => {
		setLightboxState({ open: true, src, title });
	};

	const handleConfirmReject = (reason: string) => {
		rejectModMutation.mutate({ userId: user.id, reason });
		setRejectModalOpen(false);
	};

	return (
		<Box pb={4}>
			{/* Top Action Bar */}
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
				<Button
					component={Link}
					to="/requests"
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
					Back to Queue
				</Button>

				<Box display="flex" gap={1.5}>
					<Button
						variant="outlined"
						color="error"
						disabled={rejectModMutation.isLoading || acceptModMutation.isLoading}
						startIcon={
							rejectModMutation.isLoading ? (
								<CircularProgress size={16} color="inherit" />
							) : (
								<Close fontSize="small" />
							)
						}
						onClick={() => setRejectModalOpen(true)}
						sx={{
							minHeight: 38,
							px: 2.5,
							fontWeight: 600,
							fontSize: 13,
							textTransform: "none",
							borderColor: colors.grey[300],
							color: colors.error.main,
							"&:hover": {
								borderColor: colors.error.main,
								backgroundColor: "rgba(237, 66, 69, 0.15)"
							}
						}}
					>
						Reject Application
					</Button>

					<Button
						variant="contained"
						color="success"
						disabled={acceptModMutation.isLoading || rejectModMutation.isLoading}
						startIcon={
							acceptModMutation.isLoading ? (
								<CircularProgress size={16} color="inherit" />
							) : (
								<Check fontSize="small" />
							)
						}
						onClick={() => acceptModMutation.mutate(user.id)}
						sx={{
							minHeight: 38,
							px: 2.5,
							color: "#ffffff !important",
							backgroundColor: colors.success.main,
							fontWeight: 600,
							fontSize: 13,
							textTransform: "none",
							boxShadow: "none",
							"&:hover": {
								backgroundColor: colors.success.focus,
								boxShadow: "0 2px 4px 0 rgba(5, 150, 105, 0.2)"
							}
						}}
					>
						Accept Application
					</Button>
				</Box>
			</Box>

			<Grid container spacing={3}>
				{/* Applicant Dossier Card */}
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
						<Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center" gap={3}>
							<Avatar
								src={user.avatar}
								alt={user.name || "Applicant avatar"}
								sx={{
									width: 80,
									height: 80,
									boxShadow: 2
								}}
							/>
							<Box flex={1} textAlign={{ xs: "center", sm: "left" }}>
								<Typography variant="h5" fontWeight="bold" textTransform="capitalize" color="text.primary">
									{user.name}
								</Typography>
								<Typography variant="caption" color="text.secondary">
									Applicant ID: {user.id}
								</Typography>
							</Box>
						</Box>

						<Box
							mt={3}
							pt={2}
							borderTop="1px solid"
							borderColor={colors.grey[200]}
							display="grid"
							gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}
							gap={2}
						>
							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Phone Number
								</Typography>
								<Typography variant="body2" fontWeight="medium" color="text.primary">
									{user.phoneNumber || "Not provided"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Email Address
								</Typography>
								<Typography variant="body2" fontWeight="medium" color="text.primary">
									{user.email}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Gender
								</Typography>
								<Typography variant="body2" fontWeight="medium" color="text.primary">
									{user.gender !== null ? (user.gender ? "Male" : "Female") : "Not specified"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" color="text.secondary" display="block">
									Date of Birth
								</Typography>
								<Typography variant="body2" fontWeight="medium" color="text.primary">
									{user.dateOfBirth || "Not provided"}
								</Typography>
							</Box>
						</Box>

						{user.description && (
							<Box mt={2} pt={2} borderTop="1px dashed" borderColor={colors.grey[200]}>
								<Typography variant="caption" color="text.secondary" display="block">
									Self Description / Biography
								</Typography>
								<Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
									{user.description}
								</Typography>
							</Box>
						)}
					</Card>
				</Grid>

				{/* Front Identity Document */}
				<Grid item xs={12} md={6}>
					<Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
						<Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
							<Typography variant="subtitle2" fontWeight="bold" color="text.primary">
								National ID — Front View
							</Typography>
							<Button
								size="small"
								startIcon={<ZoomIn />}
								onClick={() =>
									handleOpenLightbox(user.frontIdentityCard, `${user.name} — Front National ID`)
								}
								sx={{ textTransform: "none", fontSize: 12 }}
							>
								Inspect Fullscreen
							</Button>
						</Box>

						<Box
							position="relative"
							sx={{
								cursor: "pointer",
								borderRadius: 2,
								overflow: "hidden",
								"&:hover .zoom-overlay": { opacity: 1 }
							}}
							onClick={() =>
								handleOpenLightbox(user.frontIdentityCard, `${user.name} — Front National ID`)
							}
						>
							<CardMedia
								component="img"
								image={user.frontIdentityCard}
								alt={`${user.name} Front National ID`}
								sx={{
									aspectRatio: "1.6 / 1",
									width: "100%",
									objectFit: "cover",
									borderRadius: 2
								}}
							/>
							<Box
								className="zoom-overlay"
								position="absolute"
								top={0}
								left={0}
								right={0}
								bottom={0}
								bgcolor="rgba(0,0,0,0.3)"
								display="flex"
								alignItems="center"
								justifyContent="center"
								color="#ffffff"
								sx={{ opacity: 0, transition: "opacity 180ms ease" }}
							>
								<ZoomIn sx={{ fontSize: 36 }} />
							</Box>
						</Box>
					</Card>
				</Grid>

				{/* Back Identity Document */}
				<Grid item xs={12} md={6}>
					<Card sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
						<Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
							<Typography variant="subtitle2" fontWeight="bold" color="text.primary">
								National ID — Back View
							</Typography>
							<Button
								size="small"
								startIcon={<ZoomIn />}
								onClick={() =>
									handleOpenLightbox(user.backIdentityCard, `${user.name} — Back National ID`)
								}
								sx={{ textTransform: "none", fontSize: 12 }}
							>
								Inspect Fullscreen
							</Button>
						</Box>

						<Box
							position="relative"
							sx={{
								cursor: "pointer",
								borderRadius: 2,
								overflow: "hidden",
								"&:hover .zoom-overlay": { opacity: 1 }
							}}
							onClick={() =>
								handleOpenLightbox(user.backIdentityCard, `${user.name} — Back National ID`)
							}
						>
							<CardMedia
								component="img"
								image={user.backIdentityCard}
								alt={`${user.name} Back National ID`}
								sx={{
									aspectRatio: "1.6 / 1",
									width: "100%",
									objectFit: "cover",
									borderRadius: 2
								}}
							/>
							<Box
								className="zoom-overlay"
								position="absolute"
								top={0}
								left={0}
								right={0}
								bottom={0}
								bgcolor="rgba(0,0,0,0.3)"
								display="flex"
								alignItems="center"
								justifyContent="center"
								color="#ffffff"
								sx={{ opacity: 0, transition: "opacity 180ms ease" }}
							>
								<ZoomIn sx={{ fontSize: 36 }} />
							</Box>
						</Box>
					</Card>
				</Grid>
			</Grid>

			<RejectConfirmModal
				open={rejectModalOpen}
				applicantName={user.name}
				isLoading={rejectModMutation.isLoading}
				onClose={() => setRejectModalOpen(false)}
				onConfirm={handleConfirmReject}
			/>

			<DocumentLightbox
				open={lightboxState.open}
				imageSrc={lightboxState.src}
				title={lightboxState.title}
				onClose={() => setLightboxState({ open: false })}
			/>
		</Box>
	);
});

export default RequestDetail;
