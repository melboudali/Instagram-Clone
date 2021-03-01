import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const skeletonAnimation = keyframes`
	50% {
		opacity: 0.2;
	}
`;
const SkeletonElement = styled.div<{ height: string; width: string; radius?: string }>`
	background-color: #b9b9b9;
	margin: 0;
	padding: 0;
	${({ height, width }) => `
        height: ${height};
	    width: ${width};
        `}
	${({ radius }) => radius && `border-radius: ${radius};`}
	animation: ${skeletonAnimation} 2s steps(16) infinite;
`;

interface ArticleProps {
	height: string;
	width: string;
	radius?: string;
}

const Skeleton = ({ height, width, radius }: ArticleProps) => {
	return <SkeletonElement height={height} width={width} radius={radius} />;
};

Skeleton.propTypes = {
	height: PropTypes.string.isRequired,
	width: PropTypes.string.isRequired,
	radius: PropTypes.string
};

export default Skeleton;
