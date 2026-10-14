import { DeleteOutline, LocationCity, SaveOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addLocation } from "../api/addLocation";
import { deleteLocation } from "../api/deleteLocation";
import { updateLocation } from "../api/updateLocation";

interface ManageLocationProps {
	id: string;
	city: string;
	district: string;
	setCity: (value: string) => void;
	setDistrict: (value: string) => void;
	handleCloseModal: () => void;
}

const fieldSx = {
	"& .MuiOutlinedInput-root": {
		minHeight: 44,
		borderRadius: "6px",
		backgroundColor: "#222328",
		color: "#f0f0f2",
		"& fieldset": { borderColor: "rgba(255,255,255,.1)" },
		"&:hover fieldset": { borderColor: "rgba(255,255,255,.22)" },
		"&.Mui-focused fieldset": { borderColor: "#ee637b", borderWidth: 1 }
	},
	"& .MuiInputBase-input": { py: 1.25, fontSize: 13 },
	"& .MuiInputLabel-root": { color: "#a4a5ad", fontSize: 13 },
	"& .MuiInputLabel-root.Mui-focused": { color: "#ff8295" }
};

const ManageLocation = memo<ManageLocationProps>(({ id, city, district, setCity, setDistrict, handleCloseModal }) => {
	const queryClient = useQueryClient();
	const [loadingAction, setLoadingAction] = useState<"add" | "update" | "delete" | null>(null);
	const isEditing = Boolean(id);

	const handleSave = async () => {
		const normalizedCity = city.trim();
		const normalizedDistrict = district.trim();
		if (!normalizedCity || !normalizedDistrict) {
			toast.error("Vui lòng nhập đầy đủ thành phố và quận / huyện.");
			return;
		}
		if (loadingAction) return;

		setLoadingAction(isEditing ? "update" : "add");
		try {
			if (isEditing) {
				await updateLocation(id, { city: normalizedCity, district: normalizedDistrict });
				toast.success("Đã cập nhật địa điểm.");
			} else {
				await addLocation({ city: normalizedCity, district: normalizedDistrict });
				toast.success("Đã thêm địa điểm.");
			}
			await queryClient.invalidateQueries("all-locations");
			handleCloseModal();
		} catch {
			toast.error(isEditing ? "Không thể cập nhật địa điểm. Vui lòng thử lại." : "Không thể thêm địa điểm. Vui lòng thử lại.");
		} finally {
			setLoadingAction(null);
		}
	};

	const handleDelete = async () => {
		if (!id || loadingAction) return;
		setLoadingAction("delete");
		try {
			await deleteLocation(id);
			toast.success("Đã xóa địa điểm.");
			await queryClient.invalidateQueries("all-locations");
			handleCloseModal();
		} catch {
			toast.error("Không thể xóa địa điểm. Vui lòng thử lại.");
		} finally {
			setLoadingAction(null);
		}
	};

	return (
		<Box component="form" onSubmit={event => { event.preventDefault(); void handleSave(); }} sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 3 }}>
				<Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
					<Box sx={{ width: 36, height: 36, display: "grid", placeItems: "center", color: "#ff8295", bgcolor: "rgba(232,67,96,.13)", borderRadius: "6px" }}><LocationCity sx={{ fontSize: 19 }} /></Box>
					<Box>
						<Typography sx={{ color: "#f5f5f6", fontWeight: 650, fontSize: 17, letterSpacing: "-.02em" }}>{isEditing ? "Thông tin địa điểm" : "Địa điểm mới"}</Typography>
						<Typography sx={{ color: "#9b9da5", fontSize: 12, mt: 0.35 }}>{isEditing ? "Cập nhật tên thành phố và quận / huyện." : "Nhập thông tin để tạo một địa điểm mới."}</Typography>
					</Box>
				</Box>
				{isEditing && <Button aria-label="Xóa địa điểm" onClick={() => void handleDelete()} disabled={Boolean(loadingAction)} startIcon={loadingAction === "delete" ? <CircularProgress size={15} color="inherit" /> : <DeleteOutline />} sx={{ minWidth: 36, px: 1, color: "#e88b97", border: "1px solid rgba(232,139,151,.25)", borderRadius: "6px", fontSize: 12, textTransform: "none", "&:hover": { bgcolor: "rgba(232,67,96,.12)" } }}>Xóa</Button>}
			</Box>

			<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 3 }}>
				<TextField label="Thành phố" value={city} onChange={event => setCity(event.target.value)} required fullWidth autoComplete="address-level1" sx={fieldSx} />
				<TextField label="Quận / huyện" value={district} onChange={event => setDistrict(event.target.value)} required fullWidth autoComplete="address-level2" sx={fieldSx} />
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, pt: 2, borderTop: "1px solid rgba(255,255,255,.09)" }}>
				<Typography sx={{ display: { xs: "none", sm: "block" }, color: "#92949d", fontSize: 11 }}>Thông tin đồng bộ với danh mục địa điểm.</Typography>
				<Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
					<Button type="button" onClick={handleCloseModal} disabled={Boolean(loadingAction)} sx={{ color: "#b1b2b8", borderRadius: "6px", px: 1.5, fontSize: 12, textTransform: "none", "&:hover": { bgcolor: "rgba(255,255,255,.06)" } }}>Hủy</Button>
					<Button type="submit" disabled={Boolean(loadingAction)} startIcon={loadingAction && loadingAction !== "delete" ? <CircularProgress size={15} color="inherit" /> : <SaveOutlined sx={{ fontSize: 17 }} />} sx={{ px: 1.75, minHeight: 36, bgcolor: "#e84360", color: "#fff", borderRadius: "6px", fontSize: 12, fontWeight: 650, textTransform: "none", "&:hover": { bgcolor: "#f0526d" }, "&.Mui-disabled": { color: "rgba(255,255,255,.62)", bgcolor: "rgba(232,67,96,.45)" } }}>{isEditing ? "Lưu thay đổi" : "Tạo địa điểm"}</Button>
				</Box>
			</Box>
		</Box>
	);
});

export default ManageLocation;
