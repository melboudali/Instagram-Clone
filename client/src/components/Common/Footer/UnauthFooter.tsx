import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import Assets from "../../../assets/images/9813fcc3aa16.png";
import { showFooterValue } from "../../../graphql/cache/cache";

const UnauthFooterContainer = styled.div<{ closed: boolean }>`
	display: ${({ closed }) => (closed ? "none" : "block")};
	position: fixed;
	width: 100%;
	padding: 20px 16px;
	background-color: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	bottom: 0;
	left: 0;
	right: 0;
`;

const UnauthFooterCloseButton = styled.button`
	cursor: pointer;
	position: absolute;
	background: none;
	border: 0;
	padding: 0;
	right: 4px;
	top: 4px;
	height: 40px;
	width: 40px;
`;

const UnauthFooterCloseImage = styled.span`
	display: block;
	height: 9px;
	width: 9px;
	background-image: url(${Assets});
	background-repeat: no-repeat;
	background-position: -480px -442px;
`;

const slide = keyframes`
		0% {
			transform: translateY(60px);
		}
		100% {
			transform: translateY(0);
		}
`;

const UnauthFooterMain = styled.div`
	display: flex;
	max-width: 903px;
	margin: 0 auto;
	align-items: center;
	animation: ${slide} 0.4s ease-in-out;
`;

const UnauthFooterLogo = styled.div`
	height: 56px;
	width: 56px;
	background-image: url(${Assets});
	background-repeat: no-repeat;
	background-position: -189px -324px;
`;

const UnauthFooterLoginMessage = styled.div`
	flex: 1 1 auto;
	margin-left: 12px;
	div {
		color: #fff;
		line-height: 25px;
		&:nth-child(1) {
			font-weight: 600;
		}
		&:nth-child(2) {
			font-weight: 400;
		}
	}
`;

const UnauthFooterButtons = styled.div`
	width: 112px;
	margin-left: 12px;
`;

const ButtonsCss = css`
	display: block;
	font-weight: 600;
	width: 100%;
	text-align: center;
	margin-top: 12px;
`;

const UnauthFooterLoginButton = styled(Link)`
	${ButtonsCss}
	background: var(--buttonLightBlue);
	color: #fff;
	border-radius: 4px;
	padding: 6px 10px;
`;

const UnauthFooterSignUpButton = styled(Link)`
	${ButtonsCss}
	color: var(--buttonLightBlue);
`;

const UnauthFooter = () => {
	const { data } = useQuery(gql`
		query getShowUnauthFooter {
			showFooter @client {
				showUnauthFooter
			}
		}
	`);

	const onClose = () => {
		showFooterValue([
			{
				showUnauthFooter: true
			}
		]);
	};

	return (
		<UnauthFooterContainer closed={data.showFooter[0].showUnauthFooter}>
			<UnauthFooterCloseButton onClick={onClose}>
				<UnauthFooterCloseImage />
			</UnauthFooterCloseButton>
			<UnauthFooterMain>
				<UnauthFooterLogo />
				<UnauthFooterLoginMessage>
					<div>Log In to Instagram</div>
					<div>
						Log in to see photos and videos from friends and discover other accounts you'll love.
					</div>
				</UnauthFooterLoginMessage>
				<UnauthFooterButtons>
					<UnauthFooterLoginButton to="/">Log In</UnauthFooterLoginButton>
					<UnauthFooterSignUpButton to="/accounts/emailsignup">Sign Up</UnauthFooterSignUpButton>
				</UnauthFooterButtons>
			</UnauthFooterMain>
		</UnauthFooterContainer>
	);
};

export default UnauthFooter;
