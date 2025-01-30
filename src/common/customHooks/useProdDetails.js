import axios from "axios";
import { useEffect, useState } from "react";

const useProdDetails = (url, productId) => {
  const [prodData, setProdData] = useState([]);
  console.log(productId);
  const fetchData = async () => {
    try {
      const response = await axios.post(url, { productId: productId });
      const data = await response.data;
      setProdData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, productId]);

  return [prodData];
};

export default useProdDetails;
