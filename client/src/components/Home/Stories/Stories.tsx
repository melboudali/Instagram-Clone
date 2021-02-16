import { useRef, useState } from "react";
import styled from "styled-components";
import Story from "./Story";
import Assets from "../../../assets/images/798b49104da7.png";

const Container = styled.div`
	position: relative;
	height: 116px;
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin: 24px 0;
	overflow: hidden;
`;

const Main = styled.div<{ translateValue: number }>`
	height: 100%;
	width: fit-content;
	display: flex;
	flex-grow: 1;
	align-items: center;
	transform: ${({ translateValue }) => `translateX(-${translateValue}px)`};
	transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
`;

const NextBtn = styled.button`
	right: 0;
	cursor: pointer;
	background: 0 0;
	border: 0;
	justify-self: center;
	outline: 0;
	padding: 16px 8px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
`;

const Next = styled.div`
	height: 45px;
	width: 45px;
	background-image: url(${Assets});
	background-repeat: no-repeat;
	background-position: -294px -273px;
`;

const PrevBtn = styled.button`
	left: 0;
	cursor: pointer;
	padding: 0;
	background: 0 0;
	border: 0;
	justify-self: center;
	outline: 0;
	padding: 16px 8px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
`;

const Prev = styled.div`
	height: 45px;
	width: 45px;
	background-image: url(${Assets});
	background-repeat: no-repeat;
	background-position: -294px -226px;
`;

const Stories = () => {
	const StoriesData: { name: string; image: string }[] = [
		{
			name: "versace",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=y1sPy_l3b7UAX9qQEj6&tp=1&oh=fe58de46cd50c7828d9177fecfbee1dd&oe=6052067B"
		},
		{
			name: "ferrari",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/13256976_998954483525291_2088181491_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=8Pggkl5ZMUMAX8XzVOE&tp=1&oh=10d2642a8e598547ca932194ed93915e&oe=6057576C"
		},
		{
			name: "lamborghini",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/10914351_445156875637393_373836994_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=oNc9mQeUYdYAX89Yghr&oh=b937faf56b7b4e9cb071005e821afb14&oe=6054036C"
		},
		{
			name: "pullandbear",
			image:
				"https://instagram.fcmn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/147677253_1420137645006770_8729859082877570250_n.jpg?_nc_ht=instagram.fcmn2-1.fna.fbcdn.net&_nc_ohc=3o8654UPCq0AX9D0sPg&tp=1&oh=abe1f83dd418a582185037f030e3f802&oe=604D9455"
		},
		{
			name: "porsche",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/72477687_2436503716627621_3330394547002802176_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=NHuzxocQPAYAX99oa_6&tp=1&oh=49af85b3b0018818ff5aabdb98bf6db0&oe=60517848"
		},
		{
			name: "dior",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/42633985_1927008894059358_8334422696888631296_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=gJ38AXys7vsAX-nlQZt&tp=1&oh=7d89efb4147ec9827b0fc136d1cff885&oe=6054B770"
		},
		{
			name: "louisvuitton",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/914335_653223868059486_1434031198_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=nJbyF-z95BQAX_8EP27&oh=c7e142399119708370470c160f676d00&oe=6051EBC6"
		},
		{
			name: "voguemagazine",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=utGkHfH2D38AX-wRQpr&tp=1&oh=7f04793190ea7693a64ddaa404ac82a3&oe=60515AC0"
		},
		{
			name: "chanelofficial",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/66505567_684858381987599_4049279537282809856_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=Tr8raHRvQXUAX_6TYO9&tp=1&oh=771c70bf057f6b353a83eb161fe28878&oe=60568A62"
		},
		{
			name: "mercedes",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=ujFqrl_VzjwAX_ALIHn&tp=1&oh=11e2aa56644d3e1eca0da5bb2c079ae9&oe=6052145C"
		},
		{
			name: "dolcegabbana",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=Ne33IpHXqVEAX-wDfPm&tp=1&oh=ab2fae4f93c2624696fd23da9b60dbce&oe=60517D59"
		},
		{
			name: "versace",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/64887406_2419362201457012_4649003460253974528_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=y1sPy_l3b7UAX9qQEj6&tp=1&oh=fe58de46cd50c7828d9177fecfbee1dd&oe=6052067B"
		},
		{
			name: "ferrari",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/13256976_998954483525291_2088181491_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=8Pggkl5ZMUMAX8XzVOE&tp=1&oh=10d2642a8e598547ca932194ed93915e&oe=6057576C"
		},
		{
			name: "lamborghini",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/10914351_445156875637393_373836994_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=oNc9mQeUYdYAX89Yghr&oh=b937faf56b7b4e9cb071005e821afb14&oe=6054036C"
		},
		{
			name: "pullandbear",
			image:
				"https://instagram.fcmn2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/147677253_1420137645006770_8729859082877570250_n.jpg?_nc_ht=instagram.fcmn2-1.fna.fbcdn.net&_nc_ohc=3o8654UPCq0AX9D0sPg&tp=1&oh=abe1f83dd418a582185037f030e3f802&oe=604D9455"
		},
		{
			name: "porsche",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/72477687_2436503716627621_3330394547002802176_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=NHuzxocQPAYAX99oa_6&tp=1&oh=49af85b3b0018818ff5aabdb98bf6db0&oe=60517848"
		},
		{
			name: "dior",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/42633985_1927008894059358_8334422696888631296_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=gJ38AXys7vsAX-nlQZt&tp=1&oh=7d89efb4147ec9827b0fc136d1cff885&oe=6054B770"
		},
		{
			name: "louisvuitton",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/914335_653223868059486_1434031198_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=nJbyF-z95BQAX_8EP27&oh=c7e142399119708370470c160f676d00&oe=6051EBC6"
		},
		{
			name: "voguemagazine",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/25024975_1053395324802105_3204556493470826496_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=utGkHfH2D38AX-wRQpr&tp=1&oh=7f04793190ea7693a64ddaa404ac82a3&oe=60515AC0"
		},
		{
			name: "chanelofficial",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/66505567_684858381987599_4049279537282809856_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=Tr8raHRvQXUAX_6TYO9&tp=1&oh=771c70bf057f6b353a83eb161fe28878&oe=60568A62"
		},
		{
			name: "mercedes",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/128444312_195044392220087_2626476807974979382_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=ujFqrl_VzjwAX_ALIHn&tp=1&oh=11e2aa56644d3e1eca0da5bb2c079ae9&oe=6052145C"
		},
		{
			name: "dolcegabbana",
			image:
				"https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=Ne33IpHXqVEAX-wDfPm&tp=1&oh=ab2fae4f93c2624696fd23da9b60dbce&oe=60517D59"
		}
	];

	const SliderRef = useRef<HTMLDivElement>(null);
	const ContainerRef = useRef<HTMLDivElement>(null);

	const [currentIndex, setCurrentIndex] = useState(4);
	const [translateValue, setTranslateValue] = useState(0);
	const [keepSliding, setKeepSliding] = useState({
		right: true,
		left: false
	});
	const [LeftItems, setLeftItems] = useState(StoriesData.length - 4);
	const [slideButtons, setSlideButtons] = useState({
		leftButton: false,
		rightButton: true
	});

	const NextSlide = () => {
		if (LeftItems > currentIndex) {
			if (keepSliding.right) {
				setLeftItems(LeftItems - 4);
				setCurrentIndex(currentIndex + 4);
				setTranslateValue(currentIndex * 88);
				setSlideButtons({ leftButton: true, rightButton: true });
			}
		} else {
			if (keepSliding.right) {
				setKeepSliding({ ...keepSliding, right: true });
				if (SliderRef.current && ContainerRef.current) {
					setTranslateValue(SliderRef.current?.clientWidth - ContainerRef.current?.clientWidth);
				}
				setSlideButtons({ leftButton: true, rightButton: false });
			}
		}
	};

	const PrevSlide = () => {
		// TODO: Fix this later ...
		// if (LeftItems < currentIndex) {
		//   if (keepSliding.left) {
		//     setLeftItems(LeftItems - 4);
		//     setCurrentIndex(currentIndex + 4);
		//     setTranslateValue(currentIndex * 88);
		//     setSlideButtons({ leftButton: true, rightButton: true });
		//   }
		// } else {
		//   if (keepSliding) {
		//     setKeepSliding({...keepSliding, left:false});
		//     if (SliderRef.current && ContainerRef.current) {
		//       setTranslateValue(SliderRef.current?.clientWidth - ContainerRef.current?.clientWidth);
		//     }
		//     setSlideButtons({ leftButton: true, rightButton: false });
		//   }
		// }
	};

	return (
		<Container ref={ContainerRef}>
			<Main translateValue={translateValue} ref={SliderRef}>
				{StoriesData.map(({ name, image }, i) => (
					<Story key={i} name={name} image={image} />
				))}
			</Main>
			{slideButtons.leftButton && (
				<PrevBtn>
					<Prev onClick={PrevSlide} />
				</PrevBtn>
			)}
			{slideButtons.rightButton && (
				<NextBtn>
					<Next onClick={NextSlide} />
				</NextBtn>
			)}
		</Container>
	);
};

export default Stories;
