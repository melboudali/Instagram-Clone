import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkContainer = styled.div`
	position: relative;
	cursor: pointer;
	margin: 0 0 0 22px;
	width: 22px;
	height: 22px;
	svg {
		fill: var(--textColorDarkGray);
	}
`;

interface NavbarLinkProps {
	path: string;
	children: React.ReactNode & React.SVGProps<SVGSVGElement>;
}

const NavbarLink = ({ path, children }: NavbarLinkProps) => (
	<LinkContainer>
		<Link to={path}>{children}</Link>
	</LinkContainer>
);

NavbarLink.propTypes = {
	path: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};

export default NavbarLink;
