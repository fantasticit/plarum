import React from "react";
import logo from "../assets/logo.png";

type Props = {
  style?: object;
  h1Style?: object;
};

export const Logo: React.FC<Props> = (props: Props) => (
  <div className="logo" style={props.style}>
    <img src={logo} alt="" />
    <h1 style={props.h1Style}>Plarum</h1>
  </div>
);
