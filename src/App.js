import React, { useState } from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Authorization from "./containers/Authorization/Authorization";
import Main from "./containers/Main/Main";
import CardPage from "./containers/CardPage/CardPage";
import ChangeProduct from "./containers/ChangeProduct/ChangeProduct";

function App() {
	const [search, setSearch] = useState("");
	const [products, setProducts] = useState([]);

	let filteredProducts = products.filter((product) => {
		return product.name.toLowerCase().includes(search.toLowerCase());
	});

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
				<Route path="/addProduct/" render={() => <ChangeProduct adding />} />
				<Route path="/ChangeProduct/:id" component={ChangeProduct} />
			</Switch>
		</div>
	);
}

export default App;
