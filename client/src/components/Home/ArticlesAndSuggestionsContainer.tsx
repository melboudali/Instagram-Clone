import Articles from "./Articles/Articles";
import Suggestion from "./Suggestions";
import { useMeQuery } from "../../generated/graphql";
import styled from "styled-components";

const Container = styled.div`
	position: relative;
	@media only screen and (max-width: 1000px) {
		display: flex;
		justify-content: center;
	}
`;

const ArticlesAndSuggestionsContainer = () => {
	const { data, error } = useMeQuery();

	if (error) return null;

	return (
		<Container>
			<Articles data={data} />
			<Suggestion data={data} />
		</Container>
	);
};

export default ArticlesAndSuggestionsContainer;
