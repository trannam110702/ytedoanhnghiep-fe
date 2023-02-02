import axiosClient from "./axiosClient";
export const loginResquest = async (username, password) => {
  return axiosClient.post("/login", { username, password });
};
