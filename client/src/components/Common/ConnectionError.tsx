import styled from "styled-components";
import Container from "./Container";

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100vh - 84px);
`;

const Message = styled.h1`
	color: "#747474";
`;

type ConnectionErrorProps = {};

const ConnectionError = ({}: ConnectionErrorProps) => {
	return (
		<Container>
			<Main>
				<Message>503 Service Unavailable</Message>
			</Main>
		</Container>
	);
};

export default ConnectionError;
