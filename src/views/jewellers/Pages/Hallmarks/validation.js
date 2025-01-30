// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "hallmarkCenterId":
      return !value
        ? "HallMark Center is required"
        : value === "Select"
        ? "Invalid option"
        : "";
    case "productId":
      return !value
        ? "Product is required"
        : value === "Select"
        ? "Invalid option"
        : "";
    case "hallmarkDate":
      return !value ? "Hallmark Date is required" : "";
    default:
      return "";
  }
};

export const validateHallMark = (hallMark) => {
  const errors = {};

  if (!hallMark) {
    return {
      hallmarkCenterId: "HallMark Center is required",
      productId: "Product is required",
      hallmarkDate: "Hall Mark Date is required",
    };
  }

  if (!hallMark.hallmarkCenterId || hallMark.hallmarkCenterId === "Select")
    errors.hallmarkCenterId = "HallMark Center is required";
  if (!hallMark.productId || hallMark.productId === "Select")
    errors.productId = "Product is required";
  if (!hallMark.hallmarkDate)
    errors.hallmarkDate = "Hall Mark Date is required";

  return errors;
};
