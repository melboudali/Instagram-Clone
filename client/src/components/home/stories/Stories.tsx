import { useRef, useState } from "react";
import styled from "styled-components";
import Story from "./Story";
import Assets from "../../../assets/images/798b49104da7.png";
import versace from "../../../assets/images/versace.jpg";
import voguemagazine from "../../../assets/images/voguemagazine.jpg";
import pullandbear from "../../../assets/images/pullandbear.jpg";
import porsche from "../../../assets/images/porsche.jpg";
import mercedes from "../../../assets/images/mercedes.jpg";
import louisvuitton from "../../../assets/images/louisvuitton.jpg";
import lamborghini from "../../../assets/images/lamborghini.jpg";
import dolcegabbana from "../../../assets/images/dolcegabbana.jpg";
import dior from "../../../assets/images/dior.jpg";
import chanelofficial from "../../../assets/images/chanelofficial.jpg";
import ferrari from "../../../assets/images/ferrari.jpg";

const StoriesContainer = styled.div`
	position: relative;
	height: 116px;
	background-color: var(--whiteColor);
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	margin: 24px 0;
	overflow: hidden;
`;

const StoriesMain = styled.div<{ translateValue: number }>`
	height: 100%;
	width: fit-content;
	display: flex;
	flex-grow: 1;
	align-items: center;
	transform: ${({ translateValue }) => `translateX(-${translateValue}px)`};
	transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const NextButton = styled.button`
	right: 0;
	justify-self: center;
	padding: 16px 8px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
`;

const NextClickable = styled.div`
	height: 45px;
	width: 45px;
	background-image: url(${Assets});
	background-repeat: no-repeat;
	background-position: -294px -273px;
`;

const PrevButton = styled.button`
	left: 0;
	justify-self: center;
	padding: 16px 8px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
`;

const PrevClickable = styled.div`
	height: 45px;
	width: 45px;
	background-image: url(${Assets});
	background-repeat: no-repeat;
	background-position: -294px -226px;
`;

const Stories = () => {
	const storiesData: { name: string; image: string }[] = [
		{
			name: "versace",
			image: versace
		},
		{
			name: "ferrari",
			image: ferrari
		},
		{
			name: "lamborghini",
			image: lamborghini
		},
		{
			name: "pullandbear",
			image: pullandbear
		},
		{
			name: "porsche",
			image: porsche
		},
		{
			name: "dior",
			image: dior
		},
		{
			name: "louisvuitton",
			image: louisvuitton
		},
		{
			name: "voguemagazine",
			image: voguemagazine
		},
		{
			name: "chanelofficial",
			image: chanelofficial
		},
		{
			name: "mercedes",
			image: mercedes
		},
		{
			name: "dolcegabbana",
			image: dolcegabbana
		},
		{
			name: "versace",
			image: versace
		},
		{
			name: "ferrari",
			image: ferrari
		},
		{
			name: "lamborghini",
			image: lamborghini
		},
		{
			name: "pullandbear",
			image: pullandbear
		},
		{
			name: "porsche",
			image: porsche
		},
		{
			name: "dior",
			image: dior
		},
		{
			name: "louisvuitton",
			image: louisvuitton
		},
		{
			name: "voguemagazine",
			image: voguemagazine
		},
		{
			name: "chanelofficial",
			image: chanelofficial
		},
		{
			name: "mercedes",
			image: mercedes
		},
		{
			name: "dolcegabbana",
			image: dolcegabbana
		}
	];

	const sliderRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const slideBy = useRef(4);
	const currentIndex = useRef(0);
	const leftItems = useRef(storiesData.length);

	const [translateValue, setTranslateValue] = useState(0);

	const [slideButtons, setSlideButtons] = useState({
		leftButton: false,
		rightButton: true
	});

	const slideRight = () => {
		if (currentIndex.current < leftItems.current / slideBy.current) {
			currentIndex.current += slideBy.current;
			leftItems.current -= slideBy.current;
			setTranslateValue(currentIndex.current * 88);
			setSlideButtons({ ...slideButtons, leftButton: true });
		} else {
			currentIndex.current += slideBy.current;
			leftItems.current = 0;
			setTranslateValue(sliderRef.current!.clientWidth! - containerRef.current!.clientWidth!);
			setSlideButtons({ ...slideButtons, rightButton: false });
		}
	};

	const slideLeft = () => {
		if (currentIndex.current > slideBy.current) {
			currentIndex.current -= slideBy.current;
			leftItems.current += slideBy.current;
			setTranslateValue(currentIndex.current * 88);
			setSlideButtons({ ...slideButtons, rightButton: true });
		} else {
			currentIndex.current = 0;
			leftItems.current = storiesData.length;
			setTranslateValue(0);
			setSlideButtons({ ...slideButtons, leftButton: false });
		}
	};

	return (
		<StoriesContainer ref={containerRef}>
			<StoriesMain translateValue={translateValue} ref={sliderRef}>
				{storiesData.map(({ name, image }, i) => (
					<Story key={i} name={name} image={image} />
				))}
			</StoriesMain>
			{slideButtons.leftButton && (
				<PrevButton type="button">
					<PrevClickable onClick={slideLeft} />
				</PrevButton>
			)}
			{slideButtons.rightButton && (
				<NextButton type="button">
					<NextClickable onClick={slideRight} />
				</NextButton>
			)}
		</StoriesContainer>
	);
};

export default Stories;
