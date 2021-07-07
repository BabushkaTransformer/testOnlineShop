import React, { useState } from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Authorization from "./containers/Authorization/Authorization";
import Main from "./containers/Main/Main";
import CardPage from "./containers/CardPage/CardPage";
import ChangeProduct from "./containers/ChangeProduct/ChangeProduct";
import { connect } from "react-redux";
import isAuth from "./store/actions/isAuth";

function App(props) {
	// фильтр
	const [search, setSearch] = useState("");
	const [products, setProducts] = useState([]);

	let filteredProducts = products.filter((product) => {
		return product.name.toLowerCase().includes(search.toLowerCase());
	});

	// проверка авторизован ли
	const token = sessionStorage.getItem("token");
	if (token) {
		props.setAuth();
	}

	return (
		<div className="App">
			<Navigation search={search} setSearch={setSearch} />

			<Switch>
				<Route
					path="/"
					exact
					render={() => (
						<Main setProducts={setProducts} filteredProducts={filteredProducts} />
					)}
				/>
				<Route path="/authorization" component={Authorization} />
				<Route path="/CardPage/:id" component={CardPage} />
				<Route
					path="/addProduct/"
					render={() => (props.isAuth ? <ChangeProduct adding /> : <Authorization />)}
				/>
				<Route
					path="/ChangeProduct/:id"
					component={props.isAuth ? ChangeProduct : Authorization}
				/>
			</Switch>
		</div>
	);
}

const mapStateToProps = (state) => ({
	isAuth: state.isAuth,
});
const mapDispatchToProps = (dispatch) => ({
	setAuth: () => dispatch(isAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
