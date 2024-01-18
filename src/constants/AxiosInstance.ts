import axios, { AxiosInstance } from "axios";


const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://tuna.whitemage.tech/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance