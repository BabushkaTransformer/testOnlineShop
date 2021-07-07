import React from "react";
import { useHistory } from "react-router";
import logo from "../../../assets/images/logo.png";
import classes from "./Logo.module.scss";

const Logo = (props) => {
	const history = useHistory();

	return (
		<div
			className={classes.Logo}
			style={{ height: props.height }}
			onClick={() => history.push("/")}
		>
			<img src={logo} alt="burgerLogo" />
		</div>
	);
};

export default Logo;
