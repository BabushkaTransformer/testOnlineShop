import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import classes from "./CardPage.module.scss";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import noImg from "../../assets/images/no-image.jpg";

import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Thumbs]);

const CardPage = () => {
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
		let token = localStorage.getItem("token");

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
					<button className={classes.Btn} onClick={deleteProductHandler}>
						Удалить продукт
					</button>
					<button className={classes.Btn}>В корзину</button>
				</div>
			</div>
			<div className={classes.Change}>
				<a href={`/ChangeProduct/${id}`}>
					<button className={classes.Btn}>Изменить</button>
				</a>
			</div>
		</div>
	);
};

export default CardPage;
