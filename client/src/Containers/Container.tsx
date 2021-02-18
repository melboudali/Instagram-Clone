import { Fragment } from "react";
import styled from "styled-components";
import Navbar from "../components/Common/Navbar/Navbar";

interface ContainerProps {
	children: React.ReactNode;
}

const Main = styled.main`
	margin: 0 auto 30px;
	max-width: 975px;
	padding: 54px 20px 0;
`;

const Container = ({ children }: ContainerProps) => {
	return (
		<Fragment>
			<Navbar />
			<Main>{children}</Main>
		</Fragment>
	);
};

export default Container;
