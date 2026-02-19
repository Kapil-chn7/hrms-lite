import { useState } from "react";
import { markAttendance } from "../api/api";

export default function AttendanceForm({ employeeId }) {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      alert("Please select date");
      return;
    }

    try {
      setLoading(true);

      await markAttendance({
        employeeId, 
        date,
        status,
      });

      alert("Attendance marked successfully");

      setDate("");
      setStatus("Present");
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  if (!employeeId) return null;

  return (
    <div className="attendance-form">
      <h4>Mark Attendance for {employeeId}</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
