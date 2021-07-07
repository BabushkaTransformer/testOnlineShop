import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => (
	<button
		disabled={props.disabled}
		className={props.border ? classes.BorderButton : classes.Button}
		onClick={props.clicked}
		style={props.style}
	>
		{props.children}
	</button>
);

export default Button;
