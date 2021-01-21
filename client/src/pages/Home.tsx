import Container from '../components/Container';
import FileUploadInputProps from '../components/layouts/FileUploadInput';
import Stories from '../components/Stories';
import ArticlesAndSuggestionsContainer from '../components/ArticlesAndSuggestionsContainer';
import { MeQuery, useGetAllImagesQuery } from '../generated/graphql';

type HomeProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Home = ({ data, loading }: HomeProps) => {
  const { data: ImagesData, error, loading: imagesLoading, fetchMore} = useGetAllImagesQuery({
    variables: { limit: 10, cursor: null },
    notifyOnNetworkStatusChange: true
  });
  return (
    <Container data={data}>
      <FileUploadInputProps data={data} />
      <Stories />
      <ArticlesAndSuggestionsContainer
        ImagesData={ImagesData}
        imagesLoading={imagesLoading}
        error={error}
        fetchMore={fetchMore}
      />
    </Container>
  );
};

export default Home;
