export const validateField = (fieldName, value, formData) => {
  switch (fieldName) {
    case "date":
      return !value ? "Date is required" : "";
    case "paymentDueDate":
      if (!value) {
        return "Date is required";
      } else if (
        formData &&
        formData.date &&
        new Date(value) < new Date(formData.date)
      ) {
        return "Payment due date cannot be before the selected date.";
      }
      return "";
    case "taxCategory":
      return !value ? "Tax category is required" : "";
    case "totalAdvance":
      return !value ? "Total advance is required" : "";
    // case "taxType":
    //   return !value ? "Please select a tax type." : "";
    case "paymentCash":
      return !value ? "Please select an option." : "";
    default:
      return "";
  }
};

export const validateFormData = (formData) => {
  const errors = {};

  if (!formData) {
    return {
      productName: "Product is required",
      paymentDueDate: "Date is required",
      taxCategory: "Tax category is required",
      totalAdvance: "Total advance is required",
      // taxType: "Tax type is required",
      paymentCash: "This is required",
    };
  }

  if (!formData.date) errors.date = "Date is required";
  if (!formData.paymentDueDate) errors.paymentDueDate = "Date is required";
  else if (
    formData.date &&
    new Date(formData.paymentDueDate) < new Date(formData.date)
  ) {
    errors.paymentDueDate =
      "Payment due date cannot be before the selected date.";
  }
  if (!formData.taxCategory) errors.taxCategory = "Tax category is required";
  // if (!formData.taxType) errors.taxType = "Tax type is required";
  if (!formData.paymentCash) errors.paymentCash = "This is required";
  if (!formData.totalAdvance) errors.totalAdvance = "Total advance is required";

  return errors;
};

export const validateModalField = (fieldName, value) => {
  switch (fieldName) {
    case "productName":
      return !value
        ? "Product name is required"
        : value === "Select"
        ? "Invalid option"
        : "";
    case "quantity":
      return !value || value <= 0
        ? "Quantity is required and cannot be zero"
        : "";
    case "rate":
      return !value || value <= 0 ? "Rate is required and cannot be zero" : "";
    case "purity":
      return !value ? "Purity is required" : "";
    case "weight":
      return !value || value <= 0
        ? "Weight is required and cannot be zero"
        : "";
    case "makingChargesGram":
      return !value || isNaN(value) || value <= 0
        ? "Making Charges Per Gram is required and cannot be zero"
        : "";
    case "makingChargesPercentage":
      return !value || isNaN(value) || value <= 0
        ? "Making Charges Percentage is required and cannot be zero"
        : "";
    case "makingCharges":
      return value === undefined || value === null || value === ""
        ? "Making Charges is required"
        : "";
    default:
      return "";
  }
};

export const validateModalForm = (data) => {
  const errors = {};

  if (!data) {
    return {
      productName: "Product name is required",
      quantity: "Quantity is required",
      purity: "Purity is required",
      weight: "Weight is required",
      rate: "Rate is required",
      makingCharges: "Making charges is required",
    };
  }

  if (!data.productName || data.productName === "Select")
    errors.productName = "Product name is required";
  if (!data.quantity || data.quantity <= 0)
    errors.quantity = "Quantity is required and cannot be zero";
  if (!data.purity) errors.purity = "Purity is required";
  if (
    data.makingCharges === undefined ||
    data.makingCharges === null ||
    data.makingCharges === ""
  )
    errors.makingCharges = "Making charges is required";
  if (
    data.makingCharges === 0 &&
    (!data.makingChargesGram ||
      isNaN(data.makingChargesGram) ||
      data.makingChargesGram <= 0)
  )
    errors.makingChargesGram =
      "Making Charges Per Gram is required and cannot be zero";
  if (
    data.makingCharges === 1 &&
    (!data.makingChargesPercentage ||
      isNaN(data.makingChargesPercentage) ||
      data.makingChargesPercentage <= 0)
  )
    errors.makingChargesPercentage =
      "Making Charges Percentage is required and cannot be zero";
  if (!data.weight || data.weight <= 0)
    errors.weight = "Weight is required and cannot be zero";
  if (!data.rate || data.rate <= 0)
    errors.rate = "Rate is required and cannot be zero";

  return errors;
};

export const validateTaxModalField = (fieldName, value) => {
  switch (fieldName) {
    case "taxBracket":
      if (!value) return "Tax Bracket is required";
      if (Number(value) > 40) return "You can select up to 40 only";
      return "";
    default:
      return "";
  }
};

export const validateTaxModalForm = (data) => {
  const errors = {};

  if (!data) {
    return {
      taxBracket: "Tax Bracket is required",
    };
  }
  if (!data.taxBracket) {
    errors.taxBracket = "Tax Bracket is required";
  } else if (Number(data.taxBracket) > 40) {
    errors.taxBracket = "You can select up to 40 only";
  }

  return errors;
};
