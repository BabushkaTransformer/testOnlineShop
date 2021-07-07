import axios from "axios";
import React, { Component } from "react";
import CardItems from "../../components/Card/CardItems/CardItems";
import Spinner from "../../components/UI/Spinner/Spinner";

class Main extends Component {
	state = {
		loading: false,
	};

	componentDidMount() {
		this.setState({ loading: true });

		axios
			.get("https://35.198.170.4/api/products/")
			.then((response) => {
				this.props.setProducts([...response.data]);
				this.setState({
					loading: false,
				});
			})
			.catch((error) => {
				this.setState({ loading: false });
				console.log(error);
			});
	}
	gete() {
		axios
			.get("https://35.198.170.4/api/products/")
			.then((response) => {
				this.props.setProducts([...response.data]);
				this.setState({
					loading: false,
				});
			})
			.catch((error) => {
				this.setState({ loading: false });
				console.log(error);
			});
	}
	render() {
		let items = (
			<CardItems products={this.props.filteredProducts} loading={this.state.loading} />
		);
		if (this.state.loading) items = <Spinner />;

		return (
			<div>
				{" "}
				<div onClick={gete}>df</div>
				{items}
			</div>
		);
	}
}

export default Main;
