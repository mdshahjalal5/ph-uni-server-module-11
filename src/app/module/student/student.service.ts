import { StudentModel } from "./student.model";

/* export const createStudentToDb = async (studentData: Student) => {
  // const result = await StudentModel.create(studentData); // built in static method

  const student = new StudentModel(studentData);
  const existingUser = await StudentModel.isUserExists(studentData.id);
  if (existingUser) {
    throw new Error("User already exists!!!!! dsto");
  }
  // for creating custom instance method
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists!!!");
  // }
  const result = await student.save(); /* built in instance method */
// return result;
// }; */

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentByIdFromDb = async (id: string) => {
  const result = await StudentModel.findOne({
    id: id,
  });
  const result2 = await StudentModel.aggregate([
    {
      $match: {
        id: id,
      },
    },
  ]);
  return result2;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne(
    { id },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const StudentService = {
  getStudentByIdFromDb,
  deleteStudentFromDB,
  getAllStudentsFromDb,
};
