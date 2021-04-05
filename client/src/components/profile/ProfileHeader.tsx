import { Link } from "react-router-dom";
import styled from "styled-components";
import { MeQuery, User_Response } from "../../generated/graphql";
import PropTypes from "prop-types";
import onClickFunction from "../../utils/onClick";

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
	color: var(--textColorDarkGray);
	margin: -3px 0 0;
	text-align: left;
	@media (min-width: 800px) {
		font-size: 28px;
	}
`;

const ProfileHeaderFollowButton = styled.button`
	background: var(--buttonLightBlue);
	color: var(--whiteColor);
	font-weight: 600;
	border-radius: 4px;
	padding: 5px 9px;
	margin-left: 20px;
	text-align: center;
`;

const ProfileHeaderEditButton = styled(Link)`
	margin-left: 20px;
	border: 1px solid var(--borderColor);
	color: var(--textColorDarkGray);
	border-radius: 4px;
	font-weight: 600;
	padding: 5px 9px;
	text-align: center;
`;

const PostsFollowersFollowingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	color: var(--textColorDarkGray);
	font-size: 14px;
	margin-bottom: 20px;
	@media (min-width: 800px) {
		font-size: 16px;
		justify-content: flex-start;
	}
`;

const PostsFollowersFollowingCount = styled.div`
	& + & {
		margin: 0 0 0 20px;
		@media (min-width: 800px) {
			margin: 0 0 0 40px;
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
	color: var(--textColorDarkGray);
	margin: 0;
`;

const ProfileHeaderBio = styled.p`
	display: block;
	font-size: 16px;
	color: var(--textColorDarkGray);
	margin: 3px 0;
`;

const ProfileHeaderWebsite = styled.a`
	display: block;
	font-weight: 600;
	color: var(--linkColorTwo);
	font-size: 16px;
`;

interface ProfileHeaderProps {
	user: Pick<User_Response, "image_link" | "username" | "private" | "fullname" | "bio" | "website" | "images_length">;
	loggedInUserData: MeQuery;
	usernameParam: string;
}

const ProfileHeader = ({
	user: { username, image_link, images_length, fullname, bio, website },
	loggedInUserData: { me: Data },
	usernameParam
}: ProfileHeaderProps) => {
	return (
		<ProfileData>
			<ProfileHeaderImage>
				<img src={image_link} alt="profile" />
			</ProfileHeaderImage>
			<ProfileInformations>
				<UsernameContainer>
					<ProfileHeaderUsername>{username}</ProfileHeaderUsername>
					{Data && Data.username === usernameParam ? (
						<>
							<ProfileHeaderEditButton to="/accounts/edit">Edit Profile</ProfileHeaderEditButton>
						</>
					) : (
						<ProfileHeaderFollowButton type="button" onClick={onClickFunction}>
							Follow
						</ProfileHeaderFollowButton>
					)}
				</UsernameContainer>
				<PostsFollowersFollowingContainer>
					<PostsFollowersFollowingCount>
						<span>{images_length}</span>posts
					</PostsFollowersFollowingCount>
					<PostsFollowersFollowingCount>
						<span>0</span>followers
					</PostsFollowersFollowingCount>
					<PostsFollowersFollowingCount>
						<span>0</span>following
					</PostsFollowersFollowingCount>
				</PostsFollowersFollowingContainer>
				<ProfileHeaderFullname>{fullname}</ProfileHeaderFullname>
				{bio && <ProfileHeaderBio>{bio}</ProfileHeaderBio>}
				{website && (
					<ProfileHeaderWebsite target="_blank" href={website.includes("http") ? website : `https://${website}`}>
						{website}
					</ProfileHeaderWebsite>
				)}
			</ProfileInformations>
		</ProfileData>
	);
};

ProfileHeader.propTypes = {
	user: PropTypes.object.isRequired,
	loggedInUserData: PropTypes.object.isRequired,
	usernameParam: PropTypes.string.isRequired
};

export default ProfileHeader;
