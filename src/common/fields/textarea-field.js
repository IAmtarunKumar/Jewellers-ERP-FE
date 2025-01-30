import React from "react";
import { Controller } from "react-hook-form";
import { FormGroup } from "reactstrap";

const TextAreaField = (props) => {
  const { name, control, errors = {}, placeholder } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormGroup>
          <textarea
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-control desc ${errors[name] ? "error-input" : ""}`}
          />
          {errors[name] && (
            <p className="error-message">{errors[name]?.message}</p>
          )}
        </FormGroup>
      )}
    />
  );
};
export default TextAreaField;