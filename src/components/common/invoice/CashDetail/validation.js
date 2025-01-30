export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "amount":
      return !value || value <= 0
        ? "Amount is required and cannot be zero"
        : "";
    case "date":
      return !value ? "Date is required" : "";
    case "givenTo":
      return !value ? "Name is required" : "";
    default:
      return "";
  }
};

export const validateForm = (data) => {
  const errors = {};

  if (!data) {
    return {
      amount: "Amount is required",
      date: "Date is required",
      givenTo: "Name is required",
    };
  }
  if (!data.amount || errors.amount <= 0) errors.amount = "Amount is required";
  if (!data.givenTo) errors.givenTo = "Name is required";
  if (!data.date) errors.date = "Date is required";

  return errors;
};
