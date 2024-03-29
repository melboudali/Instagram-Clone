/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import Caption from "../components/home/articles/common/Caption";
import Comment from "../components/home/articles/common/Comment";
import CommentInput from "../components/home/articles/common/CommentInput";
import Header from "../components/home/articles/common/Header";
import { useGetImageCommentsQuery, useGetImageQuery, useMeQuery } from "../generated/graphql";
import { usePalette } from "react-palette";
import Icons from "../components/home/articles/common/Icons";
import LoadingFullScreen from "./others/LoadingFullScreen";
import ErrorPage from "./error/ErrorPage";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const ImageContainer = styled.main`
	background-color: black;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const ModalClose = styled.button`
	display: none;
	position: absolute;
	top: 10px;
	right: 10px;
	svg {
		fill: var(--whiteColor);
		height: 24px;
		width: 24px;
	}
	@media (min-width: 800px) {
		display: block;
	}
`;

const ImageWrapper = styled.main`
	display: block;
	width: 100%;
	height: 100%;
	background-color: var(--backgroudColor);

	@media (min-width: 800px) {
		width: 90%;
		height: 90%;
		display: flex;
		flex-direction: row;
	}
`;

const BlurBackground = styled.div<{ backgroundColor: string | undefined }>`
	position: absolute;
	background-image: url(${({ backgroundColor }) => backgroundColor});
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	&:before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(2px);
	}
`;

const ImageMain = styled.a<{ backgroundColor: string | undefined }>`
	--displayValue: none;
	position: relative;
	display: var(--displayValue) !important;
	width: 100%;
	height: 100%;
	background-color: ${({ backgroundColor }) => backgroundColor ?? "var(--textColorDarkGray)"};
	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
		z-index: 1;
	}
	&:hover {
		cursor: zoom-in;
	}
	@media (min-width: 800px) {
		--displayValue: flex;
		align-items: center;
		justify-content: center;
	}
`;

const ImageAside = styled.aside`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	a {
		width: 100%;
		max-height: 60%;
	}
	@media (min-width: 800px) {
		width: 700px;
	}
`;

const ImageElement = styled.img`
	width: 100%;
	max-height: 100%;
	object-fit: cover;
	&:hover {
		cursor: zoom-in;
	}
	@media (min-width: 800px) {
		display: none;
	}
`;

const ImageDescriptionContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	padding-left: 10px;
`;

const ImageDescription = styled.section`
	width: 100%;
	height: 100%;
	padding-right: 17px;
	overflow-y: scroll;
	box-sizing: content-box;
`;

const EmptyComments = styled.div`
	height: calc(100% - 57px);
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	h1 {
		color: var(--textColorDarkGray);
	}
`;

const CommentInputContainer = styled.section`
	margin-top: auto;
	padding: 0 10px;
`;

const LikesCss = css`
	color: var(--textColorDarkGray);
	margin: 0 3px;
	font-weight: 600;
`;

const ArticleLikesContainer = styled.section`
	margin-bottom: 8px;
`;

const ArticleLikesLink = styled(Link)`
	${LikesCss}
	cursor: pointer;
`;

const ArticleOtherLink = styled.span`
	${LikesCss}
`;

interface ImageProps {
	match: { params: { imageId: string } };
}

const Image = ({
	match: {
		params: { imageId }
	}
}: ImageProps) => {
	const history = useHistory();
	const { data: me, loading: meLoading, error: meError } = useMeQuery();
	const { data: comments, loading: loadingComments, error: errorComments } = useGetImageCommentsQuery({ variables: { imageId } });

	const { data, loading, error } = useGetImageQuery({ variables: { imageId } });
	const {
		data: { darkMuted }
	} = usePalette(data?.getImage.image?.image_url as string);

	if (meLoading || loadingComments || loading) return <LoadingFullScreen />;

	if (meError || errorComments || error || !data?.getImage.image) return <ErrorPage />;

	return (
		<ImageContainer>
			<Helmet>
				<title>{data?.getImage.image?.user.username}</title>
				<meta name="title" content={data?.getImage.image?.user.username} />
				<meta property="og:title" content={data?.getImage.image?.user.username} />
				<meta property="twitter:title" content={data?.getImage.image?.user.username} />
				<meta name="description" content={data?.getImage.image?.caption} />
				<meta property="og:description" content={data?.getImage.image?.caption} />
				<meta property="twitter:description" content={data?.getImage.image?.caption} />
			</Helmet>
			<ModalClose type="button" onClick={() => history.goBack()}>
				<svg viewBox="0 0 48 48">
					<path d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"></path>
				</svg>
			</ModalClose>
			<ImageWrapper>
				<ImageMain backgroundColor={darkMuted} href={data?.getImage.image?.image_url} target="_noblank">
					<BlurBackground backgroundColor={data?.getImage.image?.image_url} />
					<img src={data?.getImage.image?.image_url} alt={data?.getImage.image?.caption} />
				</ImageMain>
				<ImageAside>
					<Header name={data?.getImage.image?.user.username!} logo={data?.getImage.image?.user.image_link!} showCloseBtn={true} />
					<a href={data?.getImage.image?.image_url} target="_noblank">
						<ImageElement src={data?.getImage.image?.image_url} />
					</a>
					<ImageDescriptionContainer>
						<ImageDescription>
							<Caption
								name={data?.getImage.image?.user.username!}
								description={data?.getImage.image?.caption!}
								image={data?.getImage.image?.user.image_link}
							/>
							{comments && !!comments.getImageComments.comment?.length ? (
								comments.getImageComments.comment.map(({ id, text, user: { username } }) => <Comment key={id} username={username} text={text} />)
							) : (
								<EmptyComments>
									<h1>No Comments</h1>
								</EmptyComments>
							)}
						</ImageDescription>
					</ImageDescriptionContainer>
					<CommentInputContainer>
						<Icons
							liked={data.getImage.image.like ? !!data.getImage.image.like.find(u => u.user.username === me?.me?.username) : false}
							imageId={data?.getImage.image?.id!}
							showComment={false}
							me={me}
						/>
						{data?.getImage.image?.like && !!data?.getImage.image?.like?.length && (
							<ArticleLikesContainer>
								<div>
									Liked by
									<span>
										<ArticleLikesLink to={`/${data?.getImage.image?.like[0].user.username}`}>
											{data?.getImage.image?.like[0].user.username}
										</ArticleLikesLink>
									</span>
									{data?.getImage.image?.like.length >= 2 ? (
										<>
											and
											<ArticleOtherLink>others.</ArticleOtherLink>
										</>
									) : (
										<>.</>
									)}
								</div>
							</ArticleLikesContainer>
						)}
						<CommentInput imageId={data?.getImage.image?.id!} />
					</CommentInputContainer>
				</ImageAside>
			</ImageWrapper>
		</ImageContainer>
	);
};

Image.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			imageId: PropTypes.string.isRequired
		})
	})
};

export default Image;
