import { Check, Close } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { memo, useState } from "react";
import { CollapseUser } from "../api/User";
import { Link } from "react-router-dom";
import colors from "../../../assets/theme/base/colors";
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

	const handleConfirmReject = (reason: string) => {
		onReject(user.id, reason);
		setRejectModalOpen(false);
	};

	return (
		<>
			<Card
				sx={{
					position: "relative",
					backgroundColor: colors.dark.main,
					border: `1px solid ${colors.grey[300]}`,
					borderRadius: 2.5,
					boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
					transition: "border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease",
					"&:hover": {
						borderColor: colors.grey[400],
						boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
						transform: "translateY(-1px)"
					}
				}}
			>
				{active && (
					<Box
						sx={{
							position: "absolute",
							top: 12,
							right: 12,
							backgroundColor: "rgba(88, 101, 242, 0.12)",
							color: colors.primary.main,
							border: "1px solid rgba(225, 29, 72, 0.2)",
							fontSize: 10,
							fontWeight: 700,
							px: 1,
							py: 0.25,
							borderRadius: 1,
							zIndex: 2,
							letterSpacing: "0.05em",
							textTransform: "uppercase"
						}}
					>
						New
					</Box>
				)}

				<Box p={2.5} display="flex" flexDirection="column">
					{/* Clickable Header & Profile Info */}
					<Box
						component={Link}
						to={user.id}
						onClick={() => onCardClick?.(user.id)}
						sx={{
							textDecoration: "none",
							color: "inherit",
							display: "block",
							cursor: "pointer",
							"&:hover .applicant-name": {
								color: colors.primary.main
							}
						}}
					>
						<Box display="flex" alignItems="center" mb={1.5}>
							<Avatar
								src={user.avatar}
								alt={user.name || "Applicant avatar"}
								sx={{
									width: 44,
									height: 44,
									mr: 1.5,
									border: `1px solid ${colors.grey[300]}`,
									bgcolor: colors.grey[200],
									color: colors.text.focus,
									fontSize: 14,
									fontWeight: 600
								}}
							>
								{user.name ? user.name.charAt(0).toUpperCase() : "U"}
							</Avatar>
							<Box sx={{ minWidth: 0, flex: 1 }}>
								<Typography
									variant="subtitle2"
									className="applicant-name"
									fontWeight={600}
									noWrap
									sx={{ transition: "color 150ms ease", fontSize: 14 }}
								>
									{user.name || "Unnamed Applicant"}
								</Typography>
								<Typography variant="caption" color="text.secondary" display="block" noWrap sx={{ fontSize: 11.5 }}>
									ID: {user.id.slice(0, 8)}...
								</Typography>
							</Box>
						</Box>

						<Box mb={0.5}>
							<Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
								Phone:&nbsp;
								<Typography component="span" variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: 12 }}>
									{user.phoneNumber || "Not provided"}
								</Typography>
							</Typography>
						</Box>

						<Box mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
							<Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
								Email:&nbsp;
								<Typography component="span" variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: 12 }}>
									{user.email}
								</Typography>
							</Typography>
						</Box>
					</Box>

					{/* Action Buttons */}
					<Box
						display="flex"
						gap={1}
						pt={1.5}
						borderTop={`1px solid ${colors.grey[200]}`}
						alignItems="center"
					>
						<Button
							variant="outlined"
							color="error"
							size="small"
							fullWidth
							disabled={isRejecting || isAccepting}
							startIcon={
								isRejecting ? (
									<CircularProgress size={14} color="inherit" />
								) : (
									<Close fontSize="small" />
								)
							}
							onClick={e => {
								e.stopPropagation();
								setRejectModalOpen(true);
							}}
							sx={{
								minHeight: 34,
								fontSize: 12,
								fontWeight: 600,
								textTransform: "none",
								borderColor: colors.grey[300],
								color: colors.error.main,
								"&:hover": {
									borderColor: colors.error.main,
									backgroundColor: "rgba(237, 66, 69, 0.15)"
								}
							}}
						>
							Reject
						</Button>

						<Button
							variant="contained"
							color="success"
							size="small"
							fullWidth
							disabled={isAccepting || isRejecting}
							startIcon={
								isAccepting ? (
									<CircularProgress size={14} color="inherit" />
								) : (
									<Check fontSize="small" />
								)
							}
							onClick={e => {
								e.stopPropagation();
								onAccept(user.id);
							}}
							sx={{
								minHeight: 34,
								fontSize: 12,
								fontWeight: 600,
								color: "#ffffff !important",
								backgroundColor: colors.success.main,
								boxShadow: "none",
								"&:hover": {
									backgroundColor: colors.success.focus,
									boxShadow: "0 2px 4px 0 rgba(5, 150, 105, 0.2)"
								},
								textTransform: "none"
							}}
						>
							Accept
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
