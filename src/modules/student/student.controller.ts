/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from "express";
import { studentServices } from "./student.service";
import studentValidationSchemaUsingZod from "./student.zod.validation";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { student: studentData } = req.body;

    // ✅ Safe Zod validation
    const parsed = studentValidationSchemaUsingZod.safeParse(studentData);

    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errorMessages,
      });
    }

    const validatedStudent = parsed.data;

    const result = await studentServices.createStudentIntoDB(validatedStudent);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error); // ✅ updated
  }
};

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    return res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error); // ✅ updated
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await studentServices.getSingleStudentFromDB(studentId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error); // ✅ updated
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await studentServices.deleteStudentFromDB(studentId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error); // ✅ updated
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
