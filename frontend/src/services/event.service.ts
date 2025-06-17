import { fetchData } from "./api";

export const getAllEvents = async () => {
  const response = await fetchData('/events');
  return response;
};
