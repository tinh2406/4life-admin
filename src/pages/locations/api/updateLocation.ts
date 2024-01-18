import axiosInstance from "../../../constants/AxiosInstance"
import { Location, UpdateLocationDTO } from "./Location"

export const updateLocation = async(id:string,location:UpdateLocationDTO)=>{
    const response = await axiosInstance.put<Location>(`/locations/${id}`,
        location
    )
    return response.data
}