import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Common/Container";
import Footer from "../components/Common/Footer/Footer";
import UnauthFooter from "../components/Common/Footer/UnauthFooter";
import { useMeQuery } from "../generated/graphql";

const Main = styled.div`
	text-align: center;
	height: 70vh;
	padding: 40px 0;
`;

const Title = styled.h2`
	color: #262625;
	font-weight: 600;
	font-size: 22px;
`;

const Message = styled.p`
	font-size: 16px;
	color: #262625;
	margin: 40px 0;
`;

const GoBackLink = styled(Link)`
	color: #00376b;
	margin-left: 5px;
`;

const ErroPage = () => {
	const { data, loading } = useMeQuery();
	return (
		<Container>
			<Main>
				<Title>Sorry, this page isn't available.</Title>
				<Message>
					The link you followed may be broken, or the page may have been removed.
					<GoBackLink to="/">Go back to Instagram.</GoBackLink>
				</Message>
			</Main>
			<Footer />
			{!data?.me && !loading && <UnauthFooter />}
		</Container>
	);
};

export default ErroPage;
