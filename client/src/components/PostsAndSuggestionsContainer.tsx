import styled from 'styled-components';
import Posts from './Posts';
import Suggestion from './Suggestions';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

type PostsAndSuggestionsContainerProps = {};

const PostsAndSuggestionsContainer = ({}: PostsAndSuggestionsContainerProps) => {
  return (
    <Container>
      <Posts />
      <Suggestion />
    </Container>
  );
};

export default PostsAndSuggestionsContainer;
