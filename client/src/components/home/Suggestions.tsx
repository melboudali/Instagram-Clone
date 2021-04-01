import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { User_Response } from "../../generated/graphql";
import useSticky from "../../hooks/useSticky";
import SuggestionsList from "./SuggestionsList";
import PropTypes from "prop-types";
import onClickFunction from "../../utils/onClick";

const EllipsisText = css`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 174px;
`;

const SuggestionsContainer = styled.div<{ sticky: boolean }>`
	right: 0;
	top: 0;
	${({ sticky }) =>
		sticky
			? `
		--SuggestionsLeft: 849px;
		position: fixed;
		left: var(--SuggestionsLeft);
		top:  72px;
		@media only screen and (min-width: 1000px) {
		--SuggestionsLeft: 671px;
		}
		@media only screen and (min-width: 1035px) {
		--SuggestionsLeft: 716px;
		}
		@media only screen and (min-width: 1100px) {
		--SuggestionsLeft: 774.5px;
		}
		@media only screen and (min-width: 1200px) {
		--SuggestionsLeft: calc(((100% - 975px) / 2) + 662px);
		}
        `
			: `
		top: 18px;
		position: absolute;`}

	width: 293px;
	@media only screen and (max-width: 1000px) {
		display: none;
		flex: 0 0 0%;
	}
`;

const CurrentUserContainer = styled.div`
	height: auto;
	margin-bottom: 10px;
`;

const CurrentUserSubContainer = styled.div`
	display: flex;
	align-items: center;
`;

const CurrentUserProfileImage = styled.div`
	margin-right: 12px;
	width: 56px;
	height: 56px;
	a {
	}
`;

const CurrentUserProfileImageLink = styled(Link)`
	img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0px 0px 20px -9px rgba(0, 0, 0, 0.452);
	}
`;

const CurrentUser = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1 1 auto;
	span {
		color: #8e8e8e;
		font-weight: 400;
		${EllipsisText}
	}
`;

const CurrentUserUsername = styled(Link)`
	color: #262626;
	font-weight: 600;
	margin: -3px 0 -2px;
	${EllipsisText}
`;

const SwitchUserContainer = styled.div`
	margin-left: 8px;
	display: flex;
	align-items: center;
	flex: 0 0 auto;
`;

const SwitchUserSwitchButton = styled.button`
	cursor: pointer;
	color: #0095f6;
	font-weight: 600;
	padding: 0;
	background: 0 0;
	border: 0;
	outline: 0;
	font-size: 12px;
	line-height: 14px;
	margin: -2px 0 -3px;
`;

const SuggestionsMain = styled.div`
	background-color: #fafafa;
	margin: 0 0 12px -16px;
	width: calc(100% + 32px);
`;

const SuggestionsLinksContainer = styled.nav`
	margin-bottom: 16px;
`;

const SuggestionsLinksList = styled.ul`
	list-style: none;
	width: 100%;
	padding: 0;
	margin: 0 3px 0 0;
`;

const SuggestionsLinkItem = styled.li`
	display: inline-block;
	margin: 0;
`;

const SuggestionsListLink = styled(Link)`
	color: #c7c7c7;
	font-size: 11px;
	font-weight: 400;
	line-height: 13px;
	display: flex;
	align-items: center;
	&::after {
		content: "";
		display: inline-block;
		margin: 0 3px;
		border-radius: 5px;
		background: #c7c7c7;
	}
`;

const SignatureContainer = styled.span`
	text-transform: uppercase;
	font-size: 11px;
	font-weight: 400;
	line-height: 13px;
	color: #8e8e8e;
	padding-bottom: 50px;
`;

interface SuggestionsProps {
	meData: Partial<User_Response>;
}

const Suggestions = ({ meData: { username, image_link, fullname } }: SuggestionsProps) => {
	const sticky = useSticky(337);

	const linksData: string[] = [
		"About",
		"Help",
		"Press",
		"API",
		"Jobs",
		"Privacy",
		"Terms",
		"Locations",
		"Top Accounts",
		"Hashtags",
		"Language"
	];

	return (
		<SuggestionsContainer sticky={sticky}>
			<CurrentUserContainer>
				<CurrentUserSubContainer>
					<CurrentUserProfileImage>
						<CurrentUserProfileImageLink to={`/${username}`}>
							<img src={image_link} alt={`${image_link}'s profile`} />
						</CurrentUserProfileImageLink>
					</CurrentUserProfileImage>
					<CurrentUser>
						<CurrentUserUsername to={`/${username}`}>{username}</CurrentUserUsername>
						<span>{fullname}</span>
					</CurrentUser>
					<SwitchUserContainer>
						<SwitchUserContainer>
							<SwitchUserSwitchButton type="button" onClick={onClickFunction}>
								Switch
							</SwitchUserSwitchButton>
						</SwitchUserContainer>
					</SwitchUserContainer>
				</CurrentUserSubContainer>
			</CurrentUserContainer>
			<SuggestionsMain>
				<SuggestionsList onClickFunction={onClickFunction} />
			</SuggestionsMain>
			<div>
				<SuggestionsLinksContainer>
					<SuggestionsLinksList>
						{linksData.map((link, id) => (
							<SuggestionsLinkItem key={id}>
								<SuggestionsListLink to={`/${link}`}>{link}</SuggestionsListLink>
							</SuggestionsLinkItem>
						))}
					</SuggestionsLinksList>
				</SuggestionsLinksContainer>
				<SignatureContainer>© 2021 Instagram from Facebook</SignatureContainer>
			</div>
		</SuggestionsContainer>
	);
};

Suggestions.propTypes = {
	meData: PropTypes.object.isRequired
};

export default Suggestions;
