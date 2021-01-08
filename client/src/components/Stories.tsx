import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 116px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin: 54px 0 16px;
`;

type StoriesProps = {};

const Stories = ({}: StoriesProps) => {
  return <Container>This is Stories Component/Page</Container>;
};

export default Stories;
