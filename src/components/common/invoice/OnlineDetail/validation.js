export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "amount":
      return !value || value <= 0
        ? "Amount is required and cannot be zero"
        : "";
    case "accountNo":
      return !value || value <= 0 ? "Enter a valid account number" : "";
    case "date":
      return !value ? "Date is required" : "";
    case "via":
      return !value ? "This is required" : "";
    case "tranId":
      return !value ? "Transaction Number is required" : "";
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
      accountNo: "Enter a valid account number",
      via: "This is required",
      tranId: "Transaction Number is required",
    };
  }
  if (!data.amount || errors.amount <= 0) errors.amount = "Amount is required";
  if (!data.accountNo || errors.accountNo <= 0)
    errors.accountNo = "Enter a valid account number";
  if (!data.via) errors.via = "This is required";
  if (!data.date) errors.date = "Date is required";
  if (!data.tranId) errors.tranId = "Transaction Number is required";

  return errors;
};
