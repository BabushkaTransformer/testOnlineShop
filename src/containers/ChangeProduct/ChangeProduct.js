import React, { useEffect, useState } from "react";
import classes from "./ChangeProduct.module.scss";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import noImg from "../../assets/images/no-image.jpg";

const AddProduct = ({ adding }) => {
	const history = useHistory();
	const { id } = useParams();

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (!adding) {
			setLoading(true);
			console.log("adsfa");
			axios
				.get(`http://35.198.170.4/api/products/${id}/`)
				.then((response) => {
					setName(response.data.name);
					setPrice(response.data.price);
					setAmount(response.data.amount);
					setDescription(response.data.description);
					setFile(response.data.image);
					setLoading(false);
				})
				.catch((error) => setLoading(false));
		} else {
			return null;
		}
	}, [id, adding]);

	// if we update prouduct===========================================
	const changeProductHandler = () => {
		setLoading(true);

		let token = localStorage.getItem("token");
		let img = file[0];
		let fd = new FormData();

		fd.append("name", name);
		fd.append("description", description);
		fd.append("amount", amount);
		fd.append("price", price);
		fd.append("image", img);

		const headers = {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: "Token " + token,
		};

		axios
			.put(`http://35.198.170.4/api/products/${id}/`, fd, {
				headers: headers,
			})
			.then((response) => {
				setLoading(false);
				history.push("/");
			})
			.catch((error) => {
				alert("Вы, походу, что-то забыли... (Изображение)");
				setLoading(false);
			});
	};

	// if we add new prouduct===========================================
	const addProductHandler = () => {
		setLoading(false);

		let token = localStorage.getItem("token");
		let img = file[0];
		let fd = new FormData();

		fd.append("name", name);
		fd.append("description", description);
		fd.append("amount", amount);
		fd.append("price", price);
		fd.append("image", img);

		const headers = {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: "Token " + token,
		};

		axios
			.post("http://35.198.170.4/api/products/", fd, {
				headers: headers,
			})
			.then((response) => {
				setLoading(false);
				history.push("/");
			})
			.catch((error) => {
				setLoading(false);
				alert("Не все поля заполнены (ну или фотку забыли загрузить");
			});
	};

	const uploadImage = (img) => {
		const upl = img[0];

		if (upl) {
			const reader = new FileReader();
			reader.onload = function () {
				const result = reader.result;
				document.querySelector("#banner-img").src = result;
			};
			reader.readAsDataURL(upl);
		}
	};

	let inputs = (
		<div className={classes.Inputs}>
			<h3>Название продукта</h3>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				type="text"
				name="name"
				placeholder="name"
			/>
			<h3>Описание продукта</h3>
			<input
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				type="text"
				name="description"
				placeholder="Описание продукта"
			/>
			<h3>Цена продукта</h3>
			<input
				value={price}
				onChange={(e) => setPrice(e.target.value)}
				type="number"
				name="price"
				placeholder="Цена продукта"
				min="0"
			/>
			<h3>Остаток продукта</h3>
			<input
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				type="number"
				name="amount"
				placeholder="Остаток продукта"
				min="0"
			/>
			{!adding ? (
				<Button onClick={changeProductHandler}>Сохранить изменения</Button>
			) : (
				<Button onClick={addProductHandler}>Добавить продукт</Button>
			)}
		</div>
	);

	if (loading) inputs = <Spinner />;

	return (
		<div className={classes.Content}>
			<div className={classes.Container}>
				<div className={classes.Image}>
					<img src={file ? file : noImg} alt="Загрузить изображение" id="banner-img" />
				</div>
				<input
					type="file"
					onChange={(e) => {
						setFile(e.target.files);
						uploadImage(e.target.files);
					}}
					id="image-upload"
					accept="image/png, image/jpeg"
					placeholder="Загрузить фото"
					multiple
					hidden
				/>
				<button onClick={() => document.querySelector("#image-upload").click()}>
					Загрузить фото
				</button>
			</div>

			<div className={classes.Description}>{inputs}</div>
		</div>
	);
};

export default AddProduct;
