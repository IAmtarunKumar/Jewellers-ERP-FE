// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "date":
      return !value ? "Date is required" : "";
    case "type":
      return !value
        ? "Type is required"
        : value === "Select"
          ? "Invalid option"
          : "";
    case "amount":
      return !value ? "Amount is required" : "";
    case "receivedOrSent":
      return !value
        ? "An option is required"
        : value === "Select"
          ? "Invalid option"
          : "";
    case "partyName":
      return !value
        ? "Name is required"
        : value === "Select"
          ? "Invalid option"
          : "";
    case "reference":
      return !value
        ? "Reference is required"
        : value === "Select"
          ? "Invalid option"
          : "";
    // case "referenceImage":
    //   return !value ? "Upload image of selected reference" : "";
    default:
      return "";
  }
};

// Validate the entire cashInHand object
export const validateCashInHand = (cashInHand) => {
  const errors = {};
  if (!cashInHand) {
    return {
      date: "Date is required",
      type: "Type is required",
      amount: "Amount is required",
      receivedOrSent: "An option is required",
      partyName: "Name is required",
      reference: "Reference is required",
      // referenceImage: "Upload image of selected reference",
    };
  }

  if (!cashInHand.date) errors.date = "Date is required";
  if (!cashInHand.type || cashInHand.type === "Select")
    errors.type = "Type is required";
  if (!cashInHand.amount) errors.amount = "Amount is required";
  if (!cashInHand.receivedOrSent || cashInHand.receivedOrSent === "Select")
    errors.receivedOrSent = "An option is required";
  if (
    (!cashInHand.partyName || cashInHand.partyName === "Select") &&
    cashInHand.receivedOrSent !== "Own"
  )
    errors.partyName = "Name is required";
  if (!cashInHand.reference || cashInHand.reference === "Select")
    errors.reference = "Reference is required";
  // if (!cashInHand.referenceImage) errors.referenceImage = "Upload image of selected reference";

  return errors;
};

export const validateEditField = (fieldName, value) => {
  switch (fieldName) {
    case "date":
      return !value ? "Date is required" : "";
    case "credit":
      return !value ? "Credit is required" : "";
    case "debit":
      return !value ? "Debit is required" : "";
    case "balance":
      return !value ? "Balance is required" : "";
    case "receivedBy":
      return !value ? "Name is required" : "";
    case "partyName":
      return !value ? "Name is required" : "";
    case "reference":
      return !value
        ? "Reference is required"
        : value === "Select"
          ? "Invalid option"
          : "";
    // case "referenceImage":
    //   return !value ? "Upload image of selected reference" : "";
    default:
      return "";
  }
};

export const validateEditCashInHand = (cashInHand) => {
  const errors = {};
  if (!cashInHand) {
    return {
      date: "Date is required",
      credit: "Credit is required",
      debit: "Debit is required",
      balance: "Balnce is required",
      receivedBy: "Name is required",
      partyName: "Name is required",
      reference: "Reference is required",
      // referenceImage: "Upload image of selected reference",
    };
  }

  if (!cashInHand.date) errors.date = "Date is required";
  if (!cashInHand.credit) errors.credit = "Credit is required";
  if (!cashInHand.debit) errors.debit = "Debit is required";

  if (!cashInHand.balance) errors.balance = "Balance is required";
  if (!cashInHand.receivedBy) errors.receivedBy = "Name is required";
  if (!cashInHand.givenTo) errors.givenTo = "Name is required";

  if (!cashInHand.reference || cashInHand.reference === "Select")
    errors.reference = "Reference is required";
  // if (!cashInHand.referenceImage) errors.referenceImage = "Upload image of selected reference";

  return errors;
};
