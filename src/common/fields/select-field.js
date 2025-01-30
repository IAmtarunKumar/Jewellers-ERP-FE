import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import "./index.scss";
import { toastify } from "common/helpers/toast";
// import { designations } from "../constant/constant";

const SelectField = (props) => {
  const { errors, name = "", control } = props;
  const [designation, setDesignation] = useState([]);

  const handleCreateOption = async (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/employeeTypes/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOption),
        }
      );

      if (response.status !== 200) {
        const message = await response.text();
        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const message = await response.text();
        toastify({ msg: message, type: "success" });
        setDesignation([...designation, newOption]);
      }
    } catch (error) {
      console.error("Error adding new option:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jewellers-erp.onrender.com/employeeTypes/fetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        const message = await response.text();
        toastify({ msg: message, type: "error" });
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
        setDesignation(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mb-3">
      <Controller
        id={name}
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <>
            <CreatableSelect
              isClearable
              options={designation}
              value={designation.find((option) => option.value === value)}
              onChange={(selectedOption) => {
                onChange(selectedOption);
              }}
              onCreateOption={(inputValue) => {
                handleCreateOption(inputValue);
              }}
              className={` mb-2 ${errors[name] ? "error-input" : ""} `}
            />
            {errors && errors[name] && (
              <p className="error-message">{errors[name].message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SelectField;
