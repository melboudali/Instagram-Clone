import Articles from "./articles/Articles";
import Suggestion from "./Suggestions";
import { useMeQuery } from "../../generated/graphql";
import styled from "styled-components";
import ArticlesError from "../common/errors/ArticlesError";

const ArticlesAndSuggestionsMain = styled.div`
	position: relative;
	@media only screen and (max-width: 1000px) {
		display: flex;
		justify-content: center;
	}
`;

const ErrorContainer = styled.div`
	text-align: center;
	padding-top: 20px;
`;

const ArticlesAndSuggestionsContainer = () => {
	const { data, error } = useMeQuery();

	if (error || !data || !data.me)
		return (
			<ErrorContainer>
				<ArticlesError />
			</ErrorContainer>
		);

	return (
		<ArticlesAndSuggestionsMain>
			<Articles />
			<Suggestion meData={data.me} />
		</ArticlesAndSuggestionsMain>
	);
};

export default ArticlesAndSuggestionsContainer;
