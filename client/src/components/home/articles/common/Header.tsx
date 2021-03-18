import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ArticleHeaderContainer = styled.header`
	position: relative;
	display: flex;
	align-items: center;
	flex-direction: row;
	height: 60px;
	padding: 16px;
	border-bottom: 1px solid #efefef;
`;

const ArticleLogoContainer = styled.div`
	display: block;
	position: relative;
	height: 40px;
	width: 40px;
	background-image: linear-gradient(to left bottom, #a524a5, #fc8a36);
	border-radius: 50%;
	padding: 2px;
`;

const ArticleLogoBackground = styled.div`
	background: #fff;
	height: 100%;
	border-radius: 50%;
	padding: 2px;
`;

const ArticleLogo = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 50%;
	object-fit: cover;
`;

const ArticleNameContainer = styled.div`
	margin-left: 14px;
`;

const ArticleName = styled(Link)`
	color: #262626;
	border: 0;
	display: inline;
	padding: 0;
	position: relative;
	user-select: auto;
	box-sizing: border-box;
	cursor: pointer;
	font-weight: 600;
	text-align: center;
	text-transform: inherit;
	text-overflow: ellipsis;
	width: auto;
`;

const ArticleMore = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60px;
	top: 0;
	bottom: 0;
	right: 4px;
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background: none;
		cursor: pointer;
		padding: 8px;
		margin: 0;
	}
`;

interface HeaderProps {
	name: string;
	logo: string;
}

const Header = ({
	logo = "https://res.cloudinary.com/elboudali/image/upload/v1615221365/Instagram-Clone/44884218_345707102882519_2446069589734326272_n_htmp8n.jpg",
	name
}: HeaderProps) => {
	return (
		<ArticleHeaderContainer>
			<ArticleLogoContainer>
				<ArticleLogoBackground>
					<ArticleLogo src={logo} alt="logo" />
				</ArticleLogoBackground>
			</ArticleLogoContainer>
			<ArticleNameContainer>
				<ArticleName to={`/${name}`}>{name}</ArticleName>
			</ArticleNameContainer>
			<ArticleMore>
				<button type="button">
					<svg fill="#262626" height="16" viewBox="0 0 48 48" width="16">
						<circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5" />
						<circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5" />
						<circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5" />
					</svg>
				</button>
			</ArticleMore>
		</ArticleHeaderContainer>
	);
};

Header.propTypes = {};

export default Header;
