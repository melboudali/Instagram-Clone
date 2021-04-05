import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const CommentContainer = styled.div`
	display: flex;
	margin-bottom: 4px;
	span {
		width: calc(100% - 12px);
		word-wrap: break-word;
		padding-right: 10px;
	}
`;

const CommentLink = styled(Link)`
	color: var(--textColorDarkGray);
	font-weight: 600;
	margin-right: 4px;
`;

interface CommentProps {
	username: string;
	text: string;
}

const Comment = ({ username, text }: CommentProps) => (
	<CommentContainer>
		<span>
			<CommentLink to={`/${username}`}>{username}</CommentLink>
			{text}
		</span>
	</CommentContainer>
);

Comment.propTypes = {
	username: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default Comment;
