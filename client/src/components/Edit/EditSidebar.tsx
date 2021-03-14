import styled from "styled-components";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const EditSidebarContainer = styled.aside`
	width: 100%;
	justify-self: flex-start;
	@media (min-width: 800px) {
		max-width: 170px;
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

interface EditSidebarProps {}

const EditSidebar = ({}: EditSidebarProps) => (
	<EditSidebarContainer>
		<nav>
			<ElementLink to="/accounts/edit">Edit Profile</ElementLink>
			<ElementLink to="/accounts/password/change/">Change Password</ElementLink>
			<ElementLink to="/accounts/privacy_and_security/">Privacy and Security</ElementLink>
		</nav>
	</EditSidebarContainer>
);

EditSidebar.propTypes = {};

export default EditSidebar;
