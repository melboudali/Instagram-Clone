import styled from "styled-components";
import Container from "../../../Containers/Container";

const Main = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: calc(100vh - 84px);
`;

const Message = styled.h1`
	align-self: center;
	color: #747474;
`;

const ConnectionError = () => {
	return (
		<Container>
			<Main>
				<Message>503 Service Unavailable</Message>
			</Main>
		</Container>
	);
};

export default ConnectionError;
