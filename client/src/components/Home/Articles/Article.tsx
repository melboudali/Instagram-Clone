import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MeQuery } from "../../../generated/graphql";
import timeDifference from "../../../utils/timeDefference";

const Container = styled.article`
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin-bottom: 60px;
`;

const Header = styled.header`
	position: relative;
	display: flex;
	align-items: center;
	flex-direction: row;
	height: 60px;
	padding: 16px;
	border-bottom: 1px solid #efefef;
`;

const LogoContainer = styled.div`
	display: block;
	position: relative;
	height: 40px;
	width: 40px;
	background-image: linear-gradient(to left bottom, #a524a5, #fc8a36);
	border-radius: 50%;
	padding: 2px;
`;

const LogoBackground = styled.div`
	background: #fff;
	height: 100%;
	border-radius: 50%;
	padding: 2px;
`;

const Logo = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 50%;
	object-fit: cover;
`;

const NameContainer = styled.div`
	margin-left: 14px;
`;

const Name = styled(Link)`
	color: #262626;
	border: 0;
	display: inline;
	padding: 0;
	position: relative;
	user-select: auto;
	box-sizing: border-box;
	cursor: pointer;
	font-weight: 600;
	text-align: center;
	text-transform: inherit;
	text-overflow: ellipsis;
	width: auto;
`;

const More = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60px;
	top: 0;
	bottom: 0;
	right: 4px;
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background: none;
		cursor: pointer;
		padding: 8px;
		margin: 0;
	}
`;

const Image = styled.img`
	width: 100%;
	display: block;
`;

const Details = styled.div`
	padding: 0 16px;
`;

const IconsContainer = styled.section`
	margin-top: 4px;
	display: flex;
	span {
		&:nth-child(1) {
			margin-left: -8px;
		}
		&:last-of-type {
			display: inline-block;
			margin-left: auto;
			margin-right: -10px;
		}
		button {
			align-items: center;
			background: 0 0;
			border: 0;
			cursor: pointer;
			display: flex;
			justify-content: center;
			padding: 8px;
		}
	}
`;

const LikesCss = css`
	color: #262626;
	margin: 0 3px;
	font-weight: 600;
	cursor: pointer;
`;
const LikesContainer = styled.section`
	margin-bottom: 8px;
`;

const LikesLink = styled(Link)`
	${LikesCss}
`;

const OtherButton = styled.button`
	border: 0;
	padding: 0;
	background: none;
	${LikesCss}
`;

const DescriptionAndCommentsContainer = styled.div``;

const Description = styled.div`
	display: flex;
	margin-bottom: 4px;
	color: #262626;
	a {
		color: #262626;
		text-decoration: none;
		font-weight: 600;
		margin-right: 4px;
	}
`;

const CommentsCount = styled.div`
	margin-bottom: 4px;
	a {
		color: #8e8e8e;
		text-decoration: none;
	}
`;

const CommentAndCreatedtimeContainer = styled.div`
	margin-bottom: 4px;
	&:last-child {
		margin-bottom: 8px;
	}
`;

const Comment = styled.div`
	display: flex;
	align-items: center;
	a {
		color: #262626;
		text-decoration: none;
		font-weight: 600;
		margin-right: 4px;
	}
`;

const LikeComment = styled.button`
	display: inline-block;
	margin: 0 0 0 auto;
	border: 0;
	padding: 0;
	background: none;
	cursor: pointer;
`;

const CreatedTime = styled(Link)`
	font-size: 10px;
	letter-spacing: 0.2px;
	color: #8e8e8e;
	text-transform: uppercase;
`;

const CommentContainer = styled.div`
	display: flex;
	align-items: center;
	border-top: 1px solid #efefef;
	font-size: 14px;
	line-height: 18px;
	min-height: 56px;
	padding: 0 16px;
`;

const CommentForm = styled.form`
	display: flex;
	flex: 1 1 100%;
`;

const CommentTextArea = styled.textarea`
	height: 18px;
	background: none;
	border: 0;
	color: #262626;
	flex-grow: 1;
	outline: 0;
	padding: 0;
	resize: none;
`;

const SubmitButton = styled.button<{ Active: boolean }>`
	cursor: pointer;
	background: 0 0;
	outline: 0;
	border: 0;
	font-weight: 600;
	color: #0095f6;
	${({ Active }) => !Active && "opacity:0.3"}
`;

type ArticleProps = {
	name: string;
	logo: string;
	image: string;
	description: string;
	likes: string;
	comments: { user: string; comment: string | boolean }[];
	commentsLength: number;
	createdTime: string;
	data: MeQuery | undefined;
	liked: boolean;
};

const Article = ({
	name,
	logo,
	image,
	description,
	likes,
	comments,
	commentsLength,
	createdTime,
	data,
	liked
}: ArticleProps) => {
	const [textareaValue, setTextAreaValue] = useState<string | null>(null);
	const onClick = (buttonName: string) => {
		// TODO: Edit this later
		console.log(`${buttonName} Button Clicked.`);
	};

	return (
		<Container>
			<Header>
				<LogoContainer>
					<LogoBackground>
						<Logo src={logo} alt="logo" />
					</LogoBackground>
				</LogoContainer>
				<NameContainer>
					<Name to={`/${name}`}>{name}</Name>
				</NameContainer>
				<More>
					<button type="button">
						<svg fill="#262626" height="16" viewBox="0 0 48 48" width="16">
							<circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5" />
							<circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5" />
							<circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5" />
						</svg>
					</button>
				</More>
			</Header>
			<Image src={image} alt={`Photo by ${name}`} />
			<Details>
				<IconsContainer>
					<span>
						<button type="button" onClick={() => onClick("Like")}>
							{liked ? (
								<svg fill="#ed4956" height="24" viewBox="0 0 48 48" width="24">
									<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
								</svg>
							) : (
								<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
									<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
								</svg>
							)}
						</button>
					</span>
					<span>
						<button type="button" onClick={() => onClick("Comment")}>
							<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
								<path
									clipRule="evenodd"
									d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
									fillRule="evenodd"></path>
							</svg>
						</button>
					</span>
					<span>
						<button type="button" onClick={() => onClick("Share")}>
							<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
								<path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
							</svg>
						</button>
					</span>
					<span>
						<button type="button" onClick={() => onClick("Save")}>
							<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
								<path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
							</svg>
						</button>
					</span>
				</IconsContainer>
				<LikesContainer>
					<div>
						Liked by
						<span>
							<LikesLink to={`/${data?.me?.username === likes ? "/profile" : likes}`}>
								{likes}
							</LikesLink>
						</span>
						and
						<OtherButton type="button" onClick={() => onClick("Others")}>
							others.
						</OtherButton>
					</div>
				</LikesContainer>
				<DescriptionAndCommentsContainer>
					<Description>
						<span>
							<Link to={`/${name}`}>{name}</Link>
							{description}
						</span>
					</Description>
					<CommentsCount>
						<Link to="/p/articleIdHere">{`View all ${commentsLength.toString()} comments`}</Link>
					</CommentsCount>
					{comments.map(({ user, comment }, id) => (
						<CommentAndCreatedtimeContainer key={id}>
							<Comment>
								<Link to={`/${user}`}>{user}</Link>
								<span>{comment}</span>
								<LikeComment type="button" onClick={() => onClick("Comment Like")}>
									<svg fill="#262626" height="12" viewBox="0 0 48 48" width="12">
										<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
									</svg>
								</LikeComment>
							</Comment>
						</CommentAndCreatedtimeContainer>
					))}
					<CommentAndCreatedtimeContainer>
						<CreatedTime to="/p/articleIdHere">{`${timeDifference(createdTime)} ago`}</CreatedTime>
					</CommentAndCreatedtimeContainer>
				</DescriptionAndCommentsContainer>
			</Details>
			<CommentContainer>
				<CommentForm>
					<CommentTextArea
						placeholder="Add a comment…"
						autoComplete="off"
						autoCorrect="off"
						onChange={e => setTextAreaValue(e.target.value)}
					/>
					<SubmitButton
						Active={!!textareaValue}
						onClick={e => {
							e.preventDefault();
							onClick("Submit");
						}}>
						Post
					</SubmitButton>
				</CommentForm>
			</CommentContainer>
		</Container>
	);
};

export default Article;
