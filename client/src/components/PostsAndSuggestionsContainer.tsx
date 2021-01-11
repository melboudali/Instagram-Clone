import styled from 'styled-components';
import Posts from './Posts';

const Container = styled.div``;

type PostsAndSuggestionsContainerProps = {};

const PostsAndSuggestionsContainer = ({}: PostsAndSuggestionsContainerProps) => {
  return (
    <Container>
      <Posts />
    </Container>
  );
};

export default PostsAndSuggestionsContainer;
