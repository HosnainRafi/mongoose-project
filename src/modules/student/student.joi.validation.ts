import Joi from "joi";

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),

  name: Joi.object({
    firstName: Joi.string().trim().max(20).required().messages({
      "string.base": `First name must be a string`,
      "string.empty": `First name is required`,
      "string.max": `First name must be at most 20 characters`,
    }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
      .trim()
      .pattern(/^[A-Za-z]+$/)
      .required()
      .messages({
        "string.pattern.base": `Last name must contain only letters`,
        "string.empty": `Last name is required`,
      }),
  }).required(),

  gender: Joi.string().valid("male", "female", "other").required(),

  dateOfBirth: Joi.string().optional(),

  email: Joi.string().email().required(),

  contactNo: Joi.string().required(),

  emergencyContactNo: Joi.string().required(),

  bloogGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional(),

  presentAddress: Joi.string().required(),

  permanentAddres: Joi.string().required(),

  guardian: Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().optional(),
    motherContactNo: Joi.string().optional(),
  }).required(),

  localGuardian: Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),

  profileImg: Joi.string().uri().optional(),

  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;
