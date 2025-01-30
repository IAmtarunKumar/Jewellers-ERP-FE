const phoneRegex = /^\d{10}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return !value ? "Customer Name is required" : "";
    case "contact":
      if (!value) return "Contact is required";
      if (!phoneRegex.test(value)) return "Invalid contact number";
      return "";
    case "address":
      return !value ? "Address is required" : "";
    case "pincode":
      if (!value) return "Pincode is required";
      if (!pincodeRegex.test(value)) return "Invalid Pincode";
      return "";
    default:
      return "";
  }
};

export const validateCustomer = (Customer) => {
  const errors = {};

  if (!Customer) {
    return {
      name: "Customer Name is required",
      contact: "Contact is required",
      address: "Address is required",
      pincode: "Pincode is required",
    };
  }

  const contactError = validateField("contact", Customer.contact);
  if (contactError) errors.contact = contactError;

  if (!Customer.name) errors.name = "Customer Name is required";
  if (!Customer.address) errors.address = "Address is required";
  if (!Customer.pincode) errors.pincode = "Pincode is required";

  return errors;
};
