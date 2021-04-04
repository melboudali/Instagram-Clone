import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Container from "../../containers/Container";
import staticPage from "../../utils/staticPagesData";

const StaticContainerSection = styled.section`
	background-color: #fff;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin: 30px 0 0;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
	@media (min-width: 800px) {
		flex-direction: row;
	}
`;

const StaticSidebarContainer = styled.aside`
	width: 100%;
	justify-self: flex-start;
	@media (min-width: 800px) {
		max-width: 190px;
	}
`;

const StaticPageNav = styled.nav`
	@media (min-width: 800px) {
		position: fixed;
	}
`;

const activeClassName = "nav-active";

const ElementLink = styled(NavLink).attrs<{ activeClassName: string }>({ activeClassName })`
	display: block;
	font-size: 1rem;
	font-weight: 400;
	color: var(--textColorGray);
	padding: 16px 0 16px 16px;
	&:hover {
		background-color: var(--backgroudColor);
		box-shadow: inset 3px 0 var(--borderColor);
	}
	&.${activeClassName} {
		box-shadow: inset 3px 0 var(--textColorDarkGray);
		font-weight: 500;
		color: var(--textColorDarkGray);
		&:hover {
			background-color: transparent;
		}
	}
`;

const StaticContainerMain = styled.main`
	padding: 20px;
	max-width: 800px;
	width: 100%;
	div {
		p {
			margin-bottom: 10px;
		}
	}
`;

const StaticPageTitle = styled.h1`
	font-size: 1.5rem;
	font-weight: 500;
	color: #262626;
	text-align: center;
	margin: 30px 0 50px;
	text-transform: uppercase;
	letter-spacing: 3px;
`;

interface StaticProps {
	match: { params: { pageName: string } };
}

const Static = ({
	match: {
		params: { pageName }
	}
}: StaticProps) => {
	return (
		<Container>
			<Helmet>
				<title>{staticPage(pageName).title}</title>
				<meta name="title" content={staticPage(pageName).title} />
				<meta property="og:title" content={staticPage(pageName).title} />
				<meta property="twitter:title" content={staticPage(pageName).title} />
			</Helmet>
			<StaticContainerSection>
				<StaticSidebarContainer>
					<StaticPageNav>
						<ElementLink to="/page/about">About</ElementLink>
						<ElementLink to="/page/privacy">Privacy</ElementLink>
						<ElementLink to="/page/terms">Terms And Conditions</ElementLink>
					</StaticPageNav>
				</StaticSidebarContainer>
				<StaticContainerMain>
					<StaticPageTitle>{staticPage(pageName).title} page</StaticPageTitle>
					<div dangerouslySetInnerHTML={{ __html: staticPage(pageName)["body"] }} />
				</StaticContainerMain>
			</StaticContainerSection>
		</Container>
	);
};

export default Static;
