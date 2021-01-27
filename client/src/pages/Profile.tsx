import { useGetUserQuery } from '../generated/graphql';
import styled from 'styled-components';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

const Main = styled.div`
  margin: 30px auto 0;
`;

const ProfileData = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 0;
  margin-right: 30px;
  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfileInformations = styled.section`
  flex: 2 2 30px;
`;

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Username = styled.h2`
  font-weight: 300;
  font-size: 28px;
  line-height: 32px;
  color: #262626;
  margin: 0;
  text-align: left;
`;

const EditButton = styled(Link)`
  text-decoration: none;
  margin-left: 20px;
  border: 1px solid #dbdbdb;
  color: #262626;
  border-radius: 4px;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
`;

const OptionsButton = styled.button`
  margin-left: 5px;
  cursor: pointer;
  padding: 0;
  background: 0 0;
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
`;

const PostsFollowersFollowingContainer = styled.div``;

const PostsCount = styled.div``;

const FollowesCount = styled.div``;

const FollowingCount = styled.div``;

type ProfileProps = {
  match: { params: { username: string } };
};

const Profile = ({ match }: ProfileProps) => {
  const userName = match.params.username.toLowerCase();
  const { data, loading } = useGetUserQuery({ variables: { userName: userName } });

  return (
    <Container>
      {data?.getUser.user && !loading ? (
        <Main>
          <ProfileData>
            <ProfileImage>
              <img src={data.getUser.user?.imageUrl} alt='profile' />
            </ProfileImage>
            <ProfileInformations>
              <UsernameContainer>
                <Username>{data.getUser.user?.userName}</Username>
                <EditButton to='/accounts/edit'>Edit Profile</EditButton>
                <OptionsButton type='button'>
                  <svg fill='#262626' height='24' viewBox='0 0 48 48' width='24'>
                    <path
                      clipRule='evenodd'
                      d='M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z'
                      fillRule='evenodd'></path>
                  </svg>
                </OptionsButton>
              </UsernameContainer>
              <PostsFollowersFollowingContainer>
                <PostsCount>{data.getUser.user?.images?.length} posts</PostsCount>
                <FollowesCount></FollowesCount>
                <FollowingCount></FollowingCount>
              </PostsFollowersFollowingContainer>
            </ProfileInformations>
          </ProfileData>
        </Main>
      ) : (
        <> {data?.getUser.error?.message}</>
      )}
    </Container>
  );
};

export default Profile;
