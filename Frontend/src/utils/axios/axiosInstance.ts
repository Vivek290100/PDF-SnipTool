import axios from "axios";
import API_BASE_URL from "./baseURL";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



export default axiosInstance;

