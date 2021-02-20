import { useEffect, useState } from "react";

const useScrollBottom = () => {
	const [isBottom, setIsBottom] = useState(false);
	useEffect(() => {
		const onScrollFunc = () => {
			const docHeight = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			);
			if (window.innerHeight + window.pageYOffset >= docHeight) {
				setIsBottom(true);
			}
		};

		window.addEventListener("scroll", onScrollFunc);
		return () => window.removeEventListener("scroll", onScrollFunc);
	}, []);
	return { isBottom, setIsBottom };
};

export default useScrollBottom;
