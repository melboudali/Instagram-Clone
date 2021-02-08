import Container from "../components/Common/Container";
import FileUploadInputProps from "../components/Home/FileUploadInput";
import Stories from "../components/Home/Stories/Stories";
import ArticlesAndSuggestionsContainer from "../components/Home/ArticlesAndSuggestionsContainer";

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
