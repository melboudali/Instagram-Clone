import { Fragment } from "react";
import firstImage from "../../assets/images/d6bf0c928b5a.jpg";
import secondImage from "../../assets/images/6f03eb85463c.jpg";
import thirdImage from "../../assets/images/f0c687aa6ec2.jpg";
import forthImage from "../../assets/images/842fe5699220.jpg";
import styled from "styled-components";
import useCarousel from "../../hooks/useCarousel";

const ImagesContainer = styled.img<{ New: boolean; Old: boolean }>`
	width: 240px;
	height: 427px;
	left: 0;
	position: absolute;
	top: 0;
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
	const { New, Old } = useCarousel();

	return (
		<Fragment>
			<ImagesContainer src={firstImage} New={New === 1} Old={Old === 1} />
			<ImagesContainer src={secondImage} New={New === 2} Old={Old === 2} />
			<ImagesContainer src={thirdImage} New={New === 3} Old={Old === 3} />
			<ImagesContainer src={forthImage} New={New === 4} Old={Old === 4} />
		</Fragment>
	);
};

export default Carousel;
