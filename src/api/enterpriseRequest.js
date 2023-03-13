import axiosClient from "./axiosClient";
export const addEnterpriseResquest = async (body) => {
  return axiosClient.post("/enterprise/addenterprise", body);
};
export const getAllEnterpriseResquest = async () => {
  return axiosClient.get("/enterprise/getall");
};
