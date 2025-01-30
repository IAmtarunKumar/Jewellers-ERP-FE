import { useEffect, useState } from "react";

const useEmpDetails = (url) => {
  const [empData, setEmpData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // // console.log(data);
      setEmpData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url]);
  return [empData];
};

export default useEmpDetails;
