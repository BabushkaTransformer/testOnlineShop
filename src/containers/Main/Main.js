import axios from "axios";
import React, { Component } from "react";
import CardItems from "../../components/Card/CardItems/CardItems";

class Main extends Component {
	state = {
		loading: false,
	};

	componentDidMount() {
		this.setState({ loading: true });
		axios
			.get("http://35.198.170.4/api/products/")
			.then((response) => {
				this.props.setProducts([...response.data]);
				this.setState({
					loading: false,
				});
			})
			.catch((error) => this.setState({ loading: false }));
	}

	render() {
		return (
			<div>
				<CardItems products={this.props.filteredProducts} loading={this.state.loading} />
			</div>
		);
	}
}

export default Main;
