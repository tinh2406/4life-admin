import { ArrowBack, Check, Close, ZoomIn } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardMedia,
	Checkbox,
	CircularProgress,
	FormControlLabel,
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
import RejectConfirmModal from "./components/RejectConfirmModal";
import DocumentLightbox from "./components/DocumentLightbox";
import { toast } from "react-toastify";

const RequestDetail = memo(function RequestDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [rejectModalOpen, setRejectModalOpen] = useState(false);
	const [documentsReviewed, setDocumentsReviewed] = useState(false);
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
			toast.success("Đã duyệt hồ sơ chủ nhà");
			queryClient.invalidateQueries({ queryKey: ["all-request-mod"] });
			navigate("/requests");
		},
		onError: () => {
			toast.error("Không thể duyệt hồ sơ. Vui lòng thử lại.");
		}
	});

	const rejectModMutation = useMutation({
		mutationFn: (payload: { userId: string; reason: string }) => denyMod(payload.userId),
		onSuccess: () => {
			toast.info("Đã từ chối hồ sơ chủ nhà");
			queryClient.invalidateQueries({ queryKey: ["all-request-mod"] });
			navigate("/requests");
		},
		onError: () => {
			toast.error("Không thể từ chối hồ sơ. Vui lòng thử lại.");
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
			{/* Review actions remain disabled until the moderator confirms both ID sides were inspected. */}
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
				<Button
					component={Link}
					to="/requests"
					startIcon={<ArrowBack />}
					variant="text"
					sx={{
						color: "#D4D7D6",
						fontWeight: 600,
						fontSize: 13,
						textTransform: "none",
						"&:hover": { backgroundColor: "#24292A" }
					}}
				>
					Quay lại danh sách
				</Button>

			</Box>

			<Grid container spacing={3}>
				{/* Thông tin người đăng ký */}
				<Grid item xs={12}>
					<Card
						sx={{
							p: { xs: 2, md: 2.5 },
							backgroundColor: "#171C1D",
							border: "1px solid #303738",
							borderRadius: "8px",
							boxShadow: "none"
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
								<Typography variant="h5" fontWeight="bold" textTransform="capitalize" sx={{ color: "#F2F4F3" }}>
									{user.name}
								</Typography>
								<Typography variant="caption" sx={{ color: "#A1A8A5" }}>
									Mã hồ sơ: {user.id}
								</Typography>
							</Box>
						</Box>

						<Box
							mt={3}
							pt={2}
							borderTop="1px solid"
							borderColor="#303738"
							display="grid"
							gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }}
							gap={2}
						>
							<Box>
								<Typography variant="caption" sx={{ color: "#A1A8A5" }} display="block">
									Số điện thoại
								</Typography>
								<Typography variant="body2" fontWeight="medium" sx={{ color: "#E5E1E4" }}>
									{user.phoneNumber || "Chưa cung cấp"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" sx={{ color: "#A1A8A5" }} display="block">
									Địa chỉ email
								</Typography>
								<Typography variant="body2" fontWeight="medium" sx={{ color: "#E5E1E4" }}>
									{user.email}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" sx={{ color: "#A1A8A5" }} display="block">
									Gender
								</Typography>
								<Typography variant="body2" fontWeight="medium" sx={{ color: "#E5E1E4" }}>
									{user.gender !== null ? (user.gender ? "Nam" : "Nữ") : "Chưa cung cấp"}
								</Typography>
							</Box>

							<Box>
								<Typography variant="caption" sx={{ color: "#A1A8A5" }} display="block">
									Ngày sinh
								</Typography>
								<Typography variant="body2" fontWeight="medium" sx={{ color: "#E5E1E4" }}>
									{user.dateOfBirth || "Chưa cung cấp"}
								</Typography>
							</Box>
						</Box>

						{user.description && (
							<Box mt={2} pt={2} borderTop="1px dashed" borderColor="#303738">
								<Typography variant="caption" sx={{ color: "#A1A8A5" }} display="block">
									Giới thiệu bản thân
								</Typography>
								<Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
									{user.description}
								</Typography>
							</Box>
						)}
					</Card>
				</Grid>

				{/* Mặt trước giấy tờ */}
				<Grid item xs={12} md={6}>
					<Card sx={{ p: { xs: 1.5, sm: 2 }, height: "100%", display: "flex", flexDirection: "column", bgcolor: "#171C1D", border: "1px solid #303738", borderRadius: "10px", boxShadow: "none" }}>
						<Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
							<Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#F2F4F3" }}>
								Mặt trước CCCD
							</Typography>
							<Button
								size="small"
								startIcon={<ZoomIn />}
								onClick={() =>
									handleOpenLightbox(user.frontIdentityCard, `${user.name} — Front CCCD`)
								}
								sx={{ textTransform: "none", fontSize: 12 }}
							>
								Phóng to giấy tờ
							</Button>
						</Box>

						<Box
							position="relative"
							sx={{
								cursor: "pointer",
								borderRadius: "7px",
								overflow: "hidden",
								"&:hover .zoom-overlay": { opacity: 1 }
							}}
							onClick={() =>
								handleOpenLightbox(user.frontIdentityCard, `${user.name} — Front CCCD`)
							}
						>
							<CardMedia
								component="img"
								image={user.frontIdentityCard}
								alt={`${user.name} Front CCCD`}
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

				{/* Mặt sau giấy tờ */}
				<Grid item xs={12} md={6}>
					<Card sx={{ p: { xs: 1.5, sm: 2 }, height: "100%", display: "flex", flexDirection: "column", bgcolor: "#171C1D", border: "1px solid #303738", borderRadius: "10px", boxShadow: "none" }}>
						<Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
							<Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#F2F4F3" }}>
								Mặt sau CCCD
							</Typography>
							<Button
								size="small"
								startIcon={<ZoomIn />}
								onClick={() =>
									handleOpenLightbox(user.backIdentityCard, `${user.name} — Back CCCD`)
								}
								sx={{ textTransform: "none", fontSize: 12 }}
							>
								Phóng to giấy tờ
							</Button>
						</Box>

						<Box
							position="relative"
							sx={{
								cursor: "pointer",
								borderRadius: "7px",
								overflow: "hidden",
								"&:hover .zoom-overlay": { opacity: 1 }
							}}
							onClick={() =>
								handleOpenLightbox(user.backIdentityCard, `${user.name} — Back CCCD`)
							}
						>
							<CardMedia
								component="img"
								image={user.backIdentityCard}
								alt={`${user.name} Back CCCD`}
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

			<Card sx={{ mt: 3, p: { xs: 1.5, sm: 2 }, bgcolor: "#171C1D", border: "1px solid #303738", borderRadius: "8px", boxShadow: "none" }}>
				<Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ sm: "center" }} justifyContent="space-between" gap={2}>
					<FormControlLabel
						control={<Checkbox checked={documentsReviewed} onChange={event => setDocumentsReviewed(event.target.checked)} sx={{ color: "#A1A8A5", "&.Mui-checked": { color: "#ff385c" } }} />}
						label="Tôi đã kiểm tra cả hai mặt giấy tờ tùy thân"
						sx={{ color: "#E5E1E4", mr: 0, "& .MuiFormControlLabel-label": { fontSize: 13 } }}
					/>
					<Box display="flex" gap={1.5} flexWrap="wrap" justifyContent="flex-end">
						<Button variant="outlined" color="error" disabled={!documentsReviewed || rejectModMutation.isLoading || acceptModMutation.isLoading} startIcon={rejectModMutation.isLoading ? <CircularProgress size={16} color="inherit" /> : <Close fontSize="small" />} onClick={() => setRejectModalOpen(true)} sx={{ minHeight: 40, px: 2, fontWeight: 600, textTransform: "none", borderColor: "#45494A", color: "#FFB2B7" }}>Từ chối hồ sơ</Button>
						<Button variant="contained" disabled={!documentsReviewed || acceptModMutation.isLoading || rejectModMutation.isLoading} startIcon={acceptModMutation.isLoading ? <CircularProgress size={16} color="inherit" /> : <Check fontSize="small" />} onClick={() => acceptModMutation.mutate(user.id)} sx={{ minHeight: 40, px: 2, color: "#ffffff", bgcolor: "#ff385c", fontWeight: 600, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: "#e02f50", boxShadow: "none" }, "&.Mui-disabled": { color: "#9B9DA5", bgcolor: "#303238" } }}>Duyệt hồ sơ</Button>
					</Box>
				</Box>
			</Card>

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
