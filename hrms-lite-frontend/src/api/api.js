import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getEmployees = () => API.get("/employees");
export const createEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const markAttendance = (data) => API.post("/attendance", data);
export const getAttendanceByEmployee = (employeeId) =>
  API.get(`/attendance/${employeeId}`);
export const bulkUpdateAttendance = (data) =>
  API.post("/attendance/bulk", data);
