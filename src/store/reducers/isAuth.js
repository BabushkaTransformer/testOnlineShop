const initialState = {
	isAuth: false,
};

const isAuth = (state = initialState, action) => {
	switch (action.type) {
		case "SET_AUTH":
			return {
				...state,
				isAuth: true,
			};
		default:
			return state;
	}
};

export default isAuth;
