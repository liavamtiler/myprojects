import * as yup from "yup";

export const loginSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .min(3, "length of username should be greater than 3")
      .max(10),
    password: yup.string().required(),
  })
  .required();

  export const signUpSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .min(3, "length of username should be greater than 3")
      .max(10),
    password: yup.string().required(),
    email: yup.string().required(),
    company: yup.string().required(),

  })
  .required();
