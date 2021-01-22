import Article from './layouts/Article';
import styled from 'styled-components';
import { MeQuery, useGetAllImagesQuery } from '../generated/graphql';

const Container = styled.div`
  max-width: 614px;
  float: left;
  margin-right: 28px;
  width: 100%;
  @media only screen and (max-width: 1000px) {
    margin: 0;
  }
`;

type ArticleProps = {
  data: MeQuery | undefined;
};

const Articles = ({ data }: ArticleProps) => {
  const { data: ImagesData, loading: imagesLoading, fetchMore } = useGetAllImagesQuery({
    variables: { limit: 10, cursor: null },
    notifyOnNetworkStatusChange: true
  });

  return (
    <Container>
      {ImagesData &&
        !imagesLoading &&
        ImagesData.getAllImages.images.map(
          ({
            id,
            title,
            likes,
            url,
            likeStatu,
            userId,
            user: { id: uid, imageUrl, userName },
            createdAt,
            updatedAt
          }) => (
            <Article
              key={id}
              name={userName}
              logo={imageUrl}
              image={url}
              description={title}
              liked={'MedEL'}
              comments={[
                { user: 'brown.julianna', comment: '❤️❤️❤️' },
                { user: 'faybrookepracht', comment: '😍' }
              ]}
              commentsLength={543}
              createdTime={createdAt}
              data={data}
            />
          )
        )}
    </Container>
  );
};

export default Articles;
