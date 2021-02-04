import { useEffect, useState } from "react";

const useClickOutside = (ref: React.RefObject<HTMLDivElement>) => {
	const [clickOutside, setClickOutside] = useState<boolean>(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node) && !clickOutside) {
				setClickOutside(true);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [clickOutside, ref]);

	return { clickOutside, setClickOutside };
};

export default useClickOutside;
