import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { deleteAmenity } from "../api/deleteAmenity";
import { updateAmenity } from "../api/updateAmenity";
import { addAmenity } from "../api/addAmenity";

interface MangageAmenityProps {
	id: string;
	name: string;
	icon: string;
	file: File | undefined;
	setFile: (value: File) => void;
	setName: (value: string) => void;
	setIcon: (value: string) => void;
	handleCloseModal: () => void;
}
const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1
});
const ManageAmenity = memo<MangageAmenityProps>(
	({ id, name, icon, file, setFile, setName, setIcon, handleCloseModal }) => {
		const queryClient = useQueryClient();
		const [addLoading, setAddLoading] = useState(false);
		const [updateLoading, setUpdateLoading] = useState(false);
		const [delLoading, setDelLoading] = useState(false);

		const handleDelete = async () => {
			if (!id || delLoading) return;
			setDelLoading(true);
			try {
				await deleteAmenity(id);
				toast.info("Delete amenity successfully");
			} catch (error) {
				toast.error("Delete error");
			}
			setDelLoading(false);
			queryClient.invalidateQueries("all-amenities");
			handleCloseModal();
		};
		const handleUpdate = async () => {
			if (!id) return;
			if (!name) {
				toast.error("Name is required");
				return;
			}
			if (updateLoading) {
				toast.warning("Current in process");
				return;
			}
			setUpdateLoading(true);
			try {
				await updateAmenity(id, { id, name, icon: file || icon });
				toast.success("Update amenity successfully");
			} catch (error) {
				toast.error("Update amenity error");
			}
			queryClient.invalidateQueries("all-amenities");
			setUpdateLoading(false);
			handleCloseModal();
		};
		const handleAdd = async () => {
			if (!name) {
				toast.error("Name is required");
				return;
			}
			if (!file) {
				toast.error("Icon is required");
				return;
			}
			if (addLoading) {
				toast.warning("Current in process");
				return;
			}

			setAddLoading(true);
			try {
				await addAmenity({ icon: file, name });
				toast.success("Add amenity successfully");
			} catch (error) {
				toast.error("Add amenity error");
			}
			setAddLoading(false);
			queryClient.invalidateQueries("all-amenities");
			handleCloseModal();
		};

		return (
			<div
				style={{
					width: "100%"
				}}
			>
				<Typography fontSize={20} marginBottom={2}>
					Amenity
				</Typography>
				<TextField
					id="name"
					label="Name"
					value={name}
					onChange={e => setName(e.target.value)}
					style={{
						marginTop: "1rem",
						marginBottom: "1rem",
					}}
					fullWidth
					required
				/>
				<div
					style={{
						backgroundColor: "#e9e9e9",
						width: 50,
						height: 50,
						position: "relative",
                        marginBottom:"2rem"
					}}
				>
					{icon && <img src={icon} width={50} height={50} />}
					<Button
						id="icon"
						component="label"
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							color: "black",
							textTransform: "none",
						}}
						startIcon={<CloudUploadIcon />}
					>
						<VisuallyHiddenInput
							type="file"
							accept=".jpg,.png"
							onChange={e => {
								if (e.target.files?.[0]) {
									setIcon(URL.createObjectURL(e.target.files[0]));
									setFile(e.target.files[0]);
								}
							}}
						/>
					</Button>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "right"
					}}
				>
					<Button
						variant="text"
						onClick={handleCloseModal}
						style={{
							backgroundColor: "#cacaca",
							color: "black",
							textTransform: "none",
							marginRight: 5
						}}
					>
						Cancel
					</Button>
					{id && (
						<Button
							variant="contained"
							color="primary"
							onClick={handleDelete}
							style={{
								backgroundColor: !delLoading && id ? "#ed9e00" : "#cacaca",
								color: "white",
								textTransform: "none",
								marginRight: 5
							}}
						>
							{delLoading ? <CircularProgress color="inherit" size={20} /> : "Delete"}
						</Button>
					)}
					<Button
						id="btn-save"
						variant="contained"
						color="primary"
						onClick={handleUpdate}
						style={{
							backgroundColor: !updateLoading && id ? "#047409" : "#cacaca",
							color: "white",
							textTransform: "none",
							marginRight: 5
						}}
					>
						{updateLoading ? <CircularProgress color="inherit" size={20} /> : "Save"}
					</Button>
					<Button
						id="btn-add"
						variant="contained"
						color="primary"
						onClick={handleAdd}
						style={{
							backgroundColor: !addLoading ? "#ff385c" : "#cacaca",
							color: "white",
							textTransform: "none"
						}}
					>
						{addLoading ? <CircularProgress color="inherit" size={20} /> : "Add"}
					</Button>
				</div>
			</div>
		);
	}
);

export default ManageAmenity;
