import styled from "styled-components";

const DividerContainer = styled.div`
	display: flex;
	margin: 10px 40px 18px;
`;

const LeftLine = styled.div`
	position: relative;
	flex: 1 1;
	background-color: var(--borderColor);
	height: 1px;
	top: 0.45em;
`;

const OrText = styled.div`
	color: var(--textColorGray);
	flex: 0 0;
	font-size: 13px;
	font-weight: 600;
	line-height: 15px;
	margin: 0 18px;
	text-transform: uppercase;
`;

const RightLine = styled.div`
	position: relative;
	flex: 1;
	background-color: var(--borderColor);
	height: 1px;
	top: 0.45em;
`;

const Divider = () => (
	<DividerContainer>
		<LeftLine />
		<OrText>or</OrText>
		<RightLine />
	</DividerContainer>
);

export default Divider;
