import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "common/fields/input-field";
import SelectField from "common/fields/select-field";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { addEmployee } from "./validation";
import { toastify } from "common/helpers/toast";
import axios from "axios";
import { ThemeContext } from "common/context/themeContext";
import { useContext } from "react";
import RadioButtonGroup from "common/fields/radio";
import { useEffect } from "react";

const UpsertEmp = ({ refreshData, toggleModal }) => {
  const { darkTheme } = useContext(ThemeContext);
  const [adminValue, setAdminValue] = useState(null);
  const [privileges, setPrivileges] = useState({
    read: false,
    edit: false,
    create: false,
    delete: false,
    print: false,
  });

  const radioOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(addEmployee),
  });
  const areCheckboxesDisabled = adminValue === "yes";
  const isDisabled = Object.keys(errors).length > 0;

  useEffect(() => {
    if (adminValue === "yes") {
      setPrivileges({
        read: true,
        edit: true,
        create: true,
        delete: true,
        print: true,
      });
    } else if (adminValue === "no") {
      setPrivileges(prev => ({
        ...prev,
        read: true, 
        edit: false,
        create: false,
        delete: false,
        print: false,
      }));
    }
  }, [adminValue]);

  const onSubmit = async (data) => {
    const body = {
      ...data,
      designation: data.designation.value,
      privileges,
    };
    console.log(body);
    try {
      const response = await axios.post(
        "https://jewellers-erp.onrender.com/users/addOne",
        // "https://jewellers-erp.onrender.com/users/addOne",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("responsetaht came", response);
      const responseData = await response;
      if (responseData.status === 400) {
        const error = await response.json();
        toastify({ msg: error.error, type: "error" });
      } else if (responseData.status === 200) {
        toastify({ msg: "Sign Up Successful", type: "success" });
        refreshData();
        toggleModal();
        reset();
        setPrivileges({
          read: false,
          write: false,
          create: false,
          delete: false,
        });
      }
    } catch (error) {
      toastify({ msg: error, type: "error" });
      console.error("Error:", error);
    }
  };

  return (
    <Form role="form" onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="name"
              >
                Employee Name:
              </label>
              <InputField
                control={control}
                name="name"
                placeholder="Name"
                iconClassName="ni ni-hat-3"
                errors={errors}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="mobile"
              >
                Contact:
              </label>
              <InputField
                control={control}
                name="mobile"
                placeholder="Enter contact number"
                iconClassName="ni ni-mobile-button"
                errors={errors}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FormGroup>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
                htmlFor="email"
              >
                Email:
              </label>
              <InputField
                control={control}
                name="email"
                placeholder="Enter email"
                iconClassName="ni ni-email-83"
                errors={errors}
              />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <label
              className={`${
                darkTheme ? " text-white" : " text-dark"
              } form-control-label`}
            >
              Password
            </label>
            <InputField
              control={control}
              name="password"
              placeholder="Password"
              iconClassName="ni ni-lock-circle-open"
              errors={errors}
              isPassword={true}
              type="password"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <label
              className={`${
                darkTheme ? " text-white" : " text-dark"
              } form-control-label`}
              htmlFor="designation"
            >
              Designation:
            </label>
            <SelectField
              control={control}
              name="designation"
              errors={errors}
              placeholder="Designation"
              iconClassName="fa-solid fa-user"
            />
          </Col>
          <Col lg={6}>
            <RadioButtonGroup
              name="admin"
              control={control}
              options={radioOptions}
              label="Admin Ability:"
              errors={errors}
              setPrivileges={setPrivileges}
              onAdminChange={setAdminValue}
            />
          </Col>
        </Row>
        <label
          className={`${
            darkTheme ? " text-white" : " text-dark"
          } form-control-label`}
          htmlFor="designation"
        >
          Employee privilege:
        </label>
        <table className="w-100 ">
          <thead >
            <tr className="d-flex justify-content-between align-items-center">
              <th>Read</th>
              <th>Create</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            <tr className="d-flex justify-content-between align-items-center">
              <td >
                <input
                  type="checkbox"
                  name="read"
                  checked={privileges.read}
                  onChange={(e) =>
                    setPrivileges((prev) => ({
                      ...prev,
                      read: e.target.checked,
                    }))
                  }
                  disabled={areCheckboxesDisabled}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="create"
                  checked={privileges.create}
                  onChange={(e) =>
                    setPrivileges((prev) => ({
                      ...prev,
                      create: e.target.checked,
                    }))
                  }
                  disabled={areCheckboxesDisabled}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="edit"
                  checked={privileges.edit}
                  onChange={(e) =>
                    setPrivileges((prev) => ({
                      ...prev,
                      edit: e.target.checked,
                    }))
                  }
                  disabled={areCheckboxesDisabled}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="delete"
                  checked={privileges.delete}
                  onChange={(e) =>
                    setPrivileges((prev) => ({
                      ...prev,
                      delete: e.target.checked,
                    }))
                  }
                  disabled={areCheckboxesDisabled}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name="print"
                  checked={privileges.print}
                  onChange={(e) =>
                    setPrivileges((prev) => ({
                      ...prev,
                      print: e.target.checked,
                    }))
                  }
                  disabled={areCheckboxesDisabled}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
      <div className="text-right">
        <Button
          className="mt-4"
          color="primary"
          type="submit"
          disabled={isDisabled}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};
export default UpsertEmp;
