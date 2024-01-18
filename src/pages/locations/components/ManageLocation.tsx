import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteLocation } from "../api/deleteLocation";
import { updateLocation } from "../api/updateLocation";
import { addLocation } from "../api/addLocation";

interface MangageLocationProps {
	id: string;
	city: string;
	district: string;
	setCity: (value: string) => void;
	setDistrict: (value: string) => void;
	handleCloseModal: () => void;
}

const ManageLocation = memo<MangageLocationProps>(({ id, city, district, setCity, setDistrict, handleCloseModal }) => {
	const queryClient = useQueryClient();
	const [addLoading, setAddLoading] = useState(false);
	const [updateLoading, setUpdateLoading] = useState(false);
	const [delLoading, setDelLoading] = useState(false);

	const handleDelete = async () => {
		if (!id || delLoading) return;
		setDelLoading(true);
		try {
			await deleteLocation(id);
			toast.info("Delete location successfully");
		} catch (error) {
			toast.error("Delete error");
		}
		setDelLoading(false);
		queryClient.invalidateQueries("all-locations");
		handleCloseModal();
	};
	const handleUpdate = async () => {
		if (!id) return;
		if (!city) {
			toast.error("City is required!");
			return;
		}
		if (!district) {
			toast.error("District is required!");
			return;
		}
		if (updateLoading) {
			toast.error("Current in progress!");
			return;
		}
		setUpdateLoading(true);
		try {
			await updateLocation(id, { city, district });
			toast.success("Update location successfully");
		} catch (error) {
			toast.error("Update location error");
		}
		queryClient.invalidateQueries("all-locations");
		setUpdateLoading(false);
		handleCloseModal();
	};
	const handleAdd = async () => {
		if (!city) {
			toast.error("City is required!");
			return;
		}
		if (!district) {
			toast.error("District is required!");
			return;
		}
		if (addLoading) {
			toast.error("Current in progress!");
			return;
		}
		setAddLoading(true);
		try {
			await addLocation({ city, district });
			toast.success("Add location successfully");
		} catch (error) {
			toast.error("Add location error");
		}
		setAddLoading(false);
		queryClient.invalidateQueries("all-locations");
		handleCloseModal();
	};

	return (
		<div
			style={{
				width: "100%"
			}}
		>
			<Typography fontSize={20} marginBottom={2}>
				Location
			</Typography>
			<TextField
				id="city"
				label="City"
				value={city}
				onChange={e => setCity(e.target.value)}
                sx={{
                    mb:"1rem",
                    mt:"1rem",
                }}
				fullWidth
				required
			/>
			<TextField
				id="district"
				label="District"
				value={district}
				onChange={e => setDistrict(e.target.value)}
				fullWidth
				sx={{
                    mb:"2rem",
                }}
				required
			/>
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
});

export default ManageLocation;
