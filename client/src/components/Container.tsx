import { Fragment } from 'react';
import styled from 'styled-components';
import { MeQuery } from '../generated/graphql';
import Navbar from './Navbar';

type ContainerProps = {
  children: React.ReactNode;
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Main = styled.div`
  margin: 0 auto 30px;
  max-width: 975px;
  width: 100%;
  padding: 30px 20px 0;
`;

const Container = ({ children, data, loading }: ContainerProps) => {
  return (
    <Fragment>
      <Navbar data={data} loading={loading} />
      <Main>{children}</Main>
    </Fragment>
  );
};

export default Container;
