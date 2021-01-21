import Articles from './Articles';
import Suggestion from './Suggestions';
import { useMeQuery, GetAllImagesQuery } from '../generated/graphql';
import styled from 'styled-components';
import { ApolloError } from '@apollo/client';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ArticlesAndSuggestionsContainer = () => {
  const { data, loading } = useMeQuery();
  return (
    <Container>
      <Articles data={data} loading={loading} />
      <Suggestion data={data} loading={loading} />
    </Container>
  );
};

export default ArticlesAndSuggestionsContainer;
