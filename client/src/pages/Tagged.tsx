import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../containers/Container";
import UnauthFooter from "../components/common/footer/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/profile/ProfileEmptyPostsOrPrivate";
import LoadingFullScreen from "../components/common/LoadingFullScreen";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileMenu from "../components/profile/ProfileMenu";
import ErrorPage from "./ErrorPage";

const TaggedContainer = styled.div`
	margin: 30px auto 0;
`;

interface TaggedProps {
	match: { params: { username: string } };
}

const Tagged = ({ match }: TaggedProps) => {
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
			{data.getUser.user && !data.getUser.error ? (
				<Container>
					<TaggedContainer>
						<ProfileHeader user={data.getUser.user} loggedinUserData={loggedinUserData} />

						{data.getUser.user.private ? (
							<ProfileEmptyPostsOrPrivate type="private" />
						) : (
							<>
								<ProfileMenu user={data.getUser.user} page="tagged" />
								<ProfileEmptyPostsOrPrivate type="emptyTagged" />
							</>
						)}
						{!loggedinUserData.me && <UnauthFooter />}
					</TaggedContainer>
				</Container>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default Tagged;
