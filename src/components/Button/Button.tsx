import React from "react";
import "./Button.scss";
import styled from 'styled-components';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  label: string;
}

const Button = styled.button`
  background: green;
  color: white;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
`;

const CustomButton = ({label, ...others}: ButtonProps) => {
  return <Button {...others}>{label}</Button>;
};

export default CustomButton;