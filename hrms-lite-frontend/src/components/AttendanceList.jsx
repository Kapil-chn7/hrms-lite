import { useEffect, useState } from "react";
import axios from "axios";
 const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function AttendanceList({ employeeId, mode }) {
  const [records, setRecords] = useState([]);
  const [pendingChanges, setPendingChanges] = useState({});

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  
  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

 
  const fetchAttendance = async () => {
    if (!employeeId) return;

    try {
      const res = await axios.get(`${BASE_URL}/attendance/${employeeId}`);
      setRecords(res.data);
      setPendingChanges({});
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [employeeId]);

  // Convert records to map
  const attendanceMap = {};
  records.forEach((rec) => {
    const dateStr = formatDate(rec.date);
    attendanceMap[dateStr] = rec.status;
  });

  const mergedMap = { ...attendanceMap, ...pendingChanges };

  // Toggle logic
  const handleToggle = (date) => {
    if (mode !== "mark") return;

    const currentStatus = mergedMap[date];

    let newStatus;
    if (!currentStatus) newStatus = "Present";
    else if (currentStatus === "Present") newStatus = "Absent";
    else newStatus = "Present";

    setPendingChanges((prev) => ({
      ...prev,
      [date]: newStatus,
    }));
  };

  // Save bulk changes
  const handleSave = async () => {
    try {
      const changesArray = Object.entries(pendingChanges).map(
        ([date, status]) => ({
          date,
          status,
        }),
      );

      console.log("Sending to backend:", {
        employeeId,
        updates: changesArray,
      });

     

      await axios.post(`${BASE_URL}/attendance/bulk`, {
        employeeId,
        updates: changesArray,
      });
      alert("Attendance saved successfully");

      setPendingChanges({});
      fetchAttendance();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save attendance");
    }
  };

  // Generate calendar
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(currentYear, currentMonth, day);
    calendarDays.push(formatDate(dateObj));
  }

  return (
    <div className="attendance-container">
      <h3>
        Attendance Calendar ({mode === "mark" ? "Editable" : "View Only"})
      </h3>

      <div className="calendar">
        {calendarDays.map((date, index) => {
          if (!date) return <div key={index} className="empty-cell"></div>;

          const status = mergedMap[date];

          let className = "calendar-day";
          if (status === "Present") className += " present";
          else if (status === "Absent") className += " absent";
          else className += " unmarked";

          return (
            <div
              key={index}
              className={className}
              onClick={() => handleToggle(date)}
              style={{
                cursor: mode === "mark" ? "pointer" : "not-allowed",
              }}
            >
              {new Date(date).getDate()}
            </div>
          );
        })}
      </div>

      {mode === "mark" && Object.keys(pendingChanges).length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
}
