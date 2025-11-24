import axiosClient from "./axiosClient";
export interface CreateEventDTO {
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  recipients: string;
}


export const createEvent = async (userId: number, dto: CreateEventDTO) => {
  const response = await axiosClient.post(
    `http://localhost:8080/api/events?userId${userId}`,
    dto
  );
  return response.data;
};
