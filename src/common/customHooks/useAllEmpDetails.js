import { useEffect, useState } from "react";

const useAllEmpDetails = (url, pending, setPending) => {
  const [empData, setEmpData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setEmpData(data);
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

  return { data:empData, refetchData: fetchData };
};

export default useAllEmpDetails;
