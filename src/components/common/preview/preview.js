import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { entityConfig } from "./entityConfig";

const Preview = ({ title, entityType, data, darkTheme }) => (
  <Col md="4" className="d-lg-block d-none">
    <Card className={`${darkTheme ? "bg-dark-gray" : "bg-white"}`}>
      <CardHeader
        className={`${
          darkTheme ? "text-white" : "text-dark"
        } text-center display-5 bg-transparent`}
      >
        {title}
      </CardHeader>
      <CardBody className="d-flex flex-column">
        <Row>
          {Object.keys(entityConfig[entityType]).map((key, index) => (
            <Col xl="6" key={index}>
              <label
                className={`${
                  darkTheme ? " text-white" : " text-dark"
                } form-control-label`}
              >
                {entityConfig[entityType][key]}:
              </label>
              <p>{data[key]}</p>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  </Col>
);

export default Preview;
