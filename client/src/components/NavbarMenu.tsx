import styled from "styled-components";
import { MeQuery } from "../generated/graphql";
import LogoutLink from "./layouts/LogoutLink";
import NavbarMenuLink from "./layouts/NavbarMenuLink";

const MenuContainer = styled.div`
	margin-left: -180px;
	top: 15px;
	position: relative;
`;

const Menu = styled.div<{ showMenu: boolean }>`
	transform-origin: top center;

	${({ showMenu }) =>
		showMenu
			? "transform: translateY(0);opacity: 1;visibility: visible;"
			: "opacity: 0;transform: translateY(-10px);visibility:hidden;"}

	transition: opacity 75ms linear, transform 38ms ease-out, visibility 75ms linear;
	background: #fff;
	border-radius: 6px;
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
	position: absolute;
	z-index: 3;
`;

const Bubble = styled.div`
	left: 184px;
	bottom: 0;
	top: -6px;
	background: #fff;
	border: 1px solid #fff;
	bottom: -6px;
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
	height: 14px;
	position: absolute;
	transform: rotate(45deg);
	width: 14px;
`;

const MenuList = styled.div`
	background: #fff;
	border-radius: 6px;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	position: relative;
	width: 100%;
`;

const Hr = styled.hr`
	background-color: #dbdbdb;
	border: 0;
	height: 1px;
	margin: 4px 0;
	width: 100%;
`;

type NavbarMenuProps = {
	data: MeQuery | undefined;
	showMenu: boolean;
};

const NavbarMenu = ({ data, showMenu }: NavbarMenuProps) => {
	return (
		<MenuContainer>
			<Menu showMenu={showMenu}>
				<Bubble />
				<MenuList>
					<NavbarMenuLink LinkName="profile" to={`/${data?.me?.username}`}>
						<svg fill="#262626" height="16" viewBox="0 0 32 32" width="16">
							<path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path>
						</svg>
					</NavbarMenuLink>
					<NavbarMenuLink LinkName="saved" to={`/${data?.me?.username}/saved`}>
						<svg fill="#262626" height="16" viewBox="0 0 32 32" width="16">
							<path d="M28.7 32c-.4 0-.8-.2-1.1-.4L16 19.9 4.4 31.6c-.4.4-1.1.6-1.6.3-.6-.2-.9-.8-.9-1.4v-29C1.8.7 2.5 0 3.3 0h25.4c.8 0 1.5.7 1.5 1.5v29c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM4.8 3v23.9l9.4-9.4c.9-.9 2.6-.9 3.5 0l9.4 9.4V3H4.8z"></path>
						</svg>
					</NavbarMenuLink>
					<NavbarMenuLink LinkName="settings" to="/accounts/edit">
						<svg fill="#262626" height="16" viewBox="0 0 32 32" width="16">
							<path d="M28.7 32c-.4 0-.8-.2-1.1-.4L16 19.9 4.4 31.6c-.4.4-1.1.6-1.6.3-.6-.2-.9-.8-.9-1.4v-29C1.8.7 2.5 0 3.3 0h25.4c.8 0 1.5.7 1.5 1.5v29c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM4.8 3v23.9l9.4-9.4c.9-.9 2.6-.9 3.5 0l9.4 9.4V3H4.8z"></path>
						</svg>
					</NavbarMenuLink>
					<NavbarMenuLink LinkName="switch accounts" to="/accounts/edit">
						<svg fill="#262626" height="16" viewBox="0 0 32 32" width="16">
							<path d="M10.3 10.7c0-.8-.7-1.5-1.5-1.5H4.9C7.2 5.4 11.4 3 16 3c3.6 0 7 1.5 9.5 4.1.5.6 1.5.6 2.1.1.6-.6.6-1.5.1-2.1-3-3.2-7.3-5-11.7-5C10.7 0 6 2.5 3 6.7V3.5C3 2.7 2.3 2 1.5 2S0 2.7 0 3.5v7.2c0 .8.7 1.5 1.5 1.5h7.3c.8 0 1.5-.6 1.5-1.5zm20.2 9.1h-7.2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h3.8C24.8 26.6 20.6 29 16 29c-3.6 0-7-1.5-9.5-4.1-.5-.6-1.5-.6-2.1-.1-.6.6-.6 1.5-.1 2.1 3 3.2 7.3 5 11.7 5 5.3 0 10-2.5 13-6.7v3.2c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-7.2c0-.8-.7-1.4-1.5-1.4z"></path>
						</svg>
					</NavbarMenuLink>
					<Hr />
					<LogoutLink>
						<svg
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="#262626"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
							<path d="M7 12h14l-3 -3m0 6l3 -3" />
						</svg>
					</LogoutLink>
				</MenuList>
			</Menu>
		</MenuContainer>
	);
};

export default NavbarMenu;
