import React from "react";
import logo from "../../../assets/images/logo.png";
import classes from "./Logo.module.scss";

const Logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<img src={logo} alt="burgerLogo" />
	</div>
);

export default Logo;
