import Article from "./Article";
import styled from "styled-components";
import { MeQuery, useGetAllImagesQuery } from "../../../generated/graphql";
import ArticlesError from "../../Common/Errors/ArticlesError";

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
	margin: 100px 0;
	text-align: center;
`;

interface ArticleProps {
	data: MeQuery | undefined;
}

const Articles = ({ data }: ArticleProps) => {
	const { data: images, loading: imagesLoading } = useGetAllImagesQuery({
		variables: { limit: 3, cursor: null }
	});

	return (
		<Container>
			{images && !imagesLoading ? (
				images.getAllImages.images?.map(
					({
						id,
						caption,
						likes,
						image_url,
						like_status: liked,
						user: { id: uid, image_link, username },
						created_at
					}) => (
						<Article
							key={id}
							name={username}
							logo={image_link}
							image={image_url}
							description={caption}
							likes={"MedEL"}
							comments={[
								{ user: "brown.julianna", comment: "❤️❤️❤️" },
								{ user: "faybrookepracht", comment: "😍" }
							]}
							commentsLength={543}
							createdTime={created_at}
							data={data}
							liked={!!liked}
						/>
					)
				)
			) : (
				<ArticlesErrorContainer>
					<ArticlesError />
				</ArticlesErrorContainer>
			)}
		</Container>
	);
};

export default Articles;
