import Button from "../../UI/Button/Button";
import Cart from "../../../assets/images/icons/cart.png";
import Heart from "../../../assets/images/icons/heart.png";
import classes from "./Navbar.module.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<div className={classes.Navbar}>
			<div className={classes.Item}>
				<img src={Cart} alt="" />
				Добавить товар
			</div>
			<div className={classes.Item}>
				<img src={Heart} alt="" />
				Избранное
			</div>
			<NavLink to="/authorization">
				<Button>Регистрация</Button>
			</NavLink>
		</div>
	);
};

export default Navbar;
