import Container from '../components/Container';
import FileUploadInputProps from '../components/layouts/FileUploadInput';
import Stories from '../components/Stories';
import ArticlesAndSuggestionsContainer from '../components/ArticlesAndSuggestionsContainer';
import { MeQuery } from '../generated/graphql';

type HomeProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Home = ({ data, loading }: HomeProps) => {
  return (
    <Container data={data}>
      <FileUploadInputProps data={data} />
      <Stories />
      <ArticlesAndSuggestionsContainer />
    </Container>
  );
};

export default Home;
