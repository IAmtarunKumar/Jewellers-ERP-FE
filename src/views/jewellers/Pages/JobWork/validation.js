// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "rawMaterialName":
      return !value ? "Raw Material Name is required" : "";
    case "rawMaterialType":
      return !value ? "Raw Material Type is required" : "";
    case "vendorName":
      return !value ? "Vendor Name is required" : "";
    case "priceDecided":
      return !value || value <= 0 ? "Price Decided is required" : "";
    case "givenPurity":
      return !value ? "Given Purity is required" : "";
    case "givenDate":
      return !value ? "Given Date is required" : "";
    case "givenWeight":
      return !value || value <= 0 ? "Given Weight is required" : "";
    case "description":
      return !value ? "Description is required" : "";
    default:
      return "";
  }
};
export const validateEditField = (fieldName, value) => {
  switch (fieldName) {
    case "rawMaterialType":
      return !value ? "Raw Material Type is required" : "";
    case "priceDecided":
      return !value || value <= 0 ? "Price Decided is required" : "";
    case "givenDate":
      return !value ? "Given Date is required" : "";
    case "returnDate":
      return !value ? "Return Date is required" : "";
    case "givenWeight":
      return !value || value <= 0 ? "Given Weight is required" : "";
    case "returnWeight":
      return !value || value <= 0 ? "Return Weight is required" : "";
    case "givenPurity":
      return !value ? "Given Purity is required" : "";
    case "returnPurity":
      return !value ? "Return Purity is required" : "";
    case "description":
      return !value ? "Description is required" : "";
    default:
      return "";
  }
};

export const validateJobWork = (jobWork) => {
  const errors = {};

  if (!jobWork) {
    return {
      rawMaterialName: "Raw Material Name is required",
      rawMaterialType: "Raw Material Type is required",
      vendorName: "Vendor Name is required",
      priceDecided: "Price Decided is required",
      givenPurity: "Given Purity is required",
      givenDate: "Given Date is required",
      givenWeight: "Given Weight is required",
      description: "Description Id is required",
    };
  }

  if (!jobWork.rawMaterialName)
    errors.rawMaterialName = "Raw Material Name is required";
  if (!jobWork.rawMaterialType)
    errors.rawMaterialType = "Raw Material Type is required";
  if (!jobWork.vendorName) errors.vendorName = "Vendor Name is required";
  if (!jobWork.priceDecided || jobWork.priceDecided <= 0)
    errors.priceDecided = "Price Decided is required";
  if (!jobWork.givenPurity) errors.givenPurity = "Given Purity is required";
  if (!jobWork.givenWeight || jobWork.givenWeight <= 0)
    errors.givenWeight = "Given Weight is required";
  if (!jobWork.givenDate) errors.givenDate = "Given Date is required";
  if (!jobWork.description) errors.description = "Description is required";

  return errors;
};
export const validateEditJobWork = (jobWork) => {
  const errors = {};

  if (!jobWork) {
    return {
      rawMaterialType: "Raw Material Type is required",
      priceDecided: "Price Decided is required",
      givenDate: "Given Date is required",
      returnDate: "Return Date is required",
      givenWeight: "Given Weight is required",
      returnWeight: "Return Weight is required",
      givenPurity: "Given Purity is required",
      returnPurity: "Return Purity is required",
      description: "Description is required",
    };
  }

  if (!jobWork.rawMaterialType)
    errors.rawMaterialType = "Raw Material Type is required";
  if (!jobWork.priceDecided || jobWork.priceDecided <= 0)
    errors.priceDecided = "Price Decided is required";
  if (!jobWork.givenDate) errors.givenDate = "Given Date is required";
  if (!jobWork.returnDate) errors.returnDate = "Return Date is required";
  if (!jobWork.givenWeight || jobWork.givenWeight <= 0)
    errors.givenWeight = "Given Weight is required";
  if (!jobWork.returnWeight || jobWork.returnWeight <= 0)
    errors.returnWeight = "Return Weight is required";
  if (!jobWork.givenPurity) errors.givenPurity = "Given Purity is required";
  if (!jobWork.returnPurity) errors.returnPurity = "Return Purity is required";
  if (!jobWork.description) errors.description = "Description is required";

  return errors;
};
