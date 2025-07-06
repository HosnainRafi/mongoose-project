import { z } from "zod";

export const userNameZodSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const guardianZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

export const localGuardianZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const studentValidationSchemaUsingZod = z.object({
  id: z.string(),

  name: userNameZodSchema,

  gender: z.enum(["male", "female", "other"]),

  dateOfBirth: z.string().optional(),

  email: z.string().email(),

  contactNo: z.string(),

  emergencyContactNo: z.string(),

  bloogGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  presentAddress: z.string(),

  permanentAddress: z.string().optional(),

  guardian: guardianZodSchema,

  localGuardian: localGuardianZodSchema,

  profileImg: z.string().url().optional(),

  isActive: z.enum(["active", "blocked"]),
});

export type IStudent = z.infer<typeof studentValidationSchemaUsingZod>;
export type UserName = z.infer<typeof userNameZodSchema>;
export type Guardian = z.infer<typeof guardianZodSchema>;
export type LocalGuardian = z.infer<typeof localGuardianZodSchema>;
