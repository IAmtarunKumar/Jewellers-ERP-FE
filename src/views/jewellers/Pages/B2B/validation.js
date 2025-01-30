const phoneRegex = /^\d{10}$/;

// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return !value ? " Name is required" : "";
    case "contact":
      if (!value) return "Contact is required";
      if (!phoneRegex.test(value)) return "Invalid contact number";
      return "";
    case "address":
      return !value ? "Address is required" : "";
    default:
      return "";
  }
};

// Validate the entire B2B object
export const validateB2B = (B2B) => {
  const errors = {};

  if (!B2B) {
    return {
      name: "Name is required",
      contact: "Contact is required",
      address: "Address is required",
    };
  }

  const contactError = validateField("contact", B2B.contact);
  if (contactError) errors.contact = contactError;

  if (!B2B.name) errors.name = "Name is required";
  if (!B2B.address) errors.address = "Address is required";

  return errors;
};

export const validateModalField = (fieldName, value, date) => {
  const currentDate = new Date();

  switch (fieldName) {
    case "date":
      if (!value) return "Date is required";
      const inputDate = new Date(value);
      if (inputDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        return "Cannot select a previous date";
      }
      return "";

    case "time":
      if (!value) return "Time is required";

      const inputDateTime = new Date(date + "T" + value + ":00");
      if (inputDateTime < currentDate) {
        return "Cannot select a previous time";
      }
      return "";

    case "meetingTopic":
      return !value ? "Meeting Topic is required" : "";

    default:
      return "";
  }
};

export const validateModalData = (B2B) => {
  const errors = {};

  if (!B2B) {
    return {
      date: "Date is required",
      time: "Time is required",
      description: "Description is required",
    };
  }

  const dateError = validateModalField("date", B2B.date);
  if (dateError) errors.date = dateError;

  const timeError = validateModalField("time", B2B.time, B2B.date);
  if (timeError) errors.time = timeError;

  if (!B2B.meetingTopic) errors.meetingTopic = "Meeting Topic is required";

  return errors;
};

