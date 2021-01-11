import Post from './layouts/Post';
import styled from 'styled-components';

const Container = styled.div``;

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
