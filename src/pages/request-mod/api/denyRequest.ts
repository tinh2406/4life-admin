import axiosInstance from "../../../constants/AxiosInstance";

export const denyMod = async(id:string)=>{
    await axiosInstance.put(`/users/reject-user/${id}`);
}