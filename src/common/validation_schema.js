import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/@[^.]*\./, "Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
export const leadsSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/@[^.]*\./, "Invalid email address"),
  companyname: yup.string().required("Name is required"),

  keywords: yup.string().required("Keywords are required"),
  companytype: yup.string().required("Company Type is required"),
  mobile: yup
    .string()
    .required("Phone Number is required")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Invalid Phone Number"
    ),
});
export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),

  organisationName: yup.string().required("Organsition Name is required"),
  address: yup.string().required("Address is Required"),
  pincode: yup
    .string()
    .required("Pincode is Required")
    .matches(/^[1-9][0-9]{5}$/, "Must contain 6 Number"),
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
  // designation: yup.object().shape({
  //   value: yup.string().required("Designation is required"),
  // }),
  gst: yup.string().required("GST is required"),

  customCheckRegister: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export const changePassword = yup.object().shape({
  newPassword: yup
    .string()
    .required("New Password is required")
    // eslint-disable-next-line
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  currentPassword: yup.string().required("Current Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"), // Ensure it matches newPassword
});
