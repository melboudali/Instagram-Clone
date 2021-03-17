import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ImageContainer = styled.main`
	background-color: black;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const ModalClose = styled(Link)`
	position: absolute;
	top: 10px;
	right: 10px;
	svg {
		fill: #ffffff;
		height: 24px;
		width: 24px;
	}
`;

interface ImageProps {
	match: { params: { userId: string } };
}

const Image = ({
	match: {
		params: { userId }
	}
}: ImageProps) => {
	return (
		<ImageContainer>
			<ModalClose to="/">
				<svg viewBox="0 0 48 48">
					<path d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"></path>
				</svg>
			</ModalClose>
			This is Image Component/Page {userId}
		</ImageContainer>
	);
};

Image.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			userId: PropTypes.string.isRequired
		})
	})
};

export default Image;
