import React, { useState } from "react";
import "./Button.scss";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  label: string;
}

const CustomButton = ({label, ...others}: ButtonProps) => {
  const [count, setCount] = useState(2);
  const clickHandler = () => {
    setCount(count + 1);
  };

  return <button {...others} onClick={clickHandler}>{label} {count}</button>;
};

export default CustomButton;