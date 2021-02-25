import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const useSticky = (top: number) => {
	const [sticky, setSticky] = useState<boolean>(false);

	useEffect(() => {
		const onScrollFunc = () => {
			window.scrollY >= top ? setSticky(true) : setSticky(false);
		};
		window.addEventListener("scroll", onScrollFunc);
		return () => window.removeEventListener("scroll", onScrollFunc);
	}, [top]);
	return sticky;
};

useSticky.propTypes = {
	top: PropTypes.number.isRequired
};

export default useSticky;
