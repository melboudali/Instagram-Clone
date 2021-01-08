import Container from '../components/Container';
import FileUploadInputProps from '../components/layouts/FileUploadInput';
import Stories from '../components/Stories';
import { MeQuery } from '../generated/graphql';

type HomeProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Home = ({ data, loading }: HomeProps) => {
  return (
    <Container data={data} loading={loading}>
      <FileUploadInputProps />
      <Stories />
    </Container>
  );
};

export default Home;
