// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return !value ? "Name is required" : "";
    case "supplierId":
      return !value ? "Supplier is required" : "";
    case "type":
      return !value ? "Type is required" : "";
    case "weight":
      return !value || value <= 0 ? "Weight is required" : "";
    case "date":
      return !value ? "Date is required" : "";
    case "price":
      return !value || value <= 0 ? "Price is required" : "";
    case "description":
      return !value ? "Description is required" : "";
    case "paymentCash":
      return !value ? "Please select an option." : "";

    default:
      return "";
  }
};
export const validateEditField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return !value ? "Name is required" : "";
    case "type":
      return !value ? "Type is required" : "";
    case "currentWeight":
      return !value || value <= 0 ? "Current Weight is required" : "";
    case "lastStockDate":
      return !value ? "Date is required" : "";
    case "price":
      return !value || value <= 0 ? "Price is required" : "";
    case "description":
      return !value ? "Description is required" : "";
    default:
      return "";
  }
};

export const validateRawMaterial = (rawMaterial) => {
  const errors = {};

  if (!rawMaterial) {
    return {
      name: "Name is required",
      supplierId: "Supplier is required",
      type: "Type is required",
      weight: "Weight is required",

      date: "Date is required",
      paymentCash: "This is required",
      price: "Price Id is required",
      description: "Description Id is required",
    };
  }

  if (!rawMaterial.name) errors.name = "Name is required";
  if (!rawMaterial.supplierId) errors.supplierId = "Supplier is required";
  if (!rawMaterial.type) errors.type = "Type is required";
  if (!rawMaterial.weight || rawMaterial.weight <= 0)
    errors.weight = "Weight is required";
  if (!rawMaterial.date) errors.date = "Date is required";
  if (!rawMaterial.price || rawMaterial.price <= 0)
    errors.price = "Price is required";
  if (!rawMaterial.description) errors.description = "Description is required";
  if (!rawMaterial.paymentCash) errors.paymentCash = "This is required";
  return errors;
};
export const validateEditRawMaterial = (rawMaterial) => {
  const errors = {};

  if (!rawMaterial) {
    return {
      name: "Name is required",
      type: "Type is required",
      currentWeight: "Current Weight is required",
      lastStockDate: "Date is required",
      price: "Price Id is required",
      description: "Description Id is required",
    };
  }

  if (!rawMaterial.name) errors.name = "Name is required";
  if (!rawMaterial.type) errors.type = "Type is required";
  if (!rawMaterial.currentWeight || rawMaterial.currentWeight <= 0)
    errors.currentWeight = "Weight is required";
  if (!rawMaterial.lastStockDate) errors.lastStockDate = "Date is required";
  if (!rawMaterial.price || rawMaterial.price <= 0)
    errors.price = "Price is required";
  if (!rawMaterial.description) errors.description = "Description is required";

  return errors;
};
