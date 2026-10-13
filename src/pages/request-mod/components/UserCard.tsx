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
					transition: "transform 150ms ease, box-shadow 150ms ease",
					"&:hover": {
						transform: "translateY(-2px)"
					}
				}}
			>
				{active && (
					<Box
						sx={{
							position: "absolute",
							top: 12,
							right: 12,
							backgroundColor: colors.primary.main,
							color: "#ffffff",
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
									width: 48,
									height: 48,
									mr: 1.5,
									boxShadow: 1
								}}
							/>
							<Box sx={{ minWidth: 0, flex: 1 }}>
								<Typography
									variant="subtitle2"
									className="applicant-name"
									fontWeight="bold"
									textTransform="capitalize"
									noWrap
									sx={{ transition: "color 150ms ease" }}
								>
									{user.name || "Unnamed Applicant"}
								</Typography>
								<Typography variant="caption" color="text.secondary" display="block" noWrap>
									ID: {user.id.slice(0, 8)}...
								</Typography>
							</Box>
						</Box>

						<Box mb={0.75}>
							<Typography variant="caption" color="text.secondary">
								Phone:&nbsp;
								<Typography component="span" variant="caption" fontWeight="medium" color="text.primary">
									{user.phoneNumber || "Not provided"}
								</Typography>
							</Typography>
						</Box>

						<Box mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
							<Typography variant="caption" color="text.secondary">
								Email:&nbsp;
								<Typography component="span" variant="caption" fontWeight="medium" color="text.primary">
									{user.email}
								</Typography>
							</Typography>
						</Box>
					</Box>

					{/* Action Buttons with clear hit-boxes */}
					<Box
						display="flex"
						gap={1}
						pt={1.5}
						borderTop="1px solid"
						borderColor={colors.grey[200]}
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
								minHeight: 36,
								fontSize: 12,
								fontWeight: 600,
								textTransform: "none"
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
								minHeight: 36,
								fontSize: 12,
								fontWeight: 600,
								color: "#ffffff",
								backgroundColor: colors.success.main,
								"&:hover": {
									backgroundColor: colors.success.focus
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
