import { z } from "zod";

const studentValidationSchemaUsingZod = z.object({
  id: z.string({
    required_error: "Student ID is required",
    invalid_type_error: "Student ID must be a string",
  }),

  name: z.object({
    firstName: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .trim()
      .max(20, "First name must be at most 20 characters"),
    middleName: z
      .string({
        invalid_type_error: "Middle name must be a string",
      })
      .optional(),
    lastName: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .trim()
      .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
  }),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be one of: male, female, other",
  }),

  dateOfBirth: z
    .string({
      invalid_type_error: "Date of birth must be a string",
    })
    .optional(),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),

  contactNo: z.string({
    required_error: "Contact number is required",
    invalid_type_error: "Contact number must be a string",
  }),

  emergencyContactNo: z.string({
    required_error: "Emergency contact number is required",
    invalid_type_error: "Emergency contact number must be a string",
  }),

  bloogGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      invalid_type_error: "Invalid blood group",
    })
    .optional(),

  presentAddress: z.string({
    required_error: "Present address is required",
    invalid_type_error: "Present address must be a string",
  }),

  permanentAddres: z.string({
    required_error: "Permanent address is required",
    invalid_type_error: "Permanent address must be a string",
  }),

  guardian: z.object({
    fatherName: z
      .string({
        required_error: "Father’s name is required",
        invalid_type_error: "Father’s name must be a string",
      })
      .trim(),
    fatherOccupation: z
      .string({
        required_error: "Father’s occupation is required",
        invalid_type_error: "Father’s occupation must be a string",
      })
      .trim(),
    fatherContactNo: z.string({
      required_error: "Father’s contact number is required",
      invalid_type_error: "Father’s contact number must be a string",
    }),
    motherName: z.string({
      required_error: "Mother’s name is required",
      invalid_type_error: "Mother’s name must be a string",
    }),
    motherOccupation: z
      .string({
        invalid_type_error: "Mother’s occupation must be a string",
      })
      .optional(),
    motherContactNo: z
      .string({
        invalid_type_error: "Mother’s contact number must be a string",
      })
      .optional(),
  }),

  localGuardian: z.object({
    name: z.string({
      required_error: "Local guardian’s name is required",
      invalid_type_error: "Local guardian’s name must be a string",
    }),
    occupation: z.string({
      required_error: "Local guardian’s occupation is required",
      invalid_type_error: "Local guardian’s occupation must be a string",
    }),
    contactNo: z.string({
      required_error: "Local guardian’s contact number is required",
      invalid_type_error: "Local guardian’s contact number must be a string",
    }),
    address: z.string({
      required_error: "Local guardian’s address is required",
      invalid_type_error: "Local guardian’s address must be a string",
    }),
  }),

  profileImg: z
    .string({
      invalid_type_error: "Profile image must be a valid URL string",
    })
    .url("Profile image must be a valid URL")
    .optional(),

  isActive: z
    .enum(["active", "blocked"], {
      required_error: "Status is required",
      invalid_type_error: 'Status must be either "active" or "blocked"',
    })
    .default("active"),
});

export default studentValidationSchemaUsingZod;
