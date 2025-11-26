// import axiosClient from "./axiosClient";
// export interface CreateEventDTO {
//   title: string;
//   description: string;
//   eventDate: string;
//   eventTime: string;
//   recipients: string;
// }


// export const createEvent = async (userId: number, dto: CreateEventDTO) => {
//   const response = await axiosClient.post(
//     `http://localhost:8080/api/events?userId${userId}`,
//     dto
//   );
//   return response.data;
// };



// import axiosClient from "./axiosClient";

// export interface CreateEventDTO {
//   title: string;
//   description: string;
//   date: string; // Will be converted to proper format
//   time: string; // Will be converted to proper format  
//   recipientEmails: string[];
// }

// export const createEvent = async (dto: CreateEventDTO) => {
//   // Format the data for backend
//   const formattedData = {
//     ...dto,
//     date: dto.date, // Keep as YYYY-MM-DD (LocalDate accepts this)
//     time: dto.time, // Keep as HH:mm:ss (LocalTime accepts this)
//   };
  
//   const res = await axiosClient.post("/api/user/events/", formattedData);
//   return res.data;
// };

// export const fetchUserEvents = async () => {
//   const res = await axiosClient.get("/api/user/events/");
//   return res.data;
// };

import axiosClient from "./axiosClient";

export interface CreateEventDTO {
  title: string;
  description: string;
  date: string;
  time: string;
  recipientEmails: string[];
}

// Helper function to get user role
const getUserRole = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const userData = JSON.parse(user);
      return userData.role || userData.roles?.[0];
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  return null;
};

export const createEvent = async (dto: CreateEventDTO) => {
  const formattedData = {
    ...dto,
    date: dto.date,
    time: dto.time,
  };
  
  const res = await axiosClient.post("/api/user/events/", formattedData);
  return res.data;
};

export const fetchUserEvents = async () => {
  const role = getUserRole();
  console.log("👤 User role:", role);
  
  // Use different endpoints based on role
  if (role === 'ROLE_ADMIN') {
    console.log("🛡️ Admin detected - fetching all events");
    // Admin sees all events
    const res = await axiosClient.get("/api/admin/all-events");
    return res.data;
  } else {
    console.log("👤 Regular user - fetching user events");
    // Regular user sees only their events
    const res = await axiosClient.get("/api/user/events/");
    return res.data;
  }
};