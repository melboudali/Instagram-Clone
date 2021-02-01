import Article from "./layouts/Article";
import styled from "styled-components";
import { MeQuery, useGetAllImagesQuery } from "../generated/graphql";

const Container = styled.div`
	max-width: 614px;
	float: left;
	margin-right: 28px;
	width: 100%;
	@media only screen and (max-width: 1000px) {
		margin: 0;
	}
`;

type ArticleProps = {
	data: MeQuery | undefined;
};

const Articles = ({ data }: ArticleProps) => {
	const { data: images, loading: imagesLoading } = useGetAllImagesQuery({
		variables: { limit: 10, cursor: null },
		notifyOnNetworkStatusChange: true
	});

	return (
		<Container>
			{images &&
				!imagesLoading &&
				images.getAllImages.images.map(
					({
						id,
						caption,
						likes,
						image_url,
						like_status,
						userId,
						user: { id: uid, image_link, username },
						created_at,
						updated_at
					}) => (
						<Article
							key={id}
							name={username}
							logo={image_link}
							image={image_url}
							description={caption}
							liked={"MedEL"}
							comments={[
								{ user: "brown.julianna", comment: "❤️❤️❤️" },
								{ user: "faybrookepracht", comment: "😍" }
							]}
							commentsLength={543}
							createdTime={created_at}
							data={data}
						/>
					)
				)}
		</Container>
	);
};

export default Articles;
