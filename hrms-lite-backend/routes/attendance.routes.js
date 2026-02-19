import express from "express";
import {
  markAttendance,
  getAttendanceByEmployee,
  bulkUpdateAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/", markAttendance);
router.post("/bulk", bulkUpdateAttendance);
router.get("/:employeeId", getAttendanceByEmployee);

export default router;
