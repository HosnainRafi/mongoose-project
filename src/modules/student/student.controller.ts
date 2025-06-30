import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //will call service func to post the data
    const result = await studentServices.createStudentIntoDB(studentData);

    //Get the response
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    //will call service func to get the data
    const result = await studentServices.getAllStudentsFromDB();

    //Get the response
    res.status(200).json({
      success: true,
      message: "Student is retrived successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrived successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
