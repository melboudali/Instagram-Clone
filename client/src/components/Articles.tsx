import Article from './layouts/Article';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 614px;
  float: left;
  margin-right: 28px;
  width: 100%;
`;

type ArticlesProps = {};

const Articles = ({}: ArticlesProps) => {
  const ArticlesData: {
    name: string;
    logo: string;
    image: string;
    description: string;
    liked: string;
    comments: { user: string; comment: string }[];
    commentsLength: number;
    createdTime: string;
  }[] = [
    {
      name: '',
      logo: '',
      image: '',
      description: '',
      liked: '',
      comments: [{ user: '', comment: '' }],
      commentsLength: 0,
      createdTime: ''
    }
  ];

  return (
    <Container>
      {ArticlesData.map(
        ({ name, logo, image, description, liked, comments, commentsLength, createdTime }) => (
          <Article
            name={name}
            logo={logo}
            image={image}
            description={description}
            liked={liked}
            comments={comments}
            commentsLength={commentsLength}
            createdTime={createdTime}
          />
        )
      )}
    </Container>
  );
};

export default Articles;
