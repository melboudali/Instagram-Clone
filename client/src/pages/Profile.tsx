import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../containers/Container";
import ProfilePosts from "../components/profile/ProfilePosts";
import UnauthFooter from "../components/common/footer/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/profile/ProfileEmptyPostsOrPrivate";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileMenu from "../components/profile/ProfileMenu";
import LoadingFullScreen from "./others/LoadingFullScreen";
import ErrorPage from "./error/ErrorPage";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const ProfileContainer = styled.div`
	margin: 30px auto 0;
`;

interface ProfileProps {
	match: { params: { username: string } };
}

const Profile = ({ match }: ProfileProps) => {
	const { data: loggedInUserData, loading: meLoading, error: loggedInError } = useMeQuery();
	const username = match.params.username.toLowerCase();
	const { data, loading, error } = useGetUserQuery({
		variables: { username, currentUserId: loggedInUserData?.me?.id }
	});

	if (loading || meLoading) {
		return <LoadingFullScreen />;
	}

	if (!data || !data.getUser.user || !loggedInUserData || loggedInError || error) return <ErrorPage />;

	return (
		<>
			<Helmet>
				<title>{`${data.getUser.user.fullname}
				(@${data.getUser.user.username}) - Instagram Clone`}</title>
				<meta name="title" content={`${data.getUser.user.fullname} (@${data.getUser.user.username}) - Instagram Clone`} />
				<meta property="og:title" content={`${data.getUser.user.fullname} (@${data.getUser.user.username}) - Instagram Clone`} />
				<meta property="twitter:title" content={`${data.getUser.user.fullname} (@${data.getUser.user.username}) - Instagram Clone`} />
				<meta name="description" content={`${data.getUser.user.fullname} - ${data.getUser.user.bio}`} />
				<meta property="og:description" content={`${data.getUser.user.fullname} - ${data.getUser.user.bio}`} />
				<meta property="twitter:description" content={`${data.getUser.user.fullname} - ${data.getUser.user.bio}`} />
			</Helmet>
			<Container>
				<ProfileContainer>
					<ProfileHeader user={data.getUser.user} loggedInUserData={loggedInUserData} usernameParam={username} />
					{data.getUser.user.private && loggedInUserData.me?.id !== data.getUser.user.id ? (
						<ProfileEmptyPostsOrPrivate type="private" />
					) : (
						<>
							<ProfileMenu user={data.getUser.user} page="profile" />
							<ProfilePosts
								userId={data.getUser.user.id}
								currentUserId={loggedInUserData.me?.id}
								isPrivate={data.getUser.user.private as boolean}
								isDisabled={data.getUser.user.disabled as boolean}
							/>
						</>
					)}
					{!loggedInUserData.me && <UnauthFooter />}
				</ProfileContainer>
			</Container>
		</>
	);
};

Profile.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			username: PropTypes.string.isRequired
		})
	})
};

export default Profile;
