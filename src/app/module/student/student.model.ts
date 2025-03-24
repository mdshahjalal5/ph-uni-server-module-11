import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import {
  TGuardian,
  IStudentModel,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
import config from "../../config";
import { func } from "joi";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "Name cant be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        return /^[A-Z][a-z]*$/.test(value);
      },
      message:
        "First name must start with an uppercase letter and contain only lowercase letters after.",
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    validate: {
      validator: (value: string) => {
        return validator.isAlpha(value);
      },
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "MOther Contact is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "local guardian occupation is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact no is required"],
  },
});

//t: creating custom statics method
const studentSchema = new Schema<TStudent, IStudentModel>(
  // for creating custom instance method
  // const studentSchema = new Schema<Student, TStudentModel, TUserMethod>(

  {
    id: {
      type: String,
      unique: true,
      required: [true, "Student is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required sj"],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not valid email address",
      },
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, "contanct no is required"],
    },
    emergencyContactNo: {
      type: String,
      required: [true, "emergency contact no is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: {
      type: String,

      required: [true, "Present address is reqired"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "local guardian information is required"],
    },
    profileImage: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);
/* // creating a custom instance method
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });

  return existingUser;
}; */
// studentSchema.method("isUserExists", async function (id) {
//   const existingUser = await StudentModel.findOne({ id });
//   return existingUser;
// });
studentSchema.statics.isUserExists = async function (id) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
studentSchema.pre("save", async function () {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
studentSchema.virtual("fullName").get(function () {
  return (
    this.name.firstName + " " + this.name.middleName + " " + this.name.lastName
  );
});

// query middleware
studentSchema.pre("find", function (next) {
  this.find({
    isDeleted: { $ne: true },
  });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.findOne({
    isDeleted: { $ne: true },
  });
  next();
});
// studentSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });
  next();
});
// virtual
/* studentSchema.virtual("fullName").get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
}); */

export const Student = model<TStudent, IStudentModel>("Student", studentSchema);

// ✅ Ensure unique indexes are built properly
Student.init()
  .then(() => console.log("Indexes created successfully"))
  .catch((err) => console.error("Index creation failed:", err));
