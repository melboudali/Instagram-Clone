import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User_Response } from "../../../generated/graphql";
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
	margin-bottom: 4px;
	&:last-child {
		margin-bottom: 8px;
	}
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
	comments: { user: string; comment: string }[];
	commentsLength: number;
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
	comments,
	commentsLength,
	createdTime,
	meData,
	liked
}: ArticleProps) => {
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
				<Icons liked={liked} />
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
					<ArticleCommentsCount>
						<ArticleCommentsCountLink to="/p/articleIdHere">{`View all ${commentsLength.toString()} comments`}</ArticleCommentsCountLink>
					</ArticleCommentsCount>
					{comments.map(({ user, comment }, id) => (
						<Comment key={id} user={user} comment={comment} />
					))}
					<ArticleCommentAndCreatedtimeContainer>
						<ArticleCreatedTime to="/p/articleIdHere">{`${timeDifference(
							createdTime
						)} ago`}</ArticleCreatedTime>
					</ArticleCommentAndCreatedtimeContainer>
				</>
			</ArticleDetails>
			<CommentInput />
		</ArticleContainer>
	);
};

Article.propTypes = {
	name: PropTypes.string.isRequired,
	logo: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	likes: PropTypes.string.isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			user: PropTypes.string.isRequired,
			comment: PropTypes.string.isRequired
		})
	).isRequired,
	commentsLength: PropTypes.number.isRequired,
	createdTime: PropTypes.string.isRequired,
	meData: PropTypes.object.isRequired,
	liked: PropTypes.bool.isRequired
};

export default Article;
