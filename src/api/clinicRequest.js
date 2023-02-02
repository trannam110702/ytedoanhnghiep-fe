import axiosClient from "./axiosClient";
export const addClinicResquest = async (body) => {
  return axiosClient.post("/clinic/addclinic", body);
};
export const getAllClinicResquest = async () => {
  return axiosClient.get("/clinic/getall");
};
