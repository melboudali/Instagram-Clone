import { useEffect, useState } from "react";

const useCarousel = () => {
	const [newImg, setNewImage] = useState<number>(1);
	const [oldImg, setOldImage] = useState<number>(4);

	useEffect(() => {
		const Slider = setInterval(() => {
			if (newImg < 4) {
				oldImg < 4 ? setOldImage(oldImg + 1) : setOldImage(1);
				setNewImage(newImg + 1);
			} else {
				setNewImage(1);
				setOldImage(4);
			}
		}, 5000);
		return () => clearInterval(Slider);
	}, [newImg, oldImg]);
	return { New: newImg, Old: oldImg };
};

export default useCarousel;
