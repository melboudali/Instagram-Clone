import Container from "../containers/Container";
import FileUploadInputProps from "../components/home/FileUploadInput";
import Stories from "../components/home/stories/Stories";
import ArticlesAndSuggestionsContainer from "../components/home/ArticlesAndSuggestionsContainer";
import { Helmet } from "react-helmet";

const Home = () => (
	<Container>
		<Helmet>
			<title>Instagram Clone</title>
		</Helmet>
		<FileUploadInputProps />
		<Stories />
		<ArticlesAndSuggestionsContainer />
	</Container>
);

export default Home;
