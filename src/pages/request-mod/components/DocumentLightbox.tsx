import { Close, RotateRight, ZoomIn, ZoomOut, RestartAlt } from "@mui/icons-material";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import { memo, useState } from "react";

type DocumentLightboxProps = {
	open: boolean;
	imageSrc?: string;
	title?: string;
	onClose: () => void;
};

const DocumentLightbox = memo(function DocumentLightbox({ open, imageSrc, title, onClose }: DocumentLightboxProps) {
	const [rotation, setRotation] = useState(0);
	const [scale, setScale] = useState(1);

	const handleRotate = () => {
		setRotation(prev => (prev + 90) % 360);
	};

	const handleZoomIn = () => {
		setScale(prev => Math.min(prev + 0.25, 3));
	};

	const handleZoomOut = () => {
		setScale(prev => Math.max(prev - 0.25, 0.5));
	};

	const handleReset = () => {
		setRotation(0);
		setScale(1);
	};

	const handleDialogClose = () => {
		handleReset();
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleDialogClose}
			maxWidth="lg"
			fullWidth
			PaperProps={{
				sx: {
					backgroundColor: "rgba(18, 18, 18, 0.95)",
					color: "#ffffff",
					boxShadow: "none",
					borderRadius: 3,
					overflow: "hidden"
				}
			}}
		>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				p={2}
				borderBottom="1px solid rgba(255, 255, 255, 0.12)"
			>
				<Typography variant="subtitle1" fontWeight="bold">
					{title || "Document Inspection"}
				</Typography>
				<Box display="flex" alignItems="center" gap={1}>
					<IconButton
						onClick={handleZoomOut}
						aria-label="Zoom out"
						sx={{ color: "#ffffff" }}
						disabled={scale <= 0.5}
					>
						<ZoomOut />
					</IconButton>
					<Typography variant="caption" sx={{ minWidth: 40, textAlign: "center" }}>
						{Math.round(scale * 100)}%
					</Typography>
					<IconButton
						onClick={handleZoomIn}
						aria-label="Zoom in"
						sx={{ color: "#ffffff" }}
						disabled={scale >= 3}
					>
						<ZoomIn />
					</IconButton>
					<IconButton onClick={handleRotate} aria-label="Rotate document" sx={{ color: "#ffffff" }}>
						<RotateRight />
					</IconButton>
					<IconButton onClick={handleReset} aria-label="Reset view" sx={{ color: "#ffffff" }}>
						<RestartAlt />
					</IconButton>
					<IconButton onClick={handleDialogClose} aria-label="Close lightbox" sx={{ color: "#ffffff", ml: 1 }}>
						<Close />
					</IconButton>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				p={3}
				minHeight="60vh"
				maxHeight="80vh"
				overflow="auto"
			>
				{imageSrc ? (
					<Box
						component="img"
						src={imageSrc}
						alt={title || "National ID card inspection preview"}
						sx={{
							maxWidth: "100%",
							maxHeight: "70vh",
							transform: `rotate(${rotation}deg) scale(${scale})`,
							transition: "transform 180ms ease-out",
							transformOrigin: "center center",
							borderRadius: 2,
							boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
						}}
					/>
				) : (
					<Typography variant="body2" color="text.secondary">
						No document image available.
					</Typography>
				)}
			</Box>
		</Dialog>
	);
});

export default DocumentLightbox;
