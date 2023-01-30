import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 20000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default axiosClient;
