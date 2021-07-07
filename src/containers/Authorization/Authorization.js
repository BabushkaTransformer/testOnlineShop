import React, { Component } from "react";
import axios from "axios";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Authorization.module.scss";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import isAuth from "../../store/actions/isAuth";

class Authorization extends Component {
	state = {
		Form: {
			username: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Логин",
				},
				value: "",
				validation: {
					required: true,
					minLength: 3,
				},
				valid: false,
				touched: false,
			},

			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Пароль",
					suggested: "current-password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 4,
				},
				valid: false,
				touched: false,
			},
		},
		formIsValid: false,
		loading: false,
	};

	authorizationHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		const formData = {};
		for (let formElementIdentifier in this.state.Form) {
			formData[formElementIdentifier] = this.state.Form[formElementIdentifier].value;
		}

		axios
			.post("http://35.198.170.4/accounts/login/", formData)
			.then((response) => {
				if (response.data.token && response.data.token.length > 10) {
					this.props.setAuth();
					sessionStorage.setItem("token", response.data.token);
				}
				this.setState({ loading: false });
				this.props.history.push("/");
			})
			.catch((error) => {
				alert("Неверный логин и пароль! adminadminadmin");
				this.setState({ loading: false });
			});
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		if (rules.isEmail) {
			const pattern =
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}
		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = {
			...this.state.Form,
		};
		const updatedFormElement = {
			...updatedForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({ Form: updatedForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.Form) {
			formElementsArray.push({
				id: key,
				config: this.state.Form[key],
			});
		}
		let form = (
			<form onSubmit={this.authorizationHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}

				<Button disabled={!this.state.formIsValid} style={{ marginTop: "20px" }}>
					Войти
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.Authorization}>
				<h1 style={{ textAlign: "center" }}>
					Для дальнейшей работы, пожалуйста, зарегайся{" "}
					<p>(Тсс.. логин: admin, пароль: admin)</p>
				</h1>
				{form}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setAuth: () => dispatch(isAuth()),
});

export default connect(null, mapDispatchToProps)(Authorization);
