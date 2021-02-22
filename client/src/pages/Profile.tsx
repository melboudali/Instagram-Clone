import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../containers/Container";
import ProfilePosts from "../components/profile/ProfilePosts";
import UnauthFooter from "../components/common/footer/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/profile/ProfileEmptyPostsOrPrivate";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileMenu from "../components/profile/ProfileMenu";
import LoadingFullScreen from "../components/common/LoadingFullScreen";
import ErrorPage from "./ErrorPage";

const ProfileContainer = styled.div`
	margin: 30px auto 0;
`;

interface ProfileProps {
	match: { params: { username: string } };
}

const Profile = ({ match }: ProfileProps) => {
	const { data: loggedinUserData, error: loggedInError } = useMeQuery();
	const username = match.params.username.toLowerCase();
	const { data, loading, error } = useGetUserQuery({ variables: { username } });

	if (loading) {
		return <LoadingFullScreen />;
	}

	if (!data || !data.getUser.user || !loggedinUserData || loggedInError || error)
		return <ErrorPage />;

	return (
		<>
			<Container>
				<ProfileContainer>
					<ProfileHeader user={data.getUser.user} loggedinUserData={loggedinUserData} />
					{data.getUser.user.private ? (
						<ProfileEmptyPostsOrPrivate type="private" />
					) : (
						<>
							<ProfileMenu user={data.getUser.user} page="profile" />
							{data.getUser.user.images.length ? (
								<ProfilePosts posts={data.getUser.user.images} />
							) : (
								<ProfileEmptyPostsOrPrivate type="emptyImages" />
							)}
						</>
					)}
					{!loggedinUserData.me && <UnauthFooter />}
				</ProfileContainer>
			</Container>
		</>
	);
};

export default Profile;
