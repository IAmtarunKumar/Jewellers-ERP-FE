import axios from "axios";
import { useEffect, useState } from "react";

const useCustomerData = (url, customerId) => {
  const [cusData, setCusData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post(url, { customerId: customerId });
      const data = await response.data;
      setCusData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, customerId]);
  
  return [cusData];
};

export default useCustomerData;
