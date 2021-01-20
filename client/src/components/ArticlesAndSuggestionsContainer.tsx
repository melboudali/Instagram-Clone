import Articles from './Articles';
import Suggestion from './Suggestions';
import { useMeQuery, GetAllImagesQuery } from '../generated/graphql';
import styled from 'styled-components';
import { ApolloError } from '@apollo/client';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

type ArticlesAndSuggestionsContainerProps = {
  ImagesData: GetAllImagesQuery | undefined;
  imagesLoading: boolean;
  error: ApolloError | undefined;
  fetchMore: any;
};

const ArticlesAndSuggestionsContainer = ({
  ImagesData,
  imagesLoading,
  error,
  fetchMore
}: ArticlesAndSuggestionsContainerProps) => {
  const { data, loading } = useMeQuery();
  return (
    <Container>
      <Articles
        data={data}
        loading={loading}
        ImagesData={ImagesData}
        imagesLoading={imagesLoading}
        error={error}
        fetchMore={fetchMore}
      />
      <Suggestion data={data} loading={loading} />
    </Container>
  );
};

export default ArticlesAndSuggestionsContainer;
