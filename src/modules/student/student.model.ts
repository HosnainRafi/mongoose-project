/* eslint-disable prettier/prettier */
import { Schema, model } from "mongoose";
import {
  IStudent,
  UserName,
  Guardian,
  LocalGuardian,
} from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userNameSchema = new Schema<UserName>(
  {
    firstName: { type: String, trim: true },
    middleName: { type: String },
    lastName: { type: String, trim: true },
  },
  { _id: false }
);

const guardianSchema = new Schema<Guardian>(
  {
    fatherName: { type: String, trim: true },
    fatherOccupation: { type: String, trim: true },
    fatherContactNo: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String, required: false },
    motherContactNo: { type: String, required: false },
  },
  { _id: false }
);

const localGuardianSchema = new Schema<LocalGuardian>(
  {
    name: { type: String },
    occupation: { type: String },
    contactNo: { type: String },
    address: { type: String },
  },
  { _id: false }
);

const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, unique: true },
    password: { type: String },
    name: userNameSchema,
    gender: { type: String },
    dateOfBirth: { type: String },
    email: { type: String, unique: true },
    contactNo: { type: String },
    emergencyContactNo: { type: String },
    bloogGroup: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String },
    isActive: { type: String, default: "active" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

studentSchema.pre("save", async function (this: IStudent & Document) {
  const saltRounds = Number(config.saltRounds);
  this.password = await bcrypt.hash(this.password, saltRounds);
});

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const StudentModel = model<IStudent>("Student", studentSchema);
