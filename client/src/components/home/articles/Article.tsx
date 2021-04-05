import styled from "styled-components";
import { Link } from "react-router-dom";
import { Like_Author, Maybe, MeQuery, useGetImageCommentsQuery } from "../../../generated/graphql";
import timeDifference from "../../../utils/timeDefference";
import Header from "./common/Header";
import Icons from "./common/Icons";
import CommentInput from "./common/CommentInput";
import Comment from "./common/Comment";
import Caption from "./common/Caption";
import PropTypes from "prop-types";

const ArticleContainer = styled.article`
	display: block;
	background-color: var(--whiteColor);
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	margin-bottom: 60px;
`;

const ArticleImage = styled(Link)`
	max-width: 614px;
	img {
		width: 100%;
		height: auto;
	}
`;

const ArticleDetails = styled.div`
	padding: 0 16px;
`;

const ArticleCommentsCount = styled.div`
	margin-bottom: 4px;
`;

const ArticleCommentsCountLink = styled(Link)`
	color: var(--textColorGray);
`;

const ArticleCommentAndCreatedtimeContainer = styled.div`
	margin-bottom: 8px;
`;

const ArticleCreatedTime = styled(Link)`
	font-size: 10px;
	letter-spacing: 0.2px;
	color: var(--textColorGray);
	text-transform: uppercase;
`;

interface ArticleProps {
	id: string;
	caption: string;
	image_url: string;
	created_at: string;
	user: { id: number; username: string; image_link: string };
	like:
		| Maybe<
				({
					__typename?: "Like" | undefined;
				} & {
					user: {
						__typename?: "like_author" | undefined;
					} & Pick<Like_Author, "username">;
				})[]
		  >
		| undefined;
	me: MeQuery | undefined;
}

const Article = ({ id, caption, image_url, created_at, user: { image_link, username }, like, me }: ArticleProps) => {
	const { data } = useGetImageCommentsQuery({ variables: { imageId: id } });

	return (
		<ArticleContainer>
			<Header logo={image_link} name={username} />
			<ArticleImage to={`/p/${id}`}>
				<img src={image_url} alt={`by ${username}`} />
			</ArticleImage>
			<ArticleDetails>
				<Icons liked={like ? !!like.length : false} imageId={id} me={me} />
				<Caption name={username} description={caption} />
				<ArticleCommentAndCreatedtimeContainer>
					{!!data?.getImageComments.comment?.length && (
						<>
							<ArticleCommentsCount>
								<ArticleCommentsCountLink to={`/p/${id}`}>{`View all ${data?.getImageComments.comment.length} comments`}</ArticleCommentsCountLink>
							</ArticleCommentsCount>
							{data?.getImageComments.comment.map(({ id, text, user: { username } }) => (
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

Article.propTypes = {
	id: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	image_url: PropTypes.string.isRequired,
	created_at: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	like: PropTypes.array,
	me: PropTypes.object
};

export default Article;
