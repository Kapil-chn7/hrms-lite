import Attendance from "../models/attendance.model.js";
import Employee from "../models/employee.model.js";


export const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields required" });
    }

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const record = await Attendance.findOneAndUpdate(
      { employee: employee._id, date: normalizedDate },
      { $set: { status } },
      { upsert: true, returnDocument: "after" },
    );

    return res.status(200).json(record);
  } catch (error) {
    console.error("Mark Error:", error);
    return res.status(500).json({ message: "Failed to mark attendance" });
  }
};


export const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const records = await Attendance.find({
      employee: employee._id,
    }).sort({ date: 1 });

    return res.status(200).json(records);
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ message: "Failed to fetch attendance" });
  }
};


export const bulkUpdateAttendance = async (req, res) => {
  try {
    const { employeeId, updates } = req.body;

    console.log("Incoming bulk payload:", req.body);

    if (!employeeId || !Array.isArray(updates)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (updates.length === 0) {
      return res.status(200).json({
        message: "No updates to process",
      });
    }

    const operations = updates.map((item) => {
      const normalizedDate = new Date(item.date);
      normalizedDate.setUTCHours(0, 0, 0, 0);

      return {
        updateOne: {
          filter: {
            employee: employee._id,
            date: normalizedDate,
          },
          update: {
            $set: {
              status: item.status,
              date: normalizedDate,
            },
          },
          upsert: true,
        },
      };
    });

    const result = await Attendance.bulkWrite(operations);

    console.log("Bulk result:", result);

    return res.status(200).json({
      message: "Attendance updated successfully",
      modified: result.modifiedCount,
      inserted: result.upsertedCount,
    });
  } catch (error) {
    console.error("Bulk Error:", error);
    return res.status(500).json({ message: "Bulk update failed" });
  }
};
