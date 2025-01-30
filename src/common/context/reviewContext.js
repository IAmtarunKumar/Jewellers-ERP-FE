import { createContext, useState } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [review, setReview] = useState(null);
  const fetchReview = async (email) => {
    const response = await fetch("https://jewellers-erp.onrender.com/reviewcrm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const responseData = await response.text();
    setReview(responseData);
    if (!response.ok) {
      // console.log(`HTTP error! status: ${response.status}`);
    }

  };
  return (
    <ReviewContext.Provider value={{ review, fetchReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
