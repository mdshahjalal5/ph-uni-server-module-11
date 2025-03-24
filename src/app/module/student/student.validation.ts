import { z } from "zod";

// ✅ UserName Validation Schema
export const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(20, "First name can't be more than 20 characters")
    .regex(
      /^[A-Z][a-z]*$/,
      "First name must start with an uppercase letter and contain only lowercase letters after.",
    ),

  middleName: z.string().optional(),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name must contain only alphabets"),
});

// ✅ Guardian Validation Schema
export const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father name is required"),
  fatherOccupation: z.string().min(1, "Father occupation is required"),
  fatherContactNo: z.string().min(1, "Father contact number is required"),
  motherName: z.string().min(1, "Mother name is required"),
  motherOccupation: z.string().min(1, "Mother occupation is required"),
  motherContact: z.string().min(1, "Mother contact number is required"),
});

// ✅ LocalGuardian Validation Schema
export const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian name is required"),
  occupation: z.string().min(1, "Local guardian occupation is required"),
  contactNo: z.string().min(1, "Local guardian contact number is required"),
  address: z.string().min(1, "Local guardian address is required"),
});

// ✅ Student Validation Schema
export const studentValidationSchema = z.object({
  id: z.string().min(1, "Student ID is required"),
  password: z
    .string()
    .max(20, { message: "password can't be more than 20 characters" }),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female"], { message: "Invalid gender" }),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email format"),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["active", "blocked"], { message: "Invalid status" }),
  isDeleted: z.boolean().default(false),
});
