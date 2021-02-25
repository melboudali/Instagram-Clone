import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const MenuListLink = styled(Link)`
	cursor: pointer;
	&:hover > div {
		background: #fafafa;
	}
`;

const MenuListContainer = styled.div`
	padding: 8px 16px;
	& > div {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: -3px 0 -4px;
	}
`;

const MenuIconContainer = styled.div`
	margin-right: 12px;
	width: 16px;
	height: 16px;
	svg {
		width: 16px;
		height: 16px;
	}
`;

const MenuListNameContainer = styled.div`
	display: flex;
	flex: 1 1 auto;
	min-height: 0;
	min-width: 0;
	justify-content: center;
`;

const MenuListName = styled.div`
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

interface NavbarMenuLinkProps {
	linkName: string;
	to: string;
	children: React.ReactNode;
}

const NavbarMenuLink = ({ linkName, to, children }: NavbarMenuLinkProps) => {
	return (
		<MenuListLink to={to}>
			<MenuListContainer>
				<div>
					<MenuIconContainer>{children}</MenuIconContainer>
					<MenuListNameContainer>
						<MenuListName>
							<div>{linkName}</div>
						</MenuListName>
					</MenuListNameContainer>
				</div>
			</MenuListContainer>
		</MenuListLink>
	);
};

NavbarMenuLink.propTypes = {
	linkName: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};

export default NavbarMenuLink;
