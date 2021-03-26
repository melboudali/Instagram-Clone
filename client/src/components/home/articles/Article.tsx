import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetImageCommentsQuery, User_Response } from "../../../generated/graphql";
import timeDifference from "../../../utils/timeDefference";
import PropTypes from "prop-types";
import Header from "./common/Header";
import Icons from "./common/Icons";
import CommentInput from "./common/CommentInput";
import Comment from "./common/Comment";
import Caption from "./common/Caption";

const ArticleContainer = styled.article`
	display: block;
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin-bottom: 60px;
`;

const ArticleImage = styled(Link)`
	max-width: 614px;
	text-decoration: none;
	img {
		width: 100%;
		height: auto;
	}
`;

const ArticleDetails = styled.div`
	padding: 0 16px;
`;

const LikesCss = css`
	color: #262626;
	margin: 0 3px;
	font-weight: 600;
	cursor: pointer;
`;
const ArticleLikesContainer = styled.section`
	margin-bottom: 8px;
`;

const ArticleLikesLink = styled(Link)`
	${LikesCss}
`;

const ArticleOtherButton = styled.button`
	border: 0;
	padding: 0;
	background: none;
	${LikesCss}
`;

const ArticleCommentsCount = styled.div`
	margin-bottom: 4px;
`;

const ArticleCommentsCountLink = styled(Link)`
	color: #8e8e8e;
`;

const ArticleCommentAndCreatedtimeContainer = styled.div`
	margin-bottom: 8px;
`;

const ArticleCreatedTime = styled(Link)`
	font-size: 10px;
	letter-spacing: 0.2px;
	color: #8e8e8e;
	text-transform: uppercase;
`;

interface ArticleProps {
	id: string;
	name: string;
	logo: string;
	image: string;
	description: string;
	likes: string;
	createdTime: string;
	meData: Partial<User_Response>;
	liked: boolean;
}

const Article = ({
	id,
	name,
	logo,
	image,
	description,
	likes,
	createdTime,
	meData,
	liked
}: ArticleProps) => {
	const { data } = useGetImageCommentsQuery({ variables: { imageId: id } });
	const onClick = (buttonName: string) => {
		// TODO: Edit this later
		console.log(`${buttonName} Button Clicked.`);
	};

	return (
		<ArticleContainer>
			<Header logo={logo} name={name} />
			<ArticleImage to={`/p/${id}`}>
				<img src={image} alt={`by ${name}`} />
			</ArticleImage>
			<ArticleDetails>
				<Icons liked={liked} articleId={id} />
				<ArticleLikesContainer>
					<div>
						Liked by
						<span>
							<ArticleLikesLink to={`/${meData.username === likes ? "/profile" : likes}`}>
								{likes}
							</ArticleLikesLink>
						</span>
						and
						<ArticleOtherButton type="button" onClick={() => onClick("Others")}>
							others.
						</ArticleOtherButton>
					</div>
				</ArticleLikesContainer>
				<>
					<Caption name={name} description={description} />
					<ArticleCommentAndCreatedtimeContainer>
						{data && !!data?.getImageComments.length && (
							<>
								<ArticleCommentsCount>
									<ArticleCommentsCountLink
										to={`/p/${id}`}>{`View all ${data?.getImageComments.length} comments`}</ArticleCommentsCountLink>
								</ArticleCommentsCount>
								{data?.getImageComments.map(({ id, text, user: { username } }) => (
									<Comment key={id} username={username} text={text} />
								))}
							</>
						)}
						<ArticleCreatedTime to={`/p/${id}`}>{`${timeDifference(
							createdTime
						)} ago`}</ArticleCreatedTime>
					</ArticleCommentAndCreatedtimeContainer>
				</>
			</ArticleDetails>
			<CommentInput imageId={id!} />
		</ArticleContainer>
	);
};

Article.propTypes = {
	name: PropTypes.string.isRequired,
	logo: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	likes: PropTypes.string.isRequired,
	createdTime: PropTypes.string.isRequired,
	meData: PropTypes.object.isRequired,
	liked: PropTypes.bool.isRequired
};

export default Article;
