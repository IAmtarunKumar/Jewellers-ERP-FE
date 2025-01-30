// Validate individual fields
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "customerId":
      return !value ? "Customer Id is required" : "";
    case "productId":
      return !value ? "Product Id is required" : "";
    case "appraiserEmailId":
      if (!value) return "Email is required";
      if (!emailRegex.test(value)) return "Invalid Email";
      return "";
    case "appraisedValue":
      return !value || value <= 0 ? "Value is required" : "";
    case "appraisalDate":
      return !value ? "Date is required" : "";
    default:
      return "";
  }
};

// Validate the entire appraisals object
export const validateAppraisal = (appraisals) => {
  const errors = {};

  if (!appraisals) {
    return {
      customerId: "Customer Id is required",
      productId: "Product Id is required",
      appraiserEmailId: "Email is required",
      appraisedValue: "Value is required",
      appraisalDate: "Date is required",
    };
  }

  if (!appraisals.customerId) errors.customerId = "Customer Id is required";
  if (!appraisals.productId) errors.productId = "Product Id is required";
  const emailError = validateField(
    "appraiserEmailId",
    appraisals.appraiserEmailId
  );
  if (emailError) errors.appraiserEmailId = emailError;
  if (!appraisals.appraisedValue || appraisals.appraisedValue <= 0)
    errors.appraisedValue = "Value is required";
  if (!appraisals.appraisalDate) errors.appraisalDate = "Date is required";

  return errors;
};
