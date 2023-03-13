import axiosClient from "./axiosClient";
export const addExampackageResquest = async (body) => {
  return axiosClient.post("/exampackage/add", body);
};
export const getAllExampackageResquest = async () => {
  return axiosClient.get("/exampackage/getall");
};
