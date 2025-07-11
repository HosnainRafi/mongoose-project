// student.route.ts
import express from "express";
import { studentController } from "./student.controller";
const router = express.Router();

router.post("/create-student", studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:studentId", studentController.getSingleStudent);
router.delete("/:studentId", studentController.deleteStudent);

export const studentRoutes = router;
