import { CloudUploadOutlined, DeleteOutline, ImageOutlined, SaveOutlined } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { memo, useId, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addAmenity } from "../api/addAmenity";
import { deleteAmenity } from "../api/deleteAmenity";
import { updateAmenity } from "../api/updateAmenity";

interface ManageAmenityProps {
	id: string;
	name: string;
	icon: string;
	file: File | undefined;
	onFileSelect: (value: File) => void;
	setName: (value: string) => void;
	handleCloseModal: () => void;
	compact?: boolean;
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

const ManageAmenity = memo<ManageAmenityProps>(({ id, name, icon, file, onFileSelect, setName, handleCloseModal, compact = false }) => {
	const queryClient = useQueryClient();
	const [loadingAction, setLoadingAction] = useState<"add" | "update" | "delete" | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const inputId = useId();
	const isEditing = Boolean(id);

	const handleFileSelect = (selectedFile?: File) => {
		if (!selectedFile) return;
		if (!(selectedFile.type === "image/png" || selectedFile.type === "image/jpeg")) {
			toast.error("Chỉ hỗ trợ tệp PNG hoặc JPG.");
			return;
		}
		onFileSelect(selectedFile);
	};

	const handleSave = async () => {
		const normalizedName = name.trim();
		if (!normalizedName) {
			toast.error("Vui lòng nhập tên tiện ích.");
			return;
		}
		if (!isEditing && !file) {
			toast.error("Vui lòng chọn biểu tượng cho tiện ích mới.");
			return;
		}
		if (loadingAction) return;

		setLoadingAction(isEditing ? "update" : "add");
		try {
			if (isEditing) {
				await updateAmenity(id, { id, name: normalizedName, icon: file || icon });
				toast.success("Đã cập nhật tiện ích.");
			} else if (file) {
				await addAmenity({ name: normalizedName, icon: file });
				toast.success("Đã thêm tiện ích.");
			}
			await queryClient.invalidateQueries("all-amenities");
			handleCloseModal();
		} catch {
			toast.error(isEditing ? "Không thể cập nhật tiện ích. Vui lòng thử lại." : "Không thể thêm tiện ích. Vui lòng thử lại.");
		} finally {
			setLoadingAction(null);
		}
	};

	const handleDelete = async () => {
		if (!id || loadingAction) return;
		setLoadingAction("delete");
		try {
			await deleteAmenity(id);
			toast.success("Đã xóa tiện ích.");
			await queryClient.invalidateQueries("all-amenities");
			handleCloseModal();
		} catch {
			toast.error("Không thể xóa tiện ích. Vui lòng thử lại.");
		} finally {
			setLoadingAction(null);
		}
	};

	return (
		<Box component="form" onSubmit={event => { event.preventDefault(); void handleSave(); }} sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 3 }}>
				<Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
					<Box sx={{ width: 36, height: 36, display: "grid", placeItems: "center", color: "#ff8295", bgcolor: "rgba(232,67,96,.13)", borderRadius: "6px" }}><ImageOutlined sx={{ fontSize: 19 }} /></Box>
					<Box>
						<Typography sx={{ color: "#f5f5f6", fontWeight: 650, fontSize: 17, letterSpacing: "-.02em" }}>{isEditing ? "Thông tin tiện ích" : "Tiện ích mới"}</Typography>
						<Typography sx={{ color: "#9b9da5", fontSize: 12, mt: 0.35 }}>{isEditing ? "Cập nhật tên và biểu tượng tiện ích." : "Đặt tên và tải lên biểu tượng cho tiện ích."}</Typography>
					</Box>
				</Box>
				{isEditing && <Button aria-label="Xóa tiện ích" onClick={() => void handleDelete()} disabled={Boolean(loadingAction)} startIcon={loadingAction === "delete" ? <CircularProgress size={15} color="inherit" /> : <DeleteOutline />} sx={{ minWidth: 36, px: 1, color: "#e88b97", border: "1px solid rgba(232,139,151,.25)", borderRadius: "6px", fontSize: 12, textTransform: "none", "&:hover": { bgcolor: "rgba(232,67,96,.12)" } }}>Xóa</Button>}
			</Box>

			<Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", ...(compact ? {} : { sm: "minmax(0, 1fr) minmax(180px, .7fr)" }) }, gap: 2, mb: 3 }}>
				<TextField label="Tên tiện ích" value={name} onChange={event => setName(event.target.value)} required fullWidth sx={fieldSx} />
				<Box>
					<Typography component="label" htmlFor={inputId} sx={{ display: "block", mb: 0.75, color: "#a4a5ad", fontSize: 12 }}>Biểu tượng</Typography>
					<Box sx={{ minHeight: 92, display: "flex", alignItems: "center", gap: 1.5, p: 1.25, bgcolor: "#222328", border: "1px solid rgba(255,255,255,.1)", borderRadius: "6px" }}>
						<Box sx={{ width: 60, height: 60, flex: "0 0 auto", display: "grid", placeItems: "center", overflow: "hidden", bgcolor: "#303137", border: "1px solid rgba(255,255,255,.07)", borderRadius: "6px" }}>
							{icon ? <Box component="img" src={icon} alt={name ? `Biểu tượng ${name}` : "Xem trước biểu tượng"} sx={{ width: "100%", height: "100%", objectFit: "contain", p: 0.5 }} /> : <ImageOutlined sx={{ color: "#8c8e97" }} />}
						</Box>
						<Box sx={{ minWidth: 0 }}>
							<Button type="button" onClick={() => inputRef.current?.click()} startIcon={<CloudUploadOutlined />} sx={{ p: 0, color: "#ff8295", fontSize: 12, fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "transparent", color: "#ff9bab" } }}>{icon ? "Đổi biểu tượng" : "Tải biểu tượng"}</Button>
							<Typography sx={{ color: "#92949d", fontSize: 10.5, mt: 0.25 }}>Định dạng PNG hoặc JPG</Typography>
							<input ref={inputRef} id={inputId} type="file" accept=".jpg,.png" hidden onChange={event => { handleFileSelect(event.target.files?.[0]); event.currentTarget.value = ""; }} />
						</Box>
					</Box>
				</Box>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1.5, pt: 2, borderTop: "1px solid rgba(255,255,255,.09)" }}>
				<Typography sx={{ display: { xs: "none", sm: "block" }, color: "#92949d", fontSize: 11 }}>{file ? file.name : "Biểu tượng hiển thị cùng tiện ích trên nền tảng."}</Typography>
				<Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
					<Button type="button" onClick={handleCloseModal} disabled={Boolean(loadingAction)} sx={{ color: "#b1b2b8", borderRadius: "6px", px: 1.5, fontSize: 12, textTransform: "none", "&:hover": { bgcolor: "rgba(255,255,255,.06)" } }}>Hủy</Button>
					<Button type="submit" disabled={Boolean(loadingAction)} startIcon={loadingAction && loadingAction !== "delete" ? <CircularProgress size={15} color="inherit" /> : <SaveOutlined sx={{ fontSize: 17 }} />} sx={{ px: 1.75, minHeight: 36, bgcolor: "#e84360", color: "#fff", borderRadius: "6px", fontSize: 12, fontWeight: 650, textTransform: "none", "&:hover": { bgcolor: "#f0526d" }, "&.Mui-disabled": { color: "rgba(255,255,255,.62)", bgcolor: "rgba(232,67,96,.45)" } }}>{isEditing ? "Lưu thay đổi" : "Tạo tiện ích"}</Button>
				</Box>
			</Box>
		</Box>
	);
});

export default ManageAmenity;
