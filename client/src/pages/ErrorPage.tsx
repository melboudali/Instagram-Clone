import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../containers/Container";
import Footer from "../components/common/footer/Footer";
import UnauthFooter from "../components/common/footer/UnauthFooter";
import { useMeQuery } from "../generated/graphql";

const ErroPageContainer = styled.div`
	text-align: center;
	height: 70vh;
	padding: 40px 0;
`;

const ErroTitle = styled.h2`
	color: #262625;
	font-weight: 600;
	font-size: 22px;
`;

const ErroMessage = styled.p`
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
			<ErroPageContainer>
				<ErroTitle>Sorry, this page isn't available.</ErroTitle>
				<ErroMessage>
					The link you followed may be broken, or the page may have been removed.
					<GoBackLink to="/">Go back to Instagram.</GoBackLink>
				</ErroMessage>
			</ErroPageContainer>
			<Footer />
			{!data?.me && !loading && <UnauthFooter />}
		</Container>
	);
};

export default ErroPage;
