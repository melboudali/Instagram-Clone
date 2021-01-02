import Container from '../components/Container';
import { MeQuery } from '../generated/graphql';

type HomeProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Home = ({ data, loading }: HomeProps) => {
  return (
    <Container data={data} loading={loading}>
      <h1>{data?.me?.fullName}</h1>
    </Container>
  );
};

export default Home;
