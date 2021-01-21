import Container from '../components/Container';
import FileUploadInputProps from '../components/layouts/FileUploadInput';
import Stories from '../components/Stories';
import ArticlesAndSuggestionsContainer from '../components/ArticlesAndSuggestionsContainer';

const Home = () => {
  return (
    <Container>
      <FileUploadInputProps />
      <Stories />
      <ArticlesAndSuggestionsContainer />
    </Container>
  );
};

export default Home;
