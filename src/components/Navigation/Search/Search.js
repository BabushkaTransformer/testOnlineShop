import classes from "./Search.module.scss";

const Search = (props) => {
	return (
		<div className={classes.Search}>
			<input
				type="text"
				placeholder="Ну же.."
				value={props.search}
				onChange={(e) => props.setSearch(e.target.value)}
			/>
		</div>
	);
};

export default Search;
