import { useState } from "react";
import { createEmployee } from "../api/api";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(form);
      setForm({ employeeId: "", fullName: "", email: "", department: "" });
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating employee");
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Add Employee</h3>
      <input
        placeholder="Employee ID"
        required
        value={form.employeeId}
        onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
      />
      <input
        placeholder="Full Name"
        required
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Department"
        required
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <button type="submit">Add Employee</button>
    </form>
  );
}
