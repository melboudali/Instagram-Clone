import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import firstImage from "../../assets/images/d6bf0c928b5a.jpg";
import secondImage from "../../assets/images/6f03eb85463c.jpg";
import thirdImage from "../../assets/images/f0c687aa6ec2.jpg";
import forthImage from "../../assets/images/842fe5699220.jpg";

const ImagesContainer = styled.img<{ New: boolean; Old: boolean }>`
	height: 427px;
	left: 0;
	position: absolute;
	top: 0;
	width: 240px;
	margin: 99px 0 0 151px;
	opacity: 0;
	visibility: hidden;
	${({ New }) =>
		New &&
		`opacity: 1;
    visibility: visible;
    transition: opacity 1.5s ease-in;
    z-index: 2;`}
	${({ Old }) =>
		Old &&
		`opacity: 1;
    visibility: visible;`}
`;

const Carousel = () => {
	const [newImg, setNewImage] = useState<number>(1);
	const [oldImg, setOldImage] = useState<number>(4);

	useEffect(() => {
		const Slider = setInterval(() => {
			if (newImg < 5 - 1) {
				if (oldImg < 5 - 1) {
					setOldImage(oldImg + 1);
				} else {
					setOldImage(1);
				}
				setNewImage(newImg + 1);
			} else {
				setNewImage(1);
				setOldImage(4);
			}
		}, 5000);
		return () => clearInterval(Slider);
	}, [newImg, oldImg]);

	return (
		<Fragment>
			<ImagesContainer src={firstImage} alt={undefined} New={newImg === 1} Old={oldImg === 1} />
			<ImagesContainer src={secondImage} alt={undefined} New={newImg === 2} Old={oldImg === 2} />
			<ImagesContainer src={thirdImage} alt={undefined} New={newImg === 3} Old={oldImg === 3} />
			<ImagesContainer src={forthImage} alt={undefined} New={newImg === 4} Old={oldImg === 4} />
		</Fragment>
	);
};

export default Carousel;
