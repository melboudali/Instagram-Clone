import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
	padding: 0 16px;
	bottom: 0;
`;

const FooterLinksContainer = styled.div`
	margin-bottom: 52px;
`;

export const FooterLinks = styled.div`
	margin-top: 24px;
	div {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
	}
`;

const FooterLang = styled.div`
	display: flex;
	margin: 12px 0;
	justify-content: center;

	color: var(--textColorGray);
	div {
		font-size: 12px;
		line-height: 14px;
		text-transform: capitalize;
		:nth-child(1) {
			display: flex;
			cursor: pointer;
		}
		:nth-child(2) {
			margin-left: 16px;
		}
		svg {
			margin-left: 4px;
		}
	}
`;

const FooterLink = styled.div`
	margin: 0 8px 12px;
`;

const FooterLinkTag = styled(Link)`
	color: var(--textColorGray);
	div {
		font-size: 12px;
		line-height: 14px;
		margin: -2px 0 -3px;
		text-transform: capitalize;
	}
`;

const Footer = () => (
	<FooterContainer>
		<FooterLinksContainer>
			<FooterLinks>
				<div>
					<FooterLink>
						<FooterLinkTag to="/page/about">
							<div>about</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/blog">
							<div>blog</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/jobs">
							<div>jobs</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/api">
							<div>api</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/privacy">
							<div>privacy</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/terms">
							<div>terms</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/top accounts">
							<div>top accounts</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/hashtags">
							<div>hashtags</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/locations">
							<div>locations</div>
						</FooterLinkTag>
					</FooterLink>
				</div>
				<div>
					<FooterLink>
						<FooterLinkTag to="/page/beauty">
							<div>beauty</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/dance & performance">
							<div>dance & performance</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/fitness">
							<div>fitness</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/food & drink">
							<div>food & drink</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/home & garden">
							<div>home & garden</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/music">
							<div>music</div>
						</FooterLinkTag>
					</FooterLink>
					<FooterLink>
						<FooterLinkTag to="/page/visual arts">
							<div>visual arts</div>
						</FooterLinkTag>
					</FooterLink>
				</div>
			</FooterLinks>
			<FooterLang>
				<div>
					English
					<span>
						<svg width="11" height="6" viewBox="0 0 11 6" fill="none">
							<path d="M1 1L5.5 5L10 1" stroke="#8E8E8E" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</span>
				</div>
				<div>© 2020 Instagram from Facebook</div>
			</FooterLang>
		</FooterLinksContainer>
	</FooterContainer>
);

export default Footer;
