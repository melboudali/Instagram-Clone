import Articles from './Articles';
import Suggestion from './Suggestions';
import { useMeQuery } from '../generated/graphql';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

type ArticlesAndSuggestionsContainerProps = {};

const ArticlesAndSuggestionsContainer = ({}: ArticlesAndSuggestionsContainerProps) => {
  const { data, loading } = useMeQuery();
  return (
    <Container>
      <Articles data={data} loading={loading} />
      <Suggestion data={data} loading={loading} />
    </Container>
  );
};

export default ArticlesAndSuggestionsContainer;
