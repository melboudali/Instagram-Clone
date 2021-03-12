import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const UseScrollTop = () => {
	const history = useHistory();
	useEffect(() =>
		history.listen(() => {
			window.scrollTo(0, 0);
		})
	);
	return null;
};

export default UseScrollTop;