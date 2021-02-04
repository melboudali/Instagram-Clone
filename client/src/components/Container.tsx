import { Fragment } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

type ContainerProps = {
	children: React.ReactNode;
};

const Main = styled.div`
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
