import axiosInstance from "../../../constants/AxiosInstance"

export const deleteLocation = async(id:string)=>{
    const response = await axiosInstance.delete(`/locations/${id}`)
    return response.data
}