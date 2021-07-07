import Spinner from "../../UI/Spinner/Spinner.js";
import CardItem from "../CardItem/CardItem.jsx";
import classes from "./CardItems.module.scss";

const CardItems = (props) => {
	let transformedProducts = null;

	if (props.loading) {
		transformedProducts = <Spinner />;
	} else {
		transformedProducts = props.products.map((product) => {
			return (
				<CardItem
					key={product.id}
					id={product.id}
					img={product.image}
					price={product.price}
					title={product.name}
					desc={product.description}
				/>
			);
		});
	}

	return <div className={classes.CardItems}>{transformedProducts}</div>;
};

export default CardItems;
