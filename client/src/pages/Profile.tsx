import { useGetUserQuery } from '../generated/graphql';
import styled from 'styled-components';
import Container from '../components/Container';

const Main = styled.div`
  margin: 30px auto 0;
`;

const ProfileData = styled.div``;

const ProfileImage = styled.img``;

const ProfileInformations = styled.div``;

const UsernameContainer = styled.div``;

const Username = styled.div``;

const EditButton = styled.button``;

const OptionsButton = styled.div``;

const PostsFollowersFollowingContainer = styled.div``;

const PostsCount = styled.div``;

const FollowesCount = styled.div``;

const FollowingCount = styled.div``;

type ProfileProps = {
  match: { params: { username: string } };
};

const Profile = ({ match }: ProfileProps) => {
  const userName = match.params.username;
  const { data, loading } = useGetUserQuery({ variables: { userName: userName } });

  return (
    <Container>
      {data && !loading && (
        <Main>
          <ProfileData>
            <ProfileImage src={data.getUser.user?.imageUrl} />
            <ProfileInformations>
              <UsernameContainer>
                <Username>{data.getUser.user?.userName}</Username>
                <EditButton>edit profile</EditButton>
                <OptionsButton>.</OptionsButton>
              </UsernameContainer>
              <PostsFollowersFollowingContainer>
                <PostsCount>{data.getUser.user?.images?.length} posts</PostsCount>
                <FollowesCount></FollowesCount>
                <FollowingCount></FollowingCount>
              </PostsFollowersFollowingContainer>
            </ProfileInformations>
          </ProfileData>
        </Main>
      )}
    </Container>
  );
};

export default Profile;
