import classes from "./CardItem.module.scss";
import noImg from "../../../assets/images/no-image.jpg";
import { useHistory } from "react-router";

const CardItem = (props) => {
	const history = useHistory();

	return (
		<div className={classes.CardItem} onClick={() => history.push(`/CardPage/${props.id}`)}>
			<div className={classes.Image}>
				<img src={props.img ? props.img : noImg} alt={props.title} />
			</div>

			<div className={classes.Description}>
				<h3>{props.title}</h3>
				<span className={classes.Price}>{props.price}.</span>
				<p className={classes.Additional}>{props.desc}</p>
			</div>

			<div className={classes.Btn}>
				<span>В корзину</span>
			</div>
		</div>
	);
};

export default CardItem;
