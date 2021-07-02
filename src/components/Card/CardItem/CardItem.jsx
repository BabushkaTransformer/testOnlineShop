import classes from "./CardItem.module.scss";
import noImg from "../../../assets/images/no-image.jpg";

const CardItem = (props) => {
	return (
		<a className={classes.CardItem} href={`/CardPage/${props.id}`}>
			<div className={classes.Image}>
				<img src={props.img ? props.img : noImg} alt="ыва" />
			</div>

			<div className={classes.Description}>
				<h3>{props.title}</h3>
				<span className={classes.Price}>{props.price}.</span>
				<p className={classes.Additional}>{props.desc}</p>
			</div>

			<div className={classes.Btn}>
				<div>В корзину</div>
			</div>
		</a>
	);
};

export default CardItem;
