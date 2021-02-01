import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	position: fixed;
	padding: 20px 16px;
	background-color: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	bottom: 0;
	left: 0;
	right: 0;
`;

type UnauthFooterProps = {};

const UnauthFooter = ({}: UnauthFooterProps) => {
	return <Container>This is UnauthFooter Component/Page</Container>;
};

export default UnauthFooter;
