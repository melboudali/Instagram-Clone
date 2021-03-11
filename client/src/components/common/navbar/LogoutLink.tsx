import { MeDocument, MeQuery, useLogoutMutation } from "../../../generated/graphql";
import styled from "styled-components";
import PropTypes from "prop-types";

const LogoutLinkContainer = styled.div`
	cursor: pointer;
	outline: 0;
	&:hover > div {
		background: #fafafa;
	}
`;

const LogoutLinkMain = styled.div`
	padding: 8px 16px;
	& > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: -3px 0 -4px;
	}
`;

const LogoutLinkIconContainer = styled.div`
	margin-right: 12px;
	width: 16px;
	height: 16px;
	svg {
		width: 16px;
		height: 16px;
	}
`;

const LogoutLinkNameContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	min-height: 0;
	min-width: 0;
	justify-content: center;
`;

const LogoutLinkName = styled.div`
	display: flex;
	height: 28px;
	width: 170px;

	div {
		align-self: center;
		font-weight: 400;
		font-size: 14px;
		text-transform: capitalize;
		color: #262626;
	}
`;

interface LogoutLinkProps {
	children: React.ReactNode;
}

const LogoutLink = ({ children }: LogoutLinkProps) => {
	const [logout] = useLogoutMutation();

	const logoutFunc = async () => {
		await logout({
			update: cache => {
				cache.writeQuery<MeQuery>({
					query: MeDocument,
					data: {
						__typename: "Query",
						me: null
					}
				});
			}
		});
		return;
	};

	return (
		<LogoutLinkContainer role="button" onClick={logoutFunc}>
			<LogoutLinkMain>
				<div>
					<LogoutLinkIconContainer>{children}</LogoutLinkIconContainer>
					<LogoutLinkNameContainer>
						<LogoutLinkName>
							<div>log out</div>
						</LogoutLinkName>
					</LogoutLinkNameContainer>
				</div>
			</LogoutLinkMain>
		</LogoutLinkContainer>
	);
};

LogoutLink.propTypes = {
	children: PropTypes.node.isRequired
};

export default LogoutLink;
