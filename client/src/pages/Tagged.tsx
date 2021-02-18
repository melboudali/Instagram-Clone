import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../Containers/Container";
import UnauthFooter from "../components/Common/Footer/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/Profile/ProfileEmptyPostsOrPrivate";
import LoadingFullScreen from "../components/Common/LoadingFullScreen";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMenu from "../components/Profile/ProfileMenu";
import ErrorPage from "./ErrorPage";

const Main = styled.div`
	margin: 30px auto 0;
`;

interface TaggedProps {
	match: { params: { username: string } };
}

const Tagged = ({ match }: TaggedProps) => {
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
								<ProfileMenu data={data} page="tagged" />
								<ProfileEmptyPostsOrPrivate type="emptyTagged" />
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

export default Tagged;
