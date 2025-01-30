export const validateField = (fieldName, value, formData) => {
  switch (fieldName) {
    case "date":
      return !value ? "Date is required" : "";

    case "supplierName":
      return !value ? "Name is required" : "";
    case "totalAdvance":
      return !value ? "Total advance is required" : "";
    // case "taxType":
    //   return !value ? "Please select a tax type." : "";

    default:
      return "";
  }
};

export const validateFormData = (formData) => {
  const errors = {};

  if (!formData) {
    return {
      supplierName: "Name is required",

      totalAdvance: "Total advance is required",
      // taxType: "Tax type is required",
    };
  }

  if (!formData.date) errors.date = "Date is required";
  if (!formData.totalAdvance) errors.totalAdvance = "Total advance is required";
  if (!formData.supplierName) errors.supplierName = "Name is required";

  return errors;
};

export const validateModalField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return !value ? "Name is required" : "";
    case "quantity":
      return !value || value <= 0
        ? "Quantity is required and cannot be zero"
        : "";
    case "rate":
      return !value || value <= 0 ? "Rate is required and cannot be zero" : "";
    case "purity":
      return !value ? "Purity is required" : "";
    case "weight":
      return !value || value <= 0
        ? "Weight is required and cannot be zero"
        : "";
    default:
      return "";
  }
};

export const validateModalForm = (data) => {
  const errors = {};

  if (!data) {
    return {
      name: "Name is required",
      quantity: "Quantity is required",
      purity: "Purity is required",
      weight: "Weight is required",
      rate: "Rate is required",
    };
  }

  if (!data.name) errors.name = "Name is required";
  if (!data.quantity || data.quantity <= 0)
    errors.quantity = "Quantity is required and cannot be zero";
  if (!data.purity) errors.purity = "Purity is required";
  if (!data.weight || data.weight <= 0)
    errors.weight = "Weight is required and cannot be zero";
  if (!data.rate || data.rate <= 0)
    errors.rate = "Rate is required and cannot be zero";

  return errors;
};
