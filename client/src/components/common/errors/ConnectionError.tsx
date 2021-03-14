import styled from "styled-components";
import Container from "../../../containers/Container";

const ConnectionErrorMain = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: calc(100vh - 84px);
`;

const ConnectionErrorMessage = styled.h1`
	align-self: center;
	color: #747474;
`;

const ConnectionError = () => (
	<Container>
		<ConnectionErrorMain>
			<ConnectionErrorMessage>503 Service Unavailable</ConnectionErrorMessage>
		</ConnectionErrorMain>
	</Container>
);

export default ConnectionError;
