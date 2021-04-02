import { useEffect, useRef, useState } from "react";
import { useMeQuery } from "../../../generated/graphql";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import NavbarMenu from "./NavbarMenu";
import NavbarLink from "./NavbarLink";
import logo from "../../../assets/images/735145cfe0a4.png";
import Assets from "../../../assets/images/32f0a4f27407.png";
import useClickOutside from "../../../hooks/useClickOutside";

const NavbarContainer = styled.header`
	position: fixed;
	width: 100%;
	height: 54px;
	background-color: #fff;
	border-bottom: 1px solid var(--borderColor);
	z-index: 2;
`;

const NavbarMain = styled.div`
	margin: 0 auto;
	padding: 0 20px;
	max-width: 975px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	transition: height 0.2s ease-in-out;
	width: 100%;
	height: 100%;
`;

const LeftNav = styled.div`
	flex: 1 9999 0%;
	min-width: 40px;

	img {
		align-self: center;
		margin-top: 7px;
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}
`;

const LeftNavLink = styled(Link)`
	display: flex;
	align-items: center;
`;

const MidNav = styled.div`
	display: flex;
	align-items: center;
	flex: 0 1 auto;
	height: 28px;
	width: 215px;
	min-width: 125px;
	background: var(--backgroudColor);
	border: 1px solid var(--borderColor);
	border-radius: 3px;
	span {
		margin: 0 10px;
		background: url(${Assets});
		background-repeat: no-repeat;
		background-position: -399px -321px;
		height: 10px;
		width: 10px;
	}
	input[type="text"] {
		color: var(--textColorGray);
		font-size: 14px;
		outline: none;
		border: none;
		padding: 0 10px 0 0;
		height: 100%;
		width: calc(100% - 30px);
		text-align: center;
		border-radius: 3px;
	}
	@media only screen and (max-width: 650px) {
		display: none;
	}
`;

const RightNav = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex: 1 0 0%;
	flex-direction: row;
	justify-content: flex-end;
	align-content: center;
	& > div {
		display: flex;
		padding-left: 24px;
	}
`;

const NavbarLinkContainer = styled.div`
	position: relative;
	cursor: pointer;
	margin: 0 0 0 22px;
	width: 22px;
	height: 22px;
`;

const NavbarProfileImageBorder = styled.div<{ showMenu: boolean }>`
	${({ showMenu }) => {
		if (showMenu) {
			return `border: 1px solid #262626;
			border-radius: 50%;
			height: 28px;
			left: 50%;
			position: absolute;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 28px;`;
		}
	}}
`;

const NavbarProfileImage = styled.span`
	background-color: none;
	border-radius: 50%;
	box-sizing: border-box;
	display: block;
	flex: 0 0 auto;
	overflow: hidden;
	position: relative;
	width: 22px;
	height: 22px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const NavbarLoginButton = styled.button`
	cursor: pointer;
	background: var(--buttonLightBlue);
	border: 0;
	outline: 0;
	color: #fff;
	font-weight: 600;
	font-size: 14px;
	border-radius: 4px;
	padding: 6px 10px;
`;

const NavbarSignUpButton = styled.button`
	cursor: pointer;
	padding: 0;
	background: 0 0;
	border: 0;
	outline: 0;
	color: var(--buttonLightBlue);
	font-weight: 600;
	font-size: 14px;
	margin-left: 15px;
`;

const Navbar = () => {
	const history = useHistory();
	const { data, error } = useMeQuery();
	const ref = useRef<HTMLDivElement>(null);
	const { clickOutside, setClickOutside } = useClickOutside(ref);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (clickOutside) setShowMenu(false);
	}, [clickOutside]);

	return (
		<NavbarContainer>
			<NavbarMain>
				<LeftNav>
					<LeftNavLink to="/">
						<img src={logo} alt="dd" />
					</LeftNavLink>
				</LeftNav>
				<MidNav>
					<span></span>
					<input type="text" name="" id="" placeholder="Search" />
				</MidNav>
				<RightNav>
					<div>
						{!error && data && data.me ? (
							<>
								<NavbarLink path="/">
									<svg fill="#262626" viewBox="0 0 48 48">
										<path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
									</svg>
								</NavbarLink>
								{/* <NavbarLink path="/Direct">
									<svg fill="#262626" viewBox="0 0 48 48">
										<path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
									</svg>
								</NavbarLink>
								<NavbarLink path="/Find People">
									<svg fill="#262626" viewBox="0 0 48 48">
										<path
											clipRule="evenodd"
											d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
											fillRule="evenodd"></path>
									</svg>
								</NavbarLink> */}
								<NavbarLink path="#">
									<svg fill="#262626" viewBox="0 0 48 48">
										<path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
									</svg>
								</NavbarLink>
								<NavbarLinkContainer
									onClick={() => {
										if (clickOutside) setClickOutside(false);
										setShowMenu(!showMenu);
									}}
									ref={ref}>
									<NavbarProfileImageBorder showMenu={showMenu} />
									<NavbarProfileImage>
										<img src={data.me.image_link} alt={`${data.me.fullname}'s profile`} />
									</NavbarProfileImage>
									<NavbarMenu meData={data.me} showMenu={showMenu} />
								</NavbarLinkContainer>
							</>
						) : (
							<>
								<NavbarLoginButton type="button" onClick={() => history.push("/")}>
									Log In
								</NavbarLoginButton>
								<NavbarSignUpButton type="button" onClick={() => history.push("/accounts/emailsignup")}>
									Sign Up
								</NavbarSignUpButton>
							</>
						)}
					</div>
				</RightNav>
			</NavbarMain>
		</NavbarContainer>
	);
};

export default Navbar;
