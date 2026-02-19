import Employee from "../models/employee.model.js";


export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
};


export const createEmployee = async (req, res, next) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existing = await Employee.findOne({
      $or: [{ employeeId }, { email }],
    });

    if (existing) {
      return res.status(409).json({
        message: "Employee ID or Email already exists",
      });
    }

    const newEmployee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};


export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Employee.findByIdAndDelete(id);

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};
