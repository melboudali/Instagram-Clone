import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../components/Container";
import ProfilePosts from "../components/ProfilePosts";
import UnauthFooter from "../components/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/ProfileEmptyPostsOrPrivate";
import ProfileHeader from "../components/ProfileHeader";
import ProfileMenu from "../components/ProfileMenu";
import ProfileNotFound from "../components/ProfileNotFound";
import LoadingFullScreen from "../components/layouts/LoadingFullScreen";

const Main = styled.div`
	margin: 30px auto 0;
`;

type ProfileProps = {
	match: { params: { username: string } };
};

const Profile = ({ match }: ProfileProps) => {
	const { data: loggedinUserData } = useMeQuery();
	const username = match.params.username.toLowerCase();
	const { data, loading } = useGetUserQuery({ variables: { username } });

	if (loading) {
		return <LoadingFullScreen />;
	}

	return (
		<Container>
			{data?.getUser.user && !data.getUser.error ? (
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
			) : (
				<ProfileNotFound />
			)}
		</Container>
	);
};

export default Profile;
