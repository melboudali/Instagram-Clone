import styled from "styled-components";

const SkeletonElement = styled.div<{ height: string; width: string; radius?: string }>`
	background-color: #b9b9b9;
	margin: 0;
	padding: 0;
	${({ height, width }) => `
        height: ${height};
	    width: ${width};
        `}
	${({ radius }) => radius && `border-radius: ${radius};`}
	animation: skeletonAnimation 2s steps(16) infinite;
	@keyframes skeletonAnimation {
		50% {
			opacity: 0.2;
		}
	}
`;

interface ArticleProps {
	height: string;
	width: string;
	radius?: string;
}

const Skeleton = ({ height, width, radius }: ArticleProps) => {
	return <SkeletonElement height={height} width={width} radius={radius} />;
};

export default Skeleton;
