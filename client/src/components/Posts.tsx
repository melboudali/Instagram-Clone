import Post from './layouts/Post';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 614px;
  float: left;
  margin-right: 28px;
  width: 100%;
  background-color: green;
`;

type PostsProps = {};

const Posts = ({}: PostsProps) => {
  return (
    <Container>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  );
};

export default Posts;
