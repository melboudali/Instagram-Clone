import Container from '../components/Container';
import FileUploadInputProps from '../components/layouts/FileUploadInput';
import { MeQuery } from '../generated/graphql';

type HomeProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Home = ({ data, loading }: HomeProps) => {
  return (
    <Container data={data} loading={loading}>
      <FileUploadInputProps></FileUploadInputProps>
    </Container>
  );
};

export default Home;
