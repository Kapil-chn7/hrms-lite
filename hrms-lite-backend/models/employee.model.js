/*
 * @Author: Kapil Chauhan
 * @Problem: 
 * @Started: Do not edit
 * @LastEdited: Do not edit
 */
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
  },
  { timestamps: true },
);


employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ email: 1 });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
