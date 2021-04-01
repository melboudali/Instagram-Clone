import { useGetSuggestedUsersQuery } from "../../generated/graphql";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import SuggestionsError from "../common/errors/SuggestionsError";
import LoadingSpinner from "../common/LoadingSpinner";
import PropTypes from "prop-types";
import { MouseEventHandler } from "react";

const EllipsisText = css`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 174px;
`;

const SuggestionsTitleContainer = styled.div`
	display: flex;
	padding: 4px 16px 12px;
	margin-top: 12px;
	font-size: 12px;
	line-height: 14px;
	margin: -2px 0 -3px;
	span {
		color: #8e8e8e;
		flex: 1 1 auto;
		font-weight: 600;
	}
`;

const SeeAllLink = styled(Link)`
	color: #262626;
	font-weight: 600;
`;

const SuggestionContainer = styled.div`
	padding: 8px 16px;
	display: flex;
	align-items: center;
`;

const SuggestedProfileImage = styled.div`
	margin-right: 12px;
	width: 32px;
	height: 32px;
`;

const SuggestedProfileImageLink = styled(Link)`
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0px 0px 20px -9px rgba(0, 0, 0, 0.75);
	}
`;

const SuggestedProfileName = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1 1 auto;
	span {
		color: #8e8e8e;
		font-weight: 400;
		font-size: 12px;
		line-height: 14px;
		margin: 1px 0 -3px;
	}
`;

const SuggestedUserName = styled(Link)`
	color: #262626;
	font-weight: 600;
	margin: -3px 0 -2px;
	${EllipsisText}
`;

const SuggestedSwitchButtonContainer = styled.div`
	margin-left: 8px;
	display: flex;
	align-items: center;
	flex: 0 0 auto;
`;

const SuggestedSwitchButton = styled.button`
	cursor: pointer;
	color: #0095f6;
	font-weight: 600;
	padding: 0;
	background: 0 0;
	border: 0;
	outline: 0;
	font-size: 12px;
	margin: -2px 0 -3px;
`;

interface SuggestionsListProps {
	onClickFunction: MouseEventHandler<HTMLButtonElement>;
}

const SuggestionsList = ({ onClickFunction }: SuggestionsListProps) => {
	const { data, loading, error } = useGetSuggestedUsersQuery();

	if (loading) return <LoadingSpinner margin="60px 0" />;

	if (!data || !data.suggestedUsers.users.length || error) return <SuggestionsError />;

	return (
		<>
			<>
				<SuggestionsTitleContainer>
					<span>Suggestions For You</span>
					<SeeAllLink to="#">See All</SeeAllLink>
				</SuggestionsTitleContainer>
				{data.suggestedUsers.users.map(({ id, username, image_link }) => (
					<SuggestionContainer key={id}>
						<SuggestedProfileImage>
							<SuggestedProfileImageLink to={`/${username}`}>
								<img src={image_link} alt={`${username}'s profile`} />
							</SuggestedProfileImageLink>
						</SuggestedProfileImage>
						<SuggestedProfileName>
							<SuggestedUserName to={`/${username}`}>{username}</SuggestedUserName>
							<span>New to Instagram</span>
						</SuggestedProfileName>
						<SuggestedSwitchButtonContainer>
							<SuggestedSwitchButton type="button" onClick={onClickFunction}>
								Follow
							</SuggestedSwitchButton>
						</SuggestedSwitchButtonContainer>
					</SuggestionContainer>
				))}
			</>
		</>
	);
};

SuggestionsList.propTypes = {
	onClickFunction: PropTypes.func.isRequired
};

export default SuggestionsList;
