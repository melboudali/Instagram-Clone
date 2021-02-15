import { Link } from "react-router-dom";
import styled from "styled-components";

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

const IconContainer = styled.div`
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
	LinkName: string;
	to: string;
	children: React.ReactNode;
}

const NavbarMenuLink = ({ LinkName, to, children }: NavbarMenuLinkProps) => {
	return (
		<MenuListLink to={to}>
			<MenuListContainer>
				<div>
					<IconContainer>{children}</IconContainer>
					<MenuListNameContainer>
						<MenuListName>
							<div>{LinkName}</div>
						</MenuListName>
					</MenuListNameContainer>
				</div>
			</MenuListContainer>
		</MenuListLink>
	);
};

export default NavbarMenuLink;
