import Container from '../components/Container';
import FileUploadInputProps from '../components/layouts/FileUploadInput';
import Stories from '../components/Stories';
import ArticlesAndSuggestionsContainer from '../components/ArticlesAndSuggestionsContainer';
import { MeQuery, useGetAllImagesQuery } from '../generated/graphql';

type HomeProps = {
  data: MeQuery;
};

const Home = ({ data }: HomeProps) => {
  const { data: ImagesData, error, loading, fetchMore } = useGetAllImagesQuery({
    variables: { limit: 10, cursor: null },
    notifyOnNetworkStatusChange: true
  });
  return (
    <Container>
      <FileUploadInputProps data={data} />
      <Stories />
      <ArticlesAndSuggestionsContainer
        ImagesData={ImagesData}
        imagesLoading={loading}
        error={error}
        fetchMore={fetchMore}
      />
    </Container>
  );
};

export default Home;
