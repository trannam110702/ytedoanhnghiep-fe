import axiosClient from "./axiosClient";
export const addRequestformResquest = async (body) => {
  return axiosClient.post("/requestform/add", body);
};
export const getAllRequestformResquest = async () => {
  return axiosClient.get("/requestform/getall");
};
