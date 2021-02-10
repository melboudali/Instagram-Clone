import styled from "styled-components";
import Container from "./Container";

const Main = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: calc(100vh - 84px);
`;

type ConnectionErrorProps = {};

const ConnectionError = ({}: ConnectionErrorProps) => {
	return (
		<Container>
			<Main>
				<h1 style={{ alignSelf: "center", color: "#747474" }}>503 Service Unavailable</h1>
			</Main>
		</Container>
	);
};

export default ConnectionError;
