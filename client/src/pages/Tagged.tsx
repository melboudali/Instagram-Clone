import { useGetUserQuery, useMeQuery } from "../generated/graphql";
import styled from "styled-components";
import Container from "../containers/Container";
import UnauthFooter from "../components/common/footer/UnauthFooter";
import ProfileEmptyPostsOrPrivate from "../components/profile/ProfileEmptyPostsOrPrivate";
import LoadingFullScreen from "./others/LoadingFullScreen";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileMenu from "../components/profile/ProfileMenu";
import ErrorPage from "./error/ErrorPage";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const TaggedContainer = styled.div`
	margin: 30px auto 0;
`;

interface TaggedProps {
	match: { params: { username: string } };
}

const Tagged = ({ match }: TaggedProps) => {
	const { data: loggedInUserData, loading: meLoading, error: loggedInError } = useMeQuery();
	const username = match.params.username.toLowerCase();
	const { data, loading, error } = useGetUserQuery({
		variables: { username, currentUserId: loggedInUserData?.me?.id as number }
	});

	if (loading || meLoading) {
		return <LoadingFullScreen />;
	}

	if (!data || !data.getUser.user || !loggedInUserData || loggedInError || error || data.getUser.error) return <ErrorPage />;

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
				<TaggedContainer>
					<ProfileHeader user={data.getUser.user} loggedInUserData={loggedInUserData} usernameParam={username} />

					{data.getUser.user.private && loggedInUserData.me?.id !== data.getUser.user.id ? (
						<ProfileEmptyPostsOrPrivate type="private" />
					) : (
						<>
							<ProfileMenu user={data.getUser.user} page="tagged" />
							<ProfileEmptyPostsOrPrivate type="emptyTagged" />
						</>
					)}
					{!loggedInUserData.me && <UnauthFooter />}
				</TaggedContainer>
			</Container>
		</>
	);
};

Tagged.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			username: PropTypes.string.isRequired
		})
	})
};

export default Tagged;
