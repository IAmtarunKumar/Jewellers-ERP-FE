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
  
  // Validate the entire isRawMaterial object
  export const validateRawMaterial = (isRawMaterial) => {
    const errors = {};
    if (!isRawMaterial) {
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
  
    if (!isRawMaterial.date) errors.date = "Date is required";
    if (!isRawMaterial.type || isRawMaterial.type === "Select")
      errors.type = "Type is required";
    if (!isRawMaterial.amount) errors.amount = "Amount is required";
    if (!isRawMaterial.receivedOrSent || isRawMaterial.receivedOrSent === "Select")
      errors.receivedOrSent = "An option is required";
    if (
      (!isRawMaterial.partyName || isRawMaterial.partyName === "Select") &&
      isRawMaterial.receivedOrSent !== "Own"
    )
      errors.partyName = "Name is required";
    if (!isRawMaterial.reference || isRawMaterial.reference === "Select")
      errors.reference = "Reference is required";
    // if (!isRawMaterial.referenceImage) errors.referenceImage = "Upload image of selected reference";
  
    return errors;
  };
  
  