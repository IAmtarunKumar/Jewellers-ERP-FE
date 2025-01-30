const phoneRegex = /^\d{10}$/;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "centerName":
      return !value ? "Center Name is required" : "";
    case "contact":
      if (!value) return "Contact is required";
      if (!phoneRegex.test(value)) return "Invalid contact number";
      return "";
    case "email":
      if (!value) return "Email is required";
      if (!emailRegex.test(value)) return "Invalid Email";
      return "";
    case "address":
      return !value ? "Address is required" : "";
    case "authorizedBy":
      return !value ? "Authorized By is required" : "";
    default:
      return "";
  }
};

export const validateHallMarkCenter = (hallMarkCenter) => {
  const errors = {};

  if (!hallMarkCenter) {
    return {
      centerName: "HallMark Center Name is required",
      contact: "Contact is required",
      address: "Address is required",
      email: "Email is required",
      authorizedBy: "Authorized By is required",
    };
  }

  const contactError = validateField("contact", hallMarkCenter.contact);
  const emailError = validateField("email", hallMarkCenter.email);
  if (contactError) errors.contact = contactError;
  if (emailError) errors.email = emailError;

  if (!hallMarkCenter.centerName)
    errors.centerName = "HallMark Center Name is required";
  if (!hallMarkCenter.address) errors.address = "Address is required";
  if (!hallMarkCenter.authorizedBy)
    errors.authorizedBy = "Authorized By is required";

  return errors;
};
