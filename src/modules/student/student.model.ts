/* eslint-disable prettier/prettier */
import { Schema, model } from "mongoose";
import {
  IStudent,
  UserName,
  Guardian,
  LocalGuardian,
} from "./student.interface";

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

const studentSchema = new Schema<IStudent>({
  id: { type: String, unique: true },
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
});

export const StudentModel = model<IStudent>("Student", studentSchema);
