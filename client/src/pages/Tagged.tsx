import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import UnauthFooter from "../components/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/ProfileEmptyPostsOrPrivate";
import LoadingFullScreen from "../components/layouts/LoadingFullScreen";
import ProfileHeader from "../components/ProfileHeader";
import ProfilePosts from "../components/ProfilePosts";
import ProfileNotFound from "../components/ProfileNotFound";
import ProfileMenu from "../components/ProfileMenu";

const Main = styled.div`
	margin: 30px auto 0;
`;

type TaggedProps = {
	match: { params: { username: string } };
};

const Tagged = ({ match }: TaggedProps) => {
	const { data: loggedinUserData } = useMeQuery();
	const username = match.params.username.toLowerCase();
	const { data, loading } = useGetUserQuery({ variables: { username } });

	if (loading) {
		return <LoadingFullScreen />;
	}

	if (data?.getUser.user?.private) {
		return <ProfileEmptyPostsOrPrivate type="private" />;
	}

	return (
		<Container>
			{data?.getUser.user && !data.getUser.error ? (
				<Main>
					<ProfileHeader data={data} loggedinUserData={loggedinUserData} />
					{!data.getUser.user.private && <ProfileMenu data={data} page="tagged" />}
					{!!data.getUser.user.images?.length ? (
						<ProfilePosts posts={data.getUser.user.images} />
					) : (
						<ProfileEmptyPostsOrPrivate type="emptyTagged" />
					)}
					{!loggedinUserData?.me && <UnauthFooter />}
				</Main>
			) : (
				<ProfileNotFound />
			)}
		</Container>
	);
};

export default Tagged;
