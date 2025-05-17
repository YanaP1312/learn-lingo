import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const registerSchema = yup.object({
  name: yup.string().max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const bookLessonSchema = yup.object({
  fullName: yup.string().max(20).required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .min(8)
    .matches(phoneRegExp, "Phone number is not valid")
    .required(),
  reason: yup.string().required(),
});
