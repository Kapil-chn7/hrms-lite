/*
 * @Author: Kapil Chauhan
 * @Problem: 
 * @Started: Do not edit
 * @LastEdited: Do not edit
 */
import express from "express";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.delete("/:id", deleteEmployee);

export default router;
