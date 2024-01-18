import axiosInstance from "../../../constants/AxiosInstance";
import { PagingParams, PagingResponse } from "../../../type/Paging";
import { CollapseUser } from "./User";


export const getRequestMod = async(params:PagingParams<"Name"|"Email"|"PhoneNumber">)=>{
    const response = await axiosInstance.get<PagingResponse<CollapseUser>>("/users/users-waiting-for-approval", {
    // const response = await axiosInstance.get<PagingResponse<CollapseUser>>("/users", {
        params: {
            ...params
        }
    });    
    return response.data;
}