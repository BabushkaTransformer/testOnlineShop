import React, { useState } from "react";
import classes from "./AddProduct.module.scss";
import axios from "axios";
import { useHistory } from "react-router";
import Spinner from "../../components/UI/Spinner/Spinner";

const AddProduct = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");

	const [loading, setLoading] = useState(false);

	const addProduct = () => {
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

	let inputs = (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<input
				value={amount}
				onChange={(e) => setAmount(Number(e.target.value))}
				type="number"
				name="amount"
				placeholder="amount"
				min="0"
			/>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				type="text"
				name="name"
				placeholder="name"
			/>
			<input
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				type="text"
				name="description"
				placeholder="description"
			/>
			<input
				value={price}
				onChange={(e) => setPrice(Number(e.target.value))}
				type="number"
				name="price"
				accept="image/png, image/jpeg"
				placeholder="price"
				min="0"
			/>
			<input
				onChange={(e) => setFile(e.target.files)}
				type="file"
				name="image[]"
				placeholder="file"
				multiple
			/>
		</div>
	);

	if (loading) inputs = <Spinner />;

	return (
		<div className={classes.Content}>
			<div className={classes.Slider}></div>

			<div
				className={classes.Description}
				style={{
					width: "500px",
					margin: "0 auto",
				}}
			>
				{inputs}
			</div>
			<button onClick={addProduct}>Отправить</button>
		</div>
	);
};

export default AddProduct;
