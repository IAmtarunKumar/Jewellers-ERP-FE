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
  
  // Validate the entire isJobWork object
  export const validateJobWork = (isJobWork) => {
    const errors = {};
    if (!isJobWork) {
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
  
    if (!isJobWork.date) errors.date = "Date is required";
    if (!isJobWork.type || isJobWork.type === "Select")
      errors.type = "Type is required";
    if (!isJobWork.amount) errors.amount = "Amount is required";
    if (!isJobWork.receivedOrSent || isJobWork.receivedOrSent === "Select")
      errors.receivedOrSent = "An option is required";
    if (
      (!isJobWork.partyName || isJobWork.partyName === "Select") &&
      isJobWork.receivedOrSent !== "Own"
    )
      errors.partyName = "Name is required";
    if (!isJobWork.reference || isJobWork.reference === "Select")
      errors.reference = "Reference is required";
    // if (!isJobWork.referenceImage) errors.referenceImage = "Upload image of selected reference";
  
    return errors;
  };
  
  