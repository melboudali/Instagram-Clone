import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const CaptionContainer = styled.div`
	display: flex;
	margin-bottom: 4px;
	color: #262626;
`;

const UserName = styled(Link)`
	color: #262626;
	font-weight: 600;
	margin-right: 4px;
`;

interface CaptionProps {
	name: string;
	description: string;
}

const Caption = ({ name, description }: CaptionProps) => {
	return (
		<CaptionContainer>
			<span>
				<UserName to={`/${name}`}>{name}</UserName>
				{description}
			</span>
		</CaptionContainer>
	);
};

Caption.propTypes = { name: PropTypes.string.isRequired, description: PropTypes.string.isRequired };

export default Caption;
