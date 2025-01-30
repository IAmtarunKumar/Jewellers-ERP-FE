import { useEffect, useState } from "react";

const useAllProdDetails = (url, pending, setPending) => {
  const [prodData, setProdData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProdData(data);
      setPending(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
      fetchData();
      // eslint-disable-next-line
  }, [url, pending, setPending]);

  return { data:prodData, refetchData: fetchData };
};

export default useAllProdDetails;
