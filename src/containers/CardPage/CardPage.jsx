import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import classes from "./CardPage.module.scss";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { connect } from "react-redux";
import noImg from "../../assets/images/no-image.jpg";
import Button from "../../components/UI/Button/Button";

import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Thumbs]);

const CardPage = (props) => {
	const history = useHistory();
	const { id } = useParams();
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [product, setProduct] = useState({});

	useEffect(() => {
		axios
			.get(`http://35.198.170.4/api/products/${id}/`)
			.then((response) => {
				setProduct(response.data);
			})
			.catch((error) => console.log(error));
	}, [id]);

	const deleteProductHandler = () => {
		let token = sessionStorage.getItem("token");

		const headers = {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: "Token " + token,
		};
		axios
			.delete(`http://35.198.170.4/api/products/${id}/`, {
				headers: headers,
			})
			.then((response) => {
				history.push("/");
			})
			.catch((error) => {
				alert("Что-то пошло не так");
			});
	};

	let slides = [];
	for (let i = 0; i < 5; i++) {
		slides.push(
			<SwiperSlide key={i}>
				<img src={product.image ? product.image : noImg} alt={`Слайд ${i}`} />
			</SwiperSlide>
		);
	}

	return (
		<div className={classes.Content}>
			<div className={classes.Slider}>
				<Swiper
					className={classes.Swiper}
					id="main"
					tag="section"
					wrapperTag="ul"
					navigation
					slidesPerView={1}
					thumbs={{ swiper: thumbsSwiper }}
				>
					{slides}
				</Swiper>
				<Swiper id="thimbs" spaceBetween={5} slidesPerView={5} onSwiper={setThumbsSwiper}>
					{slides}
				</Swiper>
			</div>

			<div className={classes.Description}>
				<div>
					<h1 className="title">{product.name}</h1>
					<p className="text">{product.description}</p>
				</div>

				<div className={classes.Actions}>
					{props.isAuth ? (
						<Button border clicked={deleteProductHandler}>
							Удалить продукт
						</Button>
					) : null}

					<Button border>В корзину</Button>
				</div>
			</div>
			<div className={classes.Change}>
				{props.isAuth ? (
					<div onClick={() => history.push(`/changeProduct/${id}`)}>
						<Button border>Изменить</Button>
					</div>
				) : null}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuth: state.isAuth,
});

export default connect(mapStateToProps)(CardPage);
