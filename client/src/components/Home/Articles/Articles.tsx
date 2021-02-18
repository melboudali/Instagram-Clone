import Article from "./Article";
import styled from "styled-components";
import { MeQuery, useGetAllImagesQuery, User_Response } from "../../../generated/graphql";
import ArticlesError from "../../Common/Errors/ArticlesError";
import LoadingSpinner from "../../Common/LoadingSpinner";

const Container = styled.main`
	--ArticleMargin: 28px;
	max-width: 614px;
	float: left;
	margin-right: var(--ArticleMargin);
	@media only screen and (max-width: 1000px) {
		--ArticleMargin: 0;
	}
`;

const ArticlesErrorContainer = styled.div`
	width: 614px;
	padding: 100px 0;
	text-align: center;
`;

const LoadingSpinnerContainer = styled.div`
	width: 614px;
	padding: 135px 0;
	text-align: center;
`;

interface ArticleProps {
	meData: Partial<User_Response>;
}

const Articles = ({ meData }: ArticleProps) => {
	const { data: images, loading: imagesLoading, error } = useGetAllImagesQuery({
		variables: { limit: 3, cursor: null }
	});

	if (imagesLoading)
		return (
			<LoadingSpinnerContainer>
				<LoadingSpinner margin="0 auto" />
			</LoadingSpinnerContainer>
		);

	if (images == null || images.getAllImages.images.length === 0 || error)
		return (
			<ArticlesErrorContainer>
				<ArticlesError />
			</ArticlesErrorContainer>
		);

	return (
		<Container>
			{images.getAllImages.images?.map(
				({
					id,
					caption,
					likes,
					image_url,
					like_status: liked,
					user: { image_link, username },
					created_at
				}) => (
					<Article
						key={id}
						name={username}
						logo={image_link}
						image={image_url}
						description={caption}
						likes={`MedEL and ${likes} persons.`}
						comments={[
							{ user: "brown.julianna", comment: "❤️❤️❤️" },
							{ user: "faybrookepracht", comment: "😍" }
						]}
						commentsLength={543}
						createdTime={created_at}
						meData={meData}
						liked={!!liked}
					/>
				)
			)}
		</Container>
	);
};

export default Articles;
