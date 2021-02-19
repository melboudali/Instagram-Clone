import { Link } from "react-router-dom";
import styled from "styled-components";
import { MeQuery, User_Response } from "../../generated/graphql";

const ProfileData = styled.header`
	display: flex;
	justify-content: center;
	margin-bottom: 44px;
`;

const ProfileHeaderImage = styled.div`
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

const ProfileHeaderUsername = styled.h2`
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

const ProfileHeaderFollowButton = styled(Link)`
	background: var(--buttonLightBlue);
	color: #fff;
	font-weight: 600;
	border-radius: 4px;
	padding: 5px 9px;
	margin-left: 20px;
	text-align: center;
`;

const ProfileHeaderEditButton = styled(Link)`
	margin-left: 20px;
	border: 1px solid #dbdbdb;
	color: #262626;
	border-radius: 4px;
	font-weight: 600;
	padding: 5px 9px;
	text-align: center;
`;

const ProfileHeaderOptionsButton = styled.button`
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

const ProfileHeaderFullname = styled.h1`
	display: block;
	font-size: 16px;
	font-weight: 600;
	color: #262626;
	margin: 0;
`;

const ProfileHeaderBio = styled.p`
	display: block;
	font-size: 16px;
	color: #262626;
	margin: 3px 0;
`;

const ProfileHeaderWebsite = styled.a`
	display: block;
	font-weight: 600;
	color: #00376b;
	text-decoration: none;
	font-size: 16px;
`;

interface ProfileHeaderProps {
	user: Pick<
		User_Response,
		"image_link" | "username" | "images" | "private" | "fullname" | "bio" | "website"
	>;
	loggedinUserData: MeQuery;
}

const ProfileHeader = ({ user, loggedinUserData }: ProfileHeaderProps) => {
	return (
		<ProfileData>
			<ProfileHeaderImage>
				<img src={user.image_link} alt="profile" />
			</ProfileHeaderImage>
			<ProfileInformations>
				<UsernameContainer>
					<ProfileHeaderUsername>{user.username}</ProfileHeaderUsername>
					{loggedinUserData.me ? (
						<>
							<ProfileHeaderEditButton to="/accounts/edit">Edit Profile</ProfileHeaderEditButton>
							<ProfileHeaderOptionsButton type="button">
								<svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
									<path
										clipRule="evenodd"
										d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
										fillRule="evenodd"></path>
								</svg>
							</ProfileHeaderOptionsButton>
						</>
					) : (
						<ProfileHeaderFollowButton to="/">Follow</ProfileHeaderFollowButton>
					)}
				</UsernameContainer>
				<PostsFollowersFollowingContainer>
					<PostsFollowersFollowingCount>
						<span>{user.images?.length}</span>posts
					</PostsFollowersFollowingCount>
					<PostsFollowersFollowingCount>
						<span>0</span>followers
					</PostsFollowersFollowingCount>
					<PostsFollowersFollowingCount>
						<span>0</span>following
					</PostsFollowersFollowingCount>
				</PostsFollowersFollowingContainer>
				<ProfileHeaderFullname>{user.fullname}</ProfileHeaderFullname>
				{user.bio && <ProfileHeaderBio>{user.bio}</ProfileHeaderBio>}
				{user.website && (
					<ProfileHeaderWebsite
						target="_blank"
						href={
							!user.website.includes("https") || !user.website.includes("http")
								? `https://${user.website}`
								: user.website
						}>
						{user.website}
					</ProfileHeaderWebsite>
				)}
			</ProfileInformations>
		</ProfileData>
	);
};

export default ProfileHeader;
