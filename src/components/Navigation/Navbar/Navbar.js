import Button from "../../UI/Button/Button";
import Cart from "../../../assets/images/icons/cart.png";
import Heart from "../../../assets/images/icons/heart.png";
import classes from "./Navbar.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
	const history = useHistory();

	const logOutHandler = () => {
		sessionStorage.clear();
		history.go(0);
	};

	return (
		<div className={classes.Navbar}>
			{props.isAuth ? (
				<div className={classes.Item} onClick={() => history.push("/addProduct")}>
					<img src={Cart} alt="" />
					Добавить товар
				</div>
			) : null}

			<div className={classes.Item}>
				<img src={Heart} alt="" />
				Избранное
			</div>
			{!props.isAuth ? (
				<NavLink to="/authorization">
					<Button>Войти</Button>
				</NavLink>
			) : (
				<Button clicked={logOutHandler}>Выйти</Button>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.isAuth,
});

export default connect(mapStateToProps)(Navbar);
