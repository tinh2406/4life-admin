import axiosInstance from "../constants/AxiosInstance";

export const UploadImage = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file);
	const res = await axiosInstance.post("/upload-images/images", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
	return res.data.url;
};
