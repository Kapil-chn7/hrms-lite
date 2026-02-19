import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/api";
import AttendanceList from "./AttendanceList";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [mode, setMode] = useState(null);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const toggleSection = (employeeId, selectedMode) => {
    if (activeEmployee === employeeId && mode === selectedMode) {
      setActiveEmployee(null);
      setMode(null);
    } else {
      setActiveEmployee(employeeId);
      setMode(selectedMode);
    }
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  return (
    <div className="card">
      <h3>Employee List</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <>
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button onClick={() => toggleSection(emp.employeeId, "mark")}>
                    Mark
                  </button>

                  <button onClick={() => toggleSection(emp.employeeId, "view")}>
                    View
                  </button>

                  <button onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>

              {activeEmployee === emp.employeeId && (
                <tr>
                  <td colSpan="5">
                    <AttendanceList employeeId={emp.employeeId} mode={mode} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
