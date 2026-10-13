import httpClient from "../http/client";

export const uploadImage = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append("file", file);
	const res = await httpClient.post<{ url: string }>("/upload-images/images", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
	return res.data.url;
};

export const UploadImage = uploadImage;
