// added by chatgpt using model,
import Joi from "joi";

// User Name Validation
const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      "string.pattern.base":
        "First name must start with an uppercase letter and contain only lowercase letters after.",
      "string.max": "First name can't be more than 20 characters",
      "any.required": "First name is required",
    }),
  middleName: Joi.string().trim().allow("", null),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base": "Last name must contain only letters.",
      "any.required": "Last name is required",
    }),
});

// Guardian Validation
const guardianJoiSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    "any.required": "Father name is required",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    "any.required": "Father occupation is required",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    "any.required": "Father Contact No is required",
  }),
  motherName: Joi.string().trim().required().messages({
    "any.required": "Mother Name is required",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    "any.required": "Mother Occupation is required",
  }),
  motherContact: Joi.string().trim().required().messages({
    "any.required": "Mother Contact is required",
  }),
});

// Local Guardian Validation
const localGuardianJoiSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Local guardian name is required",
  }),
  occupation: Joi.string().trim().required().messages({
    "any.required": "Local guardian occupation is required",
  }),
  address: Joi.string().trim().required().messages({
    "any.required": "Local guardian address is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    "any.required": "Local guardian contact no is required",
  }),
});

// Student Validation
export const studentJoiSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "any.required": "Student ID is required",
  }),
  name: userNameJoiSchema.required().messages({
    "any.required": "Student name is required",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender must be either 'male' or 'female'",
    "any.required": "Gender is required",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  contactNo: Joi.string().trim().required().messages({
    "any.required": "Contact No is required",
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    "any.required": "Emergency contact No is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only": "Invalid blood group",
    }),
  presentAddress: Joi.string().trim().required().messages({
    "any.required": "Present address is required",
  }),
  permanentAddress: Joi.string().trim().required().messages({
    "any.required": "Permanent address is required",
  }),
  guardian: guardianJoiSchema.required().messages({
    "any.required": "Guardian information is required",
  }),
  localGuardian: localGuardianJoiSchema.required().messages({
    "any.required": "Local guardian information is required",
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid("active", "blocked").messages({
    "any.only": "Invalid status, must be 'active' or 'blocked'",
  }),
  isDeleted: Joi.boolean().default(false),
});
