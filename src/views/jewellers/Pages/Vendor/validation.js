const phoneRegex = /^\d{10}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;
// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return !value ? "Vendor Name is required" : "";
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

// Validate the entire vendor object
export const validateVendor = (vendor) => {
  const errors = {};

  if (!vendor) {
    return {
      name: "Vendor Name is required",
      contact: "Contact is required",
      address: "Address is required",
      pincode: "Pincode is required",
    };
  }

  const contactError = validateField("contact", vendor.contact);
  if (contactError) errors.contact = contactError;

  if (!vendor.name) errors.name = "Vendor Name is required";
  if (!vendor.address) errors.address = "Address is required";
  if (!vendor.pincode) errors.pincode = "Pincode is required";
  return errors;
};
