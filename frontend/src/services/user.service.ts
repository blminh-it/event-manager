import { fetchData } from "./api";

export const getAllUsers = async () => {
  const response = await fetchData('/users');
  return response;
};
