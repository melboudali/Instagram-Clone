import { Fragment } from "react";
import styled from "styled-components";
import Navbar from "../components/common/navbar/Navbar";
import PropTypes from "prop-types";

const Main = styled.main`
	margin: 0 auto 30px;
	max-width: 975px;
	padding: 40px 10px 0;
	@media (min-width: 800px) {
		padding: 54px 20px 0;
	}
`;

interface ContainerProps {
	children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
	return (
		<Fragment>
			<Navbar />
			<Main>{children}</Main>
		</Fragment>
	);
};

Container.propTypes = {
	children: PropTypes.node.isRequired
};

export default Container;
