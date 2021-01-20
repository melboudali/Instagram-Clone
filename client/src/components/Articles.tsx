import Article from './layouts/Article';
import styled from 'styled-components';
import { GetAllImagesQuery, MeQuery } from '../generated/graphql';
import { ApolloError } from '@apollo/client';

const Container = styled.div`
  max-width: 614px;
  float: left;
  margin-right: 28px;
  width: 100%;
`;

type ArticleProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
  ImagesData: GetAllImagesQuery | undefined;
  imagesLoading: boolean;
  error: ApolloError | undefined;
  fetchMore: any;
};

const Articles = ({ data, loading, ImagesData, imagesLoading, error, fetchMore }: ArticleProps) => {
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
      name: 'louisvuitton',
      logo:
        'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/914335_653223868059486_1434031198_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=U6vgVx_e8o4AX9nFzbR&oh=3ff91fefbbbe02b41d37f97d0e6b6c7a&oe=60266A46',
      image:
        'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/135563270_1097160247375093_8406851729820508853_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=RXA5ahcyppUAX_hjsxF&tp=1&oh=727e09ef7c995d6851372810be214908&oe=6025D26C',
      description:
        'A breath of fresh air. A timeless must-have, this season’s Twist is adorned with a precious braided chain strap, making it the perfect all day long companion. Explore the new #LouisVuitton campaign featuring @LauraHarrier via link in bio.',
      liked: 'MedEL',
      comments: [
        { user: 'brown.julianna', comment: '❤️❤️❤️' },
        { user: 'faybrookepracht', comment: '😍' }
      ],
      commentsLength: 135,
      createdTime: '1 HOUR AGO'
    },
    {
      name: 'lamborghini',
      logo:
        'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/10914351_445156875637393_373836994_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=68MQfFBzrRMAX9a1iaI&oh=0f8b597c27c46f855771a06a8f3f6082&oe=602881EC',
      image:
        'https://instagram.fcmn2-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/135618891_1708055706033322_8912957128588037424_n.jpg?_nc_ht=instagram.fcmn2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=7YutTpZFhMQAX9zGhMa&tp=1&oh=7a0758de61079e3b6bc749be0e8c2e7e&oe=6027A1AF',
      description:
        'Good company and a perfect Super Sports Car. Can it get any better than this? #Lamborghini #AventadorS',
      liked: 'MedEL',
      comments: [
        { user: 'brown.julianna', comment: '❤️❤️❤️' },
        { user: 'faybrookepracht', comment: '😍' }
      ],
      commentsLength: 158,
      createdTime: '1 HOUR AGO'
    },

    {
      name: 'dolcegabbana',
      logo:
        'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/110186591_652942011965204_3898636332437750301_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=po4-Q8N2FJYAX9Wz1-u&tp=1&oh=db54b40e1350b51120554528138e5a1c&oe=6025FBD9',
      image:
        'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/136098732_873448433425033_4990951796939254140_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=5UrttGbCB6UAX-C56Fi&tp=1&oh=a0ed22682507f840d9bb207f1ee9ef0c&oe=6026DF4A',
      description:
        'The Dolce Jacket story. The #DGFW20 garment was inspired by the historic model, which featured padding around the hip area. Discover the #DGDolceJacket and all its possible combinations at the link in bio. #DolceGabbana',
      liked: 'MedEL',
      comments: [
        { user: 'brown.julianna', comment: '❤️❤️❤️' },
        { user: 'faybrookepracht', comment: '😍' }
      ],
      commentsLength: 428,
      createdTime: '2 HOURS AGO'
    },
    {
      name: 'apple',
      logo:
        'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/20635165_1942203892713915_5464937638928580608_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=qsnSJWhSh9QAX-0pg_6&tp=1&oh=5de8514f3be48074a3b03de85c62cb3c&oe=60271DE4',
      image:
        'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/83109033_1618440354960356_5527593302420009628_n.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=hCEfC7gRjYUAX8meapi&tp=1&oh=0c766af6a4a20f77de3462f7ff1bbd41&oe=60276AEE',
      description:
        '“Ancient gates open at the historical city in Diriyah.” #arabianhorse #ShotoniPhone by Abdullah A.A. @adalshei5',
      liked: 'MedEL',
      comments: [
        { user: 'brown.julianna', comment: '❤️❤️❤️' },
        { user: 'faybrookepracht', comment: '😍' }
      ],
      commentsLength: 543,
      createdTime: '4 HOURS AGO'
    }
  ];

  return (
    <Container>
      {ImagesData &&
        !imagesLoading &&
        ImagesData.getAllImages.images.map(
          ({ id, title, likes, url, likeStatu, userId, createdAt, updatedAt }) => (
            <Article
              key={id}
              name={userId.toString()}
              logo={
                'https://instagram.fcmn2-2.fna.fbcdn.net/v/t51.2885-19/s150x150/20635165_1942203892713915_5464937638928580608_a.jpg?_nc_ht=instagram.fcmn2-2.fna.fbcdn.net&_nc_ohc=qsnSJWhSh9QAX-0pg_6&tp=1&oh=5de8514f3be48074a3b03de85c62cb3c&oe=60271DE4'
              }
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
              loading={loading}
            />
          )
        )}
    </Container>
  );
};

export default Articles;
