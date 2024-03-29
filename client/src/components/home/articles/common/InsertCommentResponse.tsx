import styled from "styled-components";
import PropTypes from "prop-types";

const InsertCommentResponseContainer = styled.div<{ inserted: boolean; insertedError: string | null }>`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 60px;
	left: 20%;
	right: 20%;
	bottom: 10px;
	z-index: 1;
	background-color: ${({ insertedError }) => (insertedError ? "var(--textErrorColor)" : "var(--textColorGreen)")};
	border-radius: 5px;
	padding: 0 30px;
	transform: ${({ inserted }) => (inserted ? "translateY(0)" : "translateY(70px)")};
	transition: all 0.3s ease-in-out;
	h1 {
		color: #eee;
		font-size: 0.9rem;
		font-weight: 500;
	}
	@media (min-width: 800px) {
		left: 40%;
		right: 40%;
	}
`;

interface InsertCommentResponseProps {
	inserted: boolean;
	insertedError: string | null;
}

const InsertCommentResponse = ({ inserted, insertedError }: InsertCommentResponseProps) => {
	return (
		<InsertCommentResponseContainer inserted={inserted} insertedError={insertedError}>
			<h1>{insertedError ?? "Comment Inserted"}</h1>
		</InsertCommentResponseContainer>
	);
};

InsertCommentResponse.propTypes = { inserted: PropTypes.bool.isRequired, insertedError: PropTypes.string };

export default InsertCommentResponse;
