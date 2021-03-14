import { Link } from "react-router-dom";
import styled from "styled-components";
import { MeQuery, User_Response } from "../../generated/graphql";
import PropTypes from "prop-types";

const ProfileData = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 44px;
	@media (min-width: 800px) {
		flex-direction: row;
	}
`;

const ProfileHeaderImage = styled.div`
	display: flex;
	justify-content: center;
	margin: 0 0 30px 0;
	@media (min-width: 800px) {
		margin: 0 30px 0 0;
	}
	img {
		border: 1px solid rgba(0, 0, 0, 0.0975);
		height: 100px;
		width: 100px;
		object-fit: cover;
		border-radius: 50%;
		box-sizing: content-box;
		@media (min-width: 800px) {
			height: 150px;
			width: 150px;
		}
	}
`;

const ProfileInformations = styled.section`
	flex: 2 2 30px;
`;

const UsernameContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	@media (min-width: 800px) {
		justify-content: left;
	}
`;

const ProfileHeaderUsername = styled.h2`
	font-weight: 400;
	font-size: 22px;
	color: #262626;
	margin: -3px 0 0;
	text-align: left;
	@media (min-width: 800px) {
		font-size: 28px;
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

const PostsFollowersFollowingContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	color: #262626;
	font-size: 16px;
	margin-bottom: 20px;
	@media (min-width: 800px) {
		flex-direction: row;
		justify-content: stretch;
	}
`;

const PostsFollowersFollowingCount = styled.div`
	& + & {
		margin-top: 10px;
		@media (min-width: 800px) {
			margin-left: 40px;
		}
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
	font-size: 16px;
`;

interface ProfileHeaderProps {
	user: Pick<
		User_Response,
		"image_link" | "username" | "private" | "fullname" | "bio" | "website" | "images_length"
	>;
	loggedInUserData: MeQuery;
	username: string;
}

const ProfileHeader = ({ user, loggedInUserData, username }: ProfileHeaderProps) => {
	return (
		<ProfileData>
			<ProfileHeaderImage>
				<img src={user.image_link} alt="profile" />
			</ProfileHeaderImage>
			<ProfileInformations>
				<UsernameContainer>
					<ProfileHeaderUsername>{user.username}</ProfileHeaderUsername>
					{loggedInUserData.me && loggedInUserData.me.username === username ? (
						<>
							<ProfileHeaderEditButton to="/accounts/edit">Edit Profile</ProfileHeaderEditButton>
						</>
					) : (
						<ProfileHeaderFollowButton to="/">Follow</ProfileHeaderFollowButton>
					)}
				</UsernameContainer>
				<PostsFollowersFollowingContainer>
					<PostsFollowersFollowingCount>
						<span>{user.images_length}</span>posts
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
						href={user.website.includes("http") ? user.website : `https://${user.website}`}>
						{user.website}
					</ProfileHeaderWebsite>
				)}
			</ProfileInformations>
		</ProfileData>
	);
};

ProfileHeader.propTypes = {
	user: PropTypes.object.isRequired,
	loggedInUserData: PropTypes.object.isRequired
};

export default ProfileHeader;
