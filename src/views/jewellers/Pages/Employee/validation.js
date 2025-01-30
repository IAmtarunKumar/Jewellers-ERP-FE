import * as yup from "yup";

export const addEmployee = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/@[^.]*\./, "Invalid email address"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    // eslint-disable-next-line
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  mobile: yup
    .string()
    .required("Phone Number is required")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Invalid Phone Number"
    ),
  designation: yup.object().shape({
    value: yup.string().required("Designation is required"),
  }),
  // admin: yup.string().required("Please select an option"),
});
