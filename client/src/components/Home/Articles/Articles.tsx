import Article from "./Article";
import styled from "styled-components";
import { useGetAllImagesQuery, User_Response } from "../../../generated/graphql";
import ArticlesError from "../../common/errors/ArticlesError";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useEffect } from "react";
import useScrollBottom from "../../../hooks/useScrollBottom";
import { default as ArticleSkeleton } from "../../skeletons/ArticleSkeleton";
import PropTypes from "prop-types";

const ArticlesContainer = styled.main`
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

const ArticlesLoadingSpinner = styled.div<{ padding: string; margin: boolean }>`
	width: 614px;
	padding: ${({ padding }) => padding};
	text-align: center;
	${({ margin }) => margin && "margin: -40px 0 20px 0;"}
`;

interface ArticleProps {
	meData: Partial<User_Response>;
}

const Articles = ({ meData }: ArticleProps) => {
	const {
		data: images,
		loading: imagesLoading,
		error,
		fetchMore,
		variables
	} = useGetAllImagesQuery({
		variables: { limit: 3, cursor: null }
	});

	const { isBottom, setIsBottom } = useScrollBottom();

	useEffect(() => {
		if (isBottom && images?.getAllImages.hasMore) {
			fetchMore({
				variables: {
					limit: variables?.limit,
					cursor: images.getAllImages.images[images.getAllImages.images.length - 1].created_at
				}
			});
			setIsBottom(false);
		}
	}, [
		fetchMore,
		images?.getAllImages.hasMore,
		images?.getAllImages.images,
		isBottom,
		variables?.limit,
		setIsBottom
	]);

	if (imagesLoading)
		return (
			<ArticlesContainer>
				<ArticleSkeleton />
			</ArticlesContainer>
		);

	if (!images || !images.getAllImages.images.length || error)
		return (
			<ArticlesErrorContainer>
				<ArticlesError />
			</ArticlesErrorContainer>
		);

	return (
		<ArticlesContainer>
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
			{images.getAllImages.hasMore && (
				<ArticlesLoadingSpinner padding="0" margin={true}>
					<LoadingSpinner margin="0 auto" />
				</ArticlesLoadingSpinner>
			)}
		</ArticlesContainer>
	);
};

Articles.propTypes = {
	meData: PropTypes.object.isRequired
};

export default Articles;
