import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";
import Search from "./Search/Search";

import classes from "./Navigation.module.scss";

const Navigation = (props) => {
	return (
		<header className={classes.Header}>
			<div className={classes.Container}>
				<Logo />
				<Search setSearch={props.setSearch} search={props.search} />
				<Navbar />
			</div>
		</header>
	);
};

export default Navigation;
