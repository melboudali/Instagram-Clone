import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import UnauthFooter from "../components/UnauthFooter";
import EmptyAndPrivateProfile from "../components/EmptyAndPrivateProfile";

const Main = styled.div`
	margin: 30px auto 0;
`;

const ProfileData = styled.header`
	display: flex;
	justify-content: center;
	margin-bottom: 44px;
`;

const ProfileImage = styled.div`
	display: flex;
	justify-content: center;
	flex: 1 1 0;
	margin-right: 30px;

	img {
		border: 1px solid rgba(0, 0, 0, 0.0975);
		height: 150px;
		width: 150px;
		object-fit: cover;
		border-radius: 50%;
		box-sizing: content-box;
	}
`;

const ProfileInformations = styled.section`
	flex: 2 2 30px;
`;

const UsernameContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Username = styled.h2`
	font-weight: 300;
	font-size: 28px;
	line-height: 32px;
	color: #262626;
	margin: 0;
	text-align: left;
	@media only screen and (max-width: 763px) {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 170px;
	}
`;

const FollowButton = styled(Link)`
	background: var(--buttonLightBlue);
	color: #fff;
	font-weight: 600;
	border-radius: 4px;
	padding: 5px 9px;
	margin-left: 20px;
	text-align: center;
`;

const EditButton = styled(Link)`
	margin-left: 20px;
	border: 1px solid #dbdbdb;
	color: #262626;
	border-radius: 4px;
	font-weight: 600;
	padding: 5px 9px;
	text-align: center;
`;

const OptionsButton = styled.button`
	margin-left: 5px;
	cursor: pointer;
	padding: 0;
	background: 0 0;
	border: 0;
	outline: 0;
	display: flex;
	align-items: center;
`;

const PostsFollowersFollowingContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	color: #262626;
	font-size: 16px;
	margin-bottom: 20px;
`;

const PostsFollowersFollowingCount = styled.div`
	&:nth-child(1),
	&:nth-child(2) {
		margin-right: 40px;
	}
	span {
		font-weight: 600;
		margin-right: 5px;
	}
`;

const Fullname = styled.h1`
	display: block;
	font-size: 16px;
	font-weight: 600;
	color: #262626;
	margin: 0;
`;

const Bio = styled.p`
	display: block;
	font-size: 16px;
	color: #262626;
	margin: 3px 0;
`;

const Website = styled.a`
	display: block;
	font-weight: 600;
	color: #00376b;
	text-decoration: none;
	font-size: 16px;
`;

const PostAndTaggedMenu = styled.div`
	width: 100%;
	border-top: 1px solid #dbdbdb;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PostsMenu = styled(Link)`
	display: flex;
	align-items: center;
	color: #262626;
	margin-top: -1px;
	height: 52px;
	&:nth-child(1) {
		margin-right: 60px;
		border-top: 1px solid #262626;
	}
	&:nth-child(2) {
		span {
			color: #8e8e8e;
		}
	}
	span {
		margin-left: 6px;
		letter-spacing: 1px;
		text-align: center;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
	}
`;

type ProfileProps = {
	match: { params: { username: string } };
};

const Profile = ({ match }: ProfileProps) => {
	const { data: loggedinUserData } = useMeQuery();
	const username = match.params.username.toLowerCase();
	const { data, loading } = useGetUserQuery({ variables: { username } });
	return (
		<Container>
			{data?.getUser.user && !loading ? (
				<Main>
					<ProfileData>
						<ProfileImage>
							<img src={data.getUser.user?.image_link} alt="profile" />
						</ProfileImage>
						<ProfileInformations>
							<UsernameContainer>
								<Username>{data.getUser.user?.username}</Username>
								{loggedinUserData?.me ? (
									<>
										<EditButton to="/accounts/edit">Edit Profile</EditButton>
										<OptionsButton type="button">
											<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
												<path
													clipRule="evenodd"
													d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
													fillRule="evenodd"></path>
											</svg>
										</OptionsButton>
									</>
								) : (
									<FollowButton to="/">Follow</FollowButton>
								)}
							</UsernameContainer>
							<PostsFollowersFollowingContainer>
								<PostsFollowersFollowingCount>
									<span>{data.getUser.user.images?.length}</span>posts
								</PostsFollowersFollowingCount>
								<PostsFollowersFollowingCount>
									<span>0</span>followers
								</PostsFollowersFollowingCount>
								<PostsFollowersFollowingCount>
									<span>0</span>following
								</PostsFollowersFollowingCount>
							</PostsFollowersFollowingContainer>
							<Fullname>{data.getUser.user.fullname}</Fullname>
							{data.getUser.user.bio && <Bio>{data.getUser.user.bio}</Bio>}
							{data.getUser.user.website && (
								<Website target="_blank" href={data.getUser.user.website}>
									{data.getUser.user.website}
								</Website>
							)}
						</ProfileInformations>
					</ProfileData>

					{!data.getUser.user.private && (
						<PostAndTaggedMenu>
							<PostsMenu to={`/${data.getUser.user.username}`}>
								<svg fill="#262626" height="12" viewBox="0 0 48 48" width="12">
									<path
										clipRule="evenodd"
										d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
										fillRule="evenodd"></path>
								</svg>
								<span>Posts</span>
							</PostsMenu>
							<PostsMenu to={`/${data.getUser.user.username}/tagged`}>
								<svg fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12">
									<path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path>
								</svg>
								<span>Tagged</span>
							</PostsMenu>
						</PostAndTaggedMenu>
					)}
					{!!data.getUser.user.images?.length ? (
						<Posts posts={data.getUser.user.images} />
					) : (
						<EmptyAndPrivateProfile type="emptyImages" />
					)}
					{!loggedinUserData?.me && <UnauthFooter />}
				</Main>
			) : (
				<> {data?.getUser.error?.message}</>
			)}
		</Container>
	);
};

export default Profile;
