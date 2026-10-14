import { Check, Close, Fingerprint } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { CollapseUser } from "../api/User";
import RejectConfirmModal from "./RejectConfirmModal";

type UserCardProps = {
	user: CollapseUser;
	active: boolean;
	isAccepting?: boolean;
	isRejecting?: boolean;
	onAccept: (id: string) => void;
	onReject: (id: string, reason: string) => void;
	onCardClick?: (id: string) => void;
};

const UserCard = memo(function UserCard({
	user,
	active,
	isAccepting = false,
	isRejecting = false,
	onAccept,
	onReject,
	onCardClick
}: UserCardProps) {
	const [rejectModalOpen, setRejectModalOpen] = useState(false);
	const isActing = isAccepting || isRejecting;

	const handleConfirmReject = (reason: string) => {
		onReject(user.id, reason);
		setRejectModalOpen(false);
	};

	return (
		<>
			<Card
				sx={{
					position: "relative",
					height: "100%",
					backgroundColor: "#171C1D",
					border: "1px solid #303738",
					borderRadius: "10px",
					boxShadow: "none",
					transition: "border-color 150ms ease, background-color 150ms ease",
					"&:hover": { borderColor: "#465151", backgroundColor: "#1B2021" }
				}}
			>
				{active && (
					<Box
						sx={{
							position: "absolute",
							top: 14,
							right: 14,
							px: 0.9,
							py: 0.35,
							borderRadius: "5px",
							bgcolor: "rgba(255, 178, 183, 0.12)",
							color: "#FFB2B7",
							fontSize: 10,
							fontWeight: 700,
							letterSpacing: "0.04em",
							textTransform: "uppercase"
						}}
					>
						New
					</Box>
				)}

				<Box sx={{ p: 2.25, display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
					<Box
						component={Link}
						to={user.id}
						onClick={() => onCardClick?.(user.id)}
						sx={{ textDecoration: "none", color: "inherit", display: "block", borderRadius: "6px", "&:focus-visible": { outline: "2px solid #8792FF", outlineOffset: 3 } }}
					>
						<Box display="flex" alignItems="center" gap={1.5} mb={2}>
							<Avatar
								src={user.avatar}
								alt={user.name || "Applicant avatar"}
								sx={{ width: 46, height: 46, border: "1px solid #3B4142", bgcolor: "#2A2A2C", color: "#C7C9FF", fontSize: 14, fontWeight: 600 }}
							>
								{user.name ? user.name.charAt(0).toUpperCase() : "U"}
							</Avatar>
							<Box sx={{ minWidth: 0, flex: 1, pr: active ? 5 : 0 }}>
								<Typography variant="subtitle2" noWrap sx={{ color: "#F2F4F3", fontWeight: 650, fontSize: 14, "a:hover &": { color: "#C7C9FF" } }}>
									{user.name || "Unnamed applicant"}
								</Typography>
								<Typography variant="caption" noWrap display="block" sx={{ color: "#A1A8A5", fontSize: 11.5 }}>
									Application · {user.id.slice(0, 8)}
								</Typography>
							</Box>
						</Box>
					</Box>

					<Box sx={{ p: 1.25, mb: 1.5, bgcolor: "#111516", borderRadius: "7px", display: "grid", gap: 1.1 }}>
						<Box sx={{ minWidth: 0 }}>
							<Typography component="span" variant="caption" sx={{ color: "#A1A8A5", fontSize: 11.5, mr: 0.75 }}>Email</Typography>
							<Typography component="span" variant="body2" sx={{ color: "#E5E1E4", fontSize: 12.5, overflowWrap: "anywhere" }}>{user.email || "Not provided"}</Typography>
						</Box>
						<Box sx={{ minWidth: 0 }}>
							<Typography component="span" variant="caption" sx={{ color: "#A1A8A5", fontSize: 11.5, mr: 0.75 }}>Phone</Typography>
							<Typography component="span" variant="body2" sx={{ color: "#E5E1E4", fontSize: 12.5 }}>{user.phoneNumber || "Not provided"}</Typography>
						</Box>
					</Box>

					<Box display="flex" alignItems="center" gap={0.75} sx={{ mt: "auto", mb: 1.75, color: "#C7C9FF" }}>
						<Fingerprint sx={{ fontSize: 16 }} />
						<Typography variant="caption" sx={{ color: "#C7C9FF", fontSize: 11.5 }}>Identity documents submitted</Typography>
					</Box>

					<Box display="flex" gap={1} pt={1.5} sx={{ borderTop: "1px solid #303738" }}>
						<Button
							variant="text"
							size="small"
							fullWidth
							disabled={isActing}
							startIcon={isRejecting ? <CircularProgress size={14} color="inherit" /> : <Close fontSize="small" />}
							onClick={() => setRejectModalOpen(true)}
							sx={{ minHeight: 36, color: "#FFB2B7", bgcolor: "rgba(255,178,183,.08)", borderRadius: "6px", fontSize: 12, fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "rgba(255,178,183,.15)" } }}
						>
							Reject
						</Button>
						<Button
							variant="contained"
							size="small"
							fullWidth
							disabled={isActing}
							startIcon={isAccepting ? <CircularProgress size={14} color="inherit" /> : <Check fontSize="small" />}
							onClick={() => onAccept(user.id)}
							sx={{ minHeight: 36, color: "#071A12", bgcolor: "#4EDEA3", borderRadius: "6px", boxShadow: "none", fontSize: 12, fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#68E9B2", boxShadow: "none" }, "&.Mui-disabled": { bgcolor: "rgba(78,222,163,.3)", color: "rgba(7,26,18,.7)" } }}
						>
							Approve
						</Button>
					</Box>
				</Box>
			</Card>

			<RejectConfirmModal
				open={rejectModalOpen}
				applicantName={user.name}
				isLoading={isRejecting}
				onClose={() => setRejectModalOpen(false)}
				onConfirm={handleConfirmReject}
			/>
		</>
	);
});

export default UserCard;
