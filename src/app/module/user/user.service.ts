import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_pass;
  userData.role = "student";
  userData.id = "2030100001";
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.user = newUser._id;
    studentData.id = newUser.id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createUserIntoDB,
};
