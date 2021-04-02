import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import onClickFunction from "../../../../utils/onClick";
import PropTypes from "prop-types";

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

const ModalClose = styled.button`
	--displayValue: block;
	display: var(--displayValue) !important;
	background: none;
	border: none;
	outline: none;
	top: 0;
	right: 0;
	bottom: 0;
	cursor: pointer;
	@media (min-width: 800px) {
		--displayValue: none;
	}
	svg {
		fill: #262626;
		height: 20px;
		width: 20px;
	}
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
	showCloseBtn?: boolean;
}

const Header = ({
	logo = "https://res.cloudinary.com/elboudali/image/upload/v1615221365/Instagram-Clone/44884218_345707102882519_2446069589734326272_n_htmp8n.jpg",
	name,
	showCloseBtn = false
}: HeaderProps) => {
	const history = useHistory();
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
				<button type="button" onClick={onClickFunction}>
					<svg fill="#262626" height="16" viewBox="0 0 48 48" width="16">
						<circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5" />
						<circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5" />
						<circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5" />
					</svg>
				</button>
				{showCloseBtn && (
					<ModalClose onClick={() => history.goBack()}>
						<svg viewBox="0 0 48 48">
							<path d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"></path>
						</svg>
					</ModalClose>
				)}
			</ArticleMore>
		</ArticleHeaderContainer>
	);
};

Header.propTypes = {};

export default Header;
