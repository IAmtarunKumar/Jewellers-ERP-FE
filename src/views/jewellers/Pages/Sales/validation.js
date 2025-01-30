// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "customerId":
      return !value
        ? "Customer is required"
        : value === "Select"
        ? "Invalid option"
        : "";
    case "productId":
      return !value
        ? "Product is required"
        : value === "Select"
        ? "Invalid option"
        : "";
    case "quantity":
      return !value ? "Quantity is required" : "";
    case "purity":
      return !value
        ? "Purity is required"
        : value === "Select"
        ? "Invalid option"
        : "";
    case "weight":
      return !value ? "Weight is required" : "";
    default:
      return "";
  }
};

export const validateSales = (sales) => {
  const errors = {};

  if (!sales) {
    return {
      customerId: "Customer is required",
      productId: "Product is required",
      purity: "Purity is required",
      weight: "Weight is required",
      quantity: "Quantity is required",
    };
  }

  if (!sales.customerId || sales.customerId === "Select")
    errors.customerId = "Customer is required";
  if (!sales.productId || sales.productId === "Select")
    errors.productId = "Product is required";
  if (!sales.quantity) errors.quantity = "Quantity is required";
  if (!sales.weight) errors.weight = "Weight is required";
  if (!sales.purity || sales.purity === "Select")
    errors.purity = "Purity is required";

  return errors;
};
