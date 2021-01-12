import styled from 'styled-components';
import Articles from './Articles';
import Suggestion from './Suggestions';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

type ArticlesAndSuggestionsContainerProps = {};

const ArticlesAndSuggestionsContainer = ({}: ArticlesAndSuggestionsContainerProps) => {
  return (
    <Container>
      <Articles />
      <Suggestion />
    </Container>
  );
};

export default ArticlesAndSuggestionsContainer;
