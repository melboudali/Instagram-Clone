import Article from './layouts/Article';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 614px;
  float: left;
  margin-right: 28px;
  width: 100%;
`;

type PostsProps = {};

const Posts = ({}: PostsProps) => {
  return (
    <Container>
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </Container>
  );
};

export default Posts;
