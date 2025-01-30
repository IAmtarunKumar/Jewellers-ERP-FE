import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import zxcvbn from "zxcvbn";
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { getColorByStrength } from "common/constant/constant";
import { getTextByStrength } from "common/constant/constant";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";

const InputField = (props) => {
  const {
    name,
    control,
    type = "text",
    errors = {},
    placeholder,
    iconClassName,
    isPassword,
    maxlength = 100,
    height,
    readOnly = false,
  } = props;
  const { darkTheme } = useContext(ThemeContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const { pathname } = useLocation();
  const handlePasswordChange = (value, onChange) => {
    const result = zxcvbn(value);
    setPasswordStrength(result.score);
    onChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormGroup>
          <InputGroup
            className={`input-group-alternative mb-3 ${
              errors[name] ? "error-input" : ""
            } `}
          >
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={iconClassName} />
              </InputGroupText>
            </InputGroupAddon>
            <div style={{ position: "relative", flex: "1" }}>
              <Input
                type={isPasswordVisible ? "text" : type}
                value={value || ""}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={(e) => {
                  isPassword
                    ? handlePasswordChange(e.target.value, onChange)
                    : onChange(e.target.value);
                }}
                maxLength={maxlength}
                style={{ height: height }}
              />
              {isPassword && (
                <div
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {isPasswordVisible ? (
                    <AiOutlineEyeInvisible color="black" />
                  ) : (
                    <AiOutlineEye color="black" />
                  )}
                </div>
              )}
            </div>
          </InputGroup>
          {errors[name] && (
            <p className="error-message">{errors[name]?.message}</p>
          )}
          {isPassword && pathname === "/auth/register" && (
            <div className="text-muted font-italic">
              <small className={`${darkTheme ? "text-white" : " text-dark"} `}>
                password strength:{" "}
                <span
                  className={`font-weight-700 ${getColorByStrength(
                    passwordStrength
                  )}`}
                >
                  {getTextByStrength(passwordStrength)}
                </span>
              </small>
            </div>
          )}
        </FormGroup>
      )}
    />
  );
};

export default InputField;
