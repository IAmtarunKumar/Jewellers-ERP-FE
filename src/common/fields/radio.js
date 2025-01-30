import { ThemeContext } from "common/context/themeContext";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";

const RadioButtonGroup = ({
  name,
  options,
  label,
  control,
  errors,
  onAdminChange,
  setPrivileges,
}) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <>
            <h3
              className={`${
                darkTheme ? " text-white" : " text-dark"
              } form-control-label`}
            >
              {label}
            </h3>
            <div className="d-flex mt-4 align-item-center">
              {options.map((option) => (
                <div key={option.value} className="mx-3">
                  <input
                    type="radio"
                    id={option.value}
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => {
                      onChange(option.value);
                      if (["yes", "no"].includes(option.value) && typeof onAdminChange === "function") {
                        onAdminChange(option.value);
                        setPrivileges((prev) => ({
                          ...prev,
                          read: true, // Check the read checkbox
                        }));
                      }
                    }}
                  />
                  <label htmlFor={option.value} className="mx-2">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors && errors[name] && (
              <p className="error-message">{errors[name].message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default RadioButtonGroup;
