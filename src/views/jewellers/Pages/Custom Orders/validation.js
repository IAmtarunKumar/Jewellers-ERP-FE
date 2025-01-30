// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "customerId":
      return !value ? "Customer is required" : "";
    case "productName":
      return !value ? "Product is required" : "";

    case "orderDate":
      return !value ? "Date is required" : "";
    case "completionDate":
      return !value ? "Date is required" : "";
    case "productDescription":
      return !value ? "Description is required" : "";
    default:
      return "";
  }
};

// Validate the entire custom order object
export const validateCustomOrder = (customOrder) => {
  const errors = {};

  if (!customOrder) {
    return {
      customerId: "Customer is required",
      productName: "Product is required",
      orderDate: "Email is required",
      completionDate: "Value is required",
      productDescription: "Date is required",
    };
  }

  if (!customOrder.customerId) errors.customerId = "Customer is required";
  if (!customOrder.productName) errors.productName = "Product is required";
  if (!customOrder.orderDate) errors.orderDate = "Date is required";
  if (!customOrder.completionDate) errors.completionDate = "Date is required";
  if (!customOrder.productDescription)
    errors.productDescription = "Description is required";

  return errors;
};

export const validateEditField = (fieldName, value) => {
  switch (fieldName) {
    case "customerId":
      return !value ? "Product Id is required" : "";
    case "orderDate":
      return !value ? "Order Date is required" : "";
    case "completionDate":
      return !value ? "Completion Date is required" : "";
    default:
      return "";
  }
};

export const validateEditCustomOrder = (customOrder) => {
  const errors = {};

  if (!customOrder.customerId) errors.customerId = "Product Id is required";
  if (!customOrder.orderDate) errors.orderDate = "Order Date is required";
  if (!customOrder.completionDate)
    errors.completionDate = "Completion Date is required";

  return errors;
};
