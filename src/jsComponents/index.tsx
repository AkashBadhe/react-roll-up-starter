import ReactDOM from "react-dom";
import React from "react";
import { Button, Input } from "../components";

export const renderButton = (element: any) => {
  ReactDOM.render(<Button label="Submit" />, element);
};

export const renderInput = (element: any) => {
  ReactDOM.render(<Input />, element);
};
