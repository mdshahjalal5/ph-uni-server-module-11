import { Request, Response } from "express";
import { StudentService } from "./student.service";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: "Retrieved All Students",
      data: result,
    });
  } catch (error) {
    console.log(`error`, error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    console.log(studentId, "student.controller.ts", 38);
    const result = await StudentService.getStudentByIdFromDb(studentId);
    res.status(200).json({
      success: true,
      message: "got single student",
      data: result,
    });
  } catch (error) {
    console.log(`error`, error);
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.deleteStudentFromDB(
      req.params.studentId,
    );
    res.status(200).json({
      success: true,
      message: "user successfully deleted.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

export const StudentController = {
  getStudentById,
  deleteStudent,
  getAllStudents,
};
