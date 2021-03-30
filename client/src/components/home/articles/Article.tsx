import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import {
	Image_Data,
	Like,
	Like_Author,
	Maybe,
	MeQuery,
	useGetImageCommentsQuery,
	useMeQuery
} from "../../../generated/graphql";
import timeDifference from "../../../utils/timeDefference";
import PropTypes from "prop-types";
import Header from "./common/Header";
import Icons from "./common/Icons";
import CommentInput from "./common/CommentInput";
import Comment from "./common/Comment";
import Caption from "./common/Caption";
import { useEffect } from "react";

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

const ArticleOtherLink = styled(Link)`
	text-decoration: none;
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
	caption: string;
	image_url: string;
	created_at: string;
	user: { id: number; username: string; image_link: string };
	like: ({
		__typename?: "Like" | undefined;
	} & {
		user: {
			__typename?: "like_author" | undefined;
		} & Pick<Like_Author, "username">;
	})[];
	me: MeQuery | undefined;
}

const Article = ({
	id,
	caption,
	image_url,
	created_at,
	user: { image_link, username },
	like,
	me
}: ArticleProps) => {
	const { data } = useGetImageCommentsQuery({ variables: { imageId: id } });

	return (
		<ArticleContainer>
			<Header logo={image_link} name={username} />
			<ArticleImage to={`/p/${id}`}>
				<img src={image_url} alt={`by ${username}`} />
			</ArticleImage>
			<ArticleDetails>
				<Icons liked={!!like.find(u => u.user.username === me?.me?.username)} imageId={id} me={me} />
				<Caption name={username} description={caption} />
				<ArticleCommentAndCreatedtimeContainer>
					{!!data?.getImageComments.length && (
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
					<ArticleCreatedTime to={`/p/${id}`}>{`${timeDifference(created_at)} ago`}</ArticleCreatedTime>
				</ArticleCommentAndCreatedtimeContainer>
			</ArticleDetails>
			<CommentInput imageId={id!} />
		</ArticleContainer>
	);
};

Article.propTypes = {};

export default Article;
