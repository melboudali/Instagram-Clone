import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../components/Common/Container";
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
	const { data: loggedinUserData } = useMeQuery();
	const username = match.params.username.toLowerCase();
	const { data, loading } = useGetUserQuery({ variables: { username } });

	if (loading) {
		return <LoadingFullScreen />;
	}

	return (
		<>
			{data?.getUser.user && !data.getUser.error ? (
				<Container>
					<Main>
						<ProfileHeader data={data} loggedinUserData={loggedinUserData} />
						{data?.getUser.user?.private ? (
							<ProfileEmptyPostsOrPrivate type="private" />
						) : (
							<>
								<ProfileMenu data={data} page="profile" />
								{!!data.getUser.user.images?.length ? (
									<ProfilePosts posts={data.getUser.user.images} />
								) : (
									<ProfileEmptyPostsOrPrivate type="emptyImages" />
								)}
							</>
						)}
						{!loggedinUserData?.me && <UnauthFooter />}
					</Main>
				</Container>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default Profile;
