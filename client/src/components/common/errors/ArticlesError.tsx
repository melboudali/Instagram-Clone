import styled from "styled-components";
import Assets from "../../../assets/images/9813fcc3aa16.png";

const NoPostsLogoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 62px;
	height: 62px;
	margin: 0 auto 32px;
	border: 2px solid #262626;
	border-radius: 50%;
`;

const NoPostsLogo = styled.span`
	background: url(${Assets});
	background-position: -440px 0;
	background-repeat: no-repeat;
	height: 24px;
	width: 24px;
`;

const NoPostsMessage = styled.h1`
	font-size: 28px;
	font-weight: 300;
	color: #262626;
`;

const ArticlesError = () => (
	<>
		<NoPostsLogoContainer>
			<NoPostsLogo />
		</NoPostsLogoContainer>
		<NoPostsMessage>No Posts Yet</NoPostsMessage>
	</>
);

export default ArticlesError;
