import Container from "../containers/Container";
import FileUploadInputProps from "../components/home/FileUploadInput";
import Stories from "../components/home/stories/Stories";
import ArticlesAndSuggestionsContainer from "../components/home/ArticlesAndSuggestionsContainer";

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
