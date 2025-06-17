import { fetchData } from "./api";

export const getAllTickets = async () => {
  const response = await fetchData('/tickets');
  return response;
};
