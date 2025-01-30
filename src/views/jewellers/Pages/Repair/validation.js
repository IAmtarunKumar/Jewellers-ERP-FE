// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "repairCost":
      return !value ? "Repair cost is required" : "";
    case "customerId":
      return !value ? "Customer Id is required" : "";
    case "expectedReturnDate":
      return !value ? "Return date is required" : "";
    case "repairDate":
      return !value ? "Date is required" : "";
    case "productId":
      return !value ? "Product Id is required" : "";
    case "issueDescription":
      return !value ? "Description is required" : "";
    default:
      return "";
  }
};

export const validateRepair = (repair) => {
  const errors = {};

  if (!repair) {
    return {
      repairCost: "Repair cost is required",
      customerId: "Customer Id is required",
      expectedReturnDate: "Return date is required",
      repairDate: "Date is required",
      productId: "Product Id is required",
      issueDescription: "Description Id is required",
    };
  }

  if (!repair.repairCost) errors.repairCost = "Repair cost is required";
  if (!repair.customerId) errors.customerId = "Customer Id is required";
  if (!repair.expectedReturnDate)
    errors.expectedReturnDate = "Return date is required";
  if (!repair.repairDate) errors.repairDate = "Date is required";
  if (!repair.productId) errors.productId = "Product Id is required";
  if (!repair.issueDescription)
    errors.issueDescription = "Description is required";

  return errors;
};
