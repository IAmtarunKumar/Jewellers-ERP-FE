import axios from "axios";
import { toastify } from "common/helpers/toast";
import { useEffect, useState, useCallback } from "react";

const useFetchData = (url, setPending, filter, type = null) => {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        const message = await response.text();

        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.data;
        // console.log(data);
        if (filter) {
          const dataTable = data.filter((res) => res.type === type);
          setTableData(dataTable);
          setPending(false);
        } else setTableData(data);
        setPending(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setPending(false);
    }
  };

  const refreshData = useCallback(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url, setPending, type, filter]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url, setPending, type, filter]);

  return [tableData, refreshData];
};

export default useFetchData;
