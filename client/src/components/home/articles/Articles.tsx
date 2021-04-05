import Article from "./Article";
import styled from "styled-components";
import { useGetAllImagesQuery, useMeQuery } from "../../../generated/graphql";
import ArticlesError from "../../common/errors/ArticlesError";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useEffect } from "react";
import useScrollBottom from "../../../hooks/useScrollBottom";
import { default as ArticleSkeleton } from "../../skeletons/ArticleSkeleton";

const ArticlesContainer = styled.main`
	--ArticleMargin: 0;
	max-width: 614px;
	margin-right: var(--ArticleMargin);
	@media (min-width: 800px) {
		--ArticleMargin: 28px;
		margin-right: var(--ArticleMargin);
	}
`;

const ArticlesErrorContainer = styled.div`
	max-width: 614px;
	padding: 100px 0;
	text-align: center;
`;

const ArticlesLoadingSpinner = styled.div<{ padding: string; margin: boolean }>`
	max-width: 614px;
	padding: ${({ padding }) => padding};
	text-align: center;
	${({ margin }) => margin && "margin: -40px 0 20px 0;"}
`;

const Articles = () => {
	const { isBottom, setIsBottom } = useScrollBottom();
	const { data } = useMeQuery();
	const { data: images, loading: imagesLoading, error, fetchMore, variables } = useGetAllImagesQuery({
		variables: { limit: 3, cursor: null }
	});

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
	}, [fetchMore, images?.getAllImages.hasMore, images?.getAllImages.images, isBottom, variables?.limit, setIsBottom]);

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
			{images.getAllImages.images.map(({ id, caption, image_url, created_at, user, like }) => (
				<Article key={id} id={id} caption={caption} image_url={image_url} created_at={created_at} user={user} like={like} me={data} />
			))}
			{images.getAllImages.hasMore && (
				<ArticlesLoadingSpinner padding="0" margin={true}>
					<LoadingSpinner margin="0 auto" />
				</ArticlesLoadingSpinner>
			)}
		</ArticlesContainer>
	);
};

export default Articles;
