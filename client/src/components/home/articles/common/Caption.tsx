import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const CaptionContainer = styled.div<{ article: boolean }>`
	display: flex;
	align-self: flex-start;
	margin: 17px 0 7px;
	color: #262626;
	${({ article }) =>
		article &&
		`border-bottom: 1px solid #efefef;
		 padding-bottom: 10px;
		 margin-left: 13px;`}
`;

const CaptionElement = styled.span<{ article: boolean }>`
	width: ${({ article }) => (article ? "calc(100% - 35px)" : "100%")};
	word-wrap: break-word;
	display: flex;
	align-items: flex-start;
`;

const ArticleLogo = styled.img`
	height: 25px;
	width: 25px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 10px;
`;

const UserName = styled(Link)`
	color: #262626;
	font-weight: 600;
	margin-right: 4px;
	flex: 0;
	display: flex;
	align-items: flex-start;
`;

interface CaptionProps {
	name: string;
	description: string;
	image?: string;
}

const Caption = ({ name, description, image }: CaptionProps) => {
	return (
		<CaptionContainer article={!!image}>
			{image && <ArticleLogo src={image} alt="logo" />}
			<CaptionElement article={!!image}>
				<UserName to={`/${name}`}>{name}</UserName>
				{description}
			</CaptionElement>
		</CaptionContainer>
	);
};

Caption.propTypes = { name: PropTypes.string.isRequired, description: PropTypes.string.isRequired };

export default Caption;
