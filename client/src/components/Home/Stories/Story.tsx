import styled from "styled-components";

const StoryContainer = styled.div`
	height: 82px;
	width: 88px;
	padding: 0 4px;
	display: flex;
	flex-direction: column;
	flex: 1 1 100%;
	align-items: center;
	justify-content: center;
`;

const StoryLogoContainer = styled.div`
	height: 64px;
	width: 64px;
	background-image: linear-gradient(to left bottom, #a524a5, #fc8a36);
	border-radius: 50%;
	padding: 2px;
`;

const StoryLogoBackground = styled.div`
	background: #fff;
	height: 100%;
	border-radius: 50%;
	padding: 2px;
`;

const StoryLogo = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 50%;
`;

const StoryNameContainer = styled.div`
	width: 100%;
	padding: 0 2px;
`;

const StoryName = styled.h1`
	letter-spacing: 0.01em;
	font-size: 12px;
	line-height: 14px;
	font-weight: normal;
	color: #262626;
	text-align: center;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

interface StoryProps {
	name: string;
	image: string;
}

const Story = ({ name, image }: StoryProps) => {
	return (
		<StoryContainer>
			<StoryLogoContainer>
				<StoryLogoBackground>
					<StoryLogo src={image} alt="logo" />
				</StoryLogoBackground>
			</StoryLogoContainer>
			<StoryNameContainer>
				<StoryName>{name}</StoryName>
			</StoryNameContainer>
		</StoryContainer>
	);
};

export default Story;
