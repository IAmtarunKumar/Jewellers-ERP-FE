import React from "react";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const FilterData = ({ tableData, setFilteredData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { darkTheme } = useContext(ThemeContext);
  useEffect(() => {
    filterData();
  }, [tableData, startDate, endDate]);

  const filterData = () => {
    if (startDate && endDate) {
      const filtered = tableData.filter(
        (dataItem) =>
          new Date(dataItem.date) >= startDate &&
          new Date(dataItem.date) <= endDate
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(tableData);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-between  mt-4 mx-4">
      <button
        type="button"
        className="btn btn text-white bg-erp"
        onClick={() => {
          window.history.back();
        }}
      >
        Back
      </button>
      <div className="d-flex align-items-center justify-content-between mr-3">
        <div>
          <label
            className={`${
              darkTheme ? "text-white" : " text-dark "
            } form-control-label d-block`}
          >
            From:{" "}
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            placeholderText="Start Date"
            className="form-control"
          />
        </div>
        <div className="ml-3">
          <label
            className={`${
              darkTheme ? "text-white" : " text-dark "
            } form-control-label d-block`}
          >
            To:{" "}
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            isClearable
            placeholderText="End Date"
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterData;
