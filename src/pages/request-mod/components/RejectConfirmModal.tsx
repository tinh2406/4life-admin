import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from "@mui/material";
import { memo, useState } from "react";
import colors from "../../../assets/theme/base/colors";

const REJECTION_REASONS = [
	"Blurry or unreadable identity document",
	"Name or personal details mismatch with ID card",
	"Expired identification document",
	"Suspicious document or suspected fraud",
	"Other reason"
];

type RejectConfirmModalProps = {
	open: boolean;
	applicantName?: string;
	isLoading?: boolean;
	onClose: () => void;
	onConfirm: (reason: string) => void;
};

const RejectConfirmModal = ({
	open,
	applicantName,
	isLoading,
	onClose,
	onConfirm
}: RejectConfirmModalProps) => {
	const [selectedReason, setSelectedReason] = useState(REJECTION_REASONS[0]);
	const [customNote, setCustomNote] = useState("");

	const handleConfirm = () => {
		const finalReason =
			selectedReason === "Other reason" && customNote.trim()
				? `Other: ${customNote.trim()}`
				: selectedReason;
		onConfirm(finalReason);
	};

	return (
		<Dialog
			open={open}
			onClose={isLoading ? undefined : onClose}
			maxWidth="sm"
			fullWidth
			aria-labelledby="reject-dialog-title"
			aria-describedby="reject-dialog-description"
		>
			<DialogTitle id="reject-dialog-title" sx={{ color: colors.dark.main, fontWeight: "bold" }}>
				Từ chối hồ sơ xác minh
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="reject-dialog-description" sx={{ mb: 2, color: colors.text.main }}>
					Are you sure you want to reject the verification request for{" "}
					<strong>{applicantName || "this applicant"}</strong>? Please select a reason below:
				</DialogContentText>
				<FormControl component="fieldset" fullWidth>
					<RadioGroup
						value={selectedReason}
						onChange={e => setSelectedReason(e.target.value)}
					>
						{REJECTION_REASONS.map(reason => (
							<FormControlLabel
								key={reason}
								value={reason}
								control={<Radio color="error" />}
								label={<Typography variant="body2">{reason}</Typography>}
							/>
						))}
					</RadioGroup>
				</FormControl>
				{selectedReason === "Other reason" && (
					<TextField
						margin="dense"
						label="Additional Details (Optional)"
						fullWidth
						multiline
						rows={2}
						value={customNote}
						onChange={e => setCustomNote(e.target.value)}
						variant="outlined"
						sx={{ mt: 1 }}
					/>
				)}
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={onClose} disabled={isLoading} variant="outlined" color="secondary">
					Cancel
				</Button>
				<Button
					onClick={handleConfirm}
					disabled={isLoading}
					variant="contained"
					color="error"
					sx={{ color: "#ffffff" }}
				>
					{isLoading ? "Đang từ chối..." : "Xác nhận từ chối"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const MemoizedRejectConfirmModal = memo(RejectConfirmModal);
export default MemoizedRejectConfirmModal;
