import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../Containers/Container";
import ProfilePosts from "../components/Profile/ProfilePosts";
import UnauthFooter from "../components/Common/Footer/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/Profile/ProfileEmptyPostsOrPrivate";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMenu from "../components/Profile/ProfileMenu";
import LoadingFullScreen from "../components/Common/LoadingFullScreen";
import ErrorPage from "./ErrorPage";

const Main = styled.div`
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

	if (
		data == null ||
		data.getUser.user == null ||
		loggedinUserData == null ||
		loggedInError ||
		error
	)
		return <ErrorPage />;

	return (
		<>
			<Container>
				<Main>
					<ProfileHeader user={data.getUser.user} loggedinUserData={loggedinUserData} />
					{data.getUser.user.private ? (
						<ProfileEmptyPostsOrPrivate type="private" />
					) : (
						<>
							<ProfileMenu user={data.getUser.user} page="profile" />
							{data.getUser.user.images.length > 0 ? (
								<ProfilePosts posts={data.getUser.user.images} />
							) : (
								<ProfileEmptyPostsOrPrivate type="emptyImages" />
							)}
						</>
					)}
					{loggedinUserData.me == null && <UnauthFooter />}
				</Main>
			</Container>
		</>
	);
};

export default Profile;
