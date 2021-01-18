import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MeQuery } from '../generated/graphql';
import IsSticky from '../Hooks/IsSticky';

const Container = styled.div<{ isSticky: boolean }>`
  right: 0;
  top: 0;
  ${({ isSticky }) =>
    isSticky
      ? `
      position: fixed;
      left: 849px;
      top:  72px;
        `
      : `
      top: 18px;
      position: absolute;`}
  max-width: 293px;
  width: 100%;
`;

// Current User
const CurrentUserContainer = styled.div`
  height: auto;
  margin-bottom: 10px;
`;

const CurrentUser = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  margin-right: 12px;
  width: 56px;
  height: 56px;
  a {
    text-decoration: none;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const ProfileName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  span {
    color: #8e8e8e;
    font-weight: 400;
  }
`;

const UserName = styled(Link)`
  color: #262626;
  font-weight: 600;
  text-decoration: none;
  margin: -3px 0 -2px;
`;

const SwitchButtonContainer = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const SwitchButton = styled.button`
  cursor: pointer;
  color: #0095f6;
  font-weight: 600;
  padding: 0;
  background: 0 0;
  border: 0;
  outline: 0;
  font-size: 12px;
  line-height: 14px;
  margin: -2px 0 -3px;
`;

// Suggestions
const SuggestionsContainer = styled.div`
  background-color: #fafafa;
  margin: 0 0 12px -16px;
  width: calc(100% + 32px);
`;

const SuggestionsTitleContainer = styled.div`
  display: flex;
  padding: 4px 16px 12px;
  margin-top: 12px;
  font-size: 12px;
  line-height: 14px;
  margin: -2px 0 -3px;
  span {
    color: #8e8e8e;
    flex: 1 1 auto;
    font-weight: 600;
  }
`;

const SeeAllLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: 600;
`;

// Suggested
const SuggestionContainer = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const SuggestedProfileImage = styled.div`
  margin-right: 12px;
  width: 32px;
  height: 32px;
  a {
    text-decoration: none;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const SuggestedProfileName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  span {
    color: #8e8e8e;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin: 1px 0 -3px;
  }
`;

const SuggestedUserName = styled(Link)`
  color: #262626;
  font-weight: 600;
  text-decoration: none;
  margin: -3px 0 -2px;
`;

const SuggestedSwitchButtonContainer = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const SuggestedSwitchButton = styled.button`
  cursor: pointer;
  color: #0095f6;
  font-weight: 600;
  padding: 0;
  background: 0 0;
  border: 0;
  outline: 0;
  font-size: 12px;
  margin: -2px 0 -3px;
`;

// Links
const LinksContainer = styled.nav`
  margin-bottom: 16px;
`;

const LinksList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0 3px 0 0;
`;

const LinkItem = styled.li`
  display: inline-block;
  margin: 0;
`;

const ListLink = styled(Link)`
  color: #c7c7c7;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  display: flex;
  align-items: center;
  &::after {
    content: '';
    display: inline-block;
    margin: 0 3px;
    border-radius: 5px;
    background: #c7c7c7;
  }
`;

const SignatureContainer = styled.span`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  color: #8e8e8e;
`;

type SuggestionsProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Suggestions = ({ data, loading }: SuggestionsProps) => {
  const isSticky = IsSticky(400);

  const onClick = (buttonName: string) => {
    // TODO: Edit this later
    console.log(`${buttonName} Button Clicked.`);
  };

  const SuggestionsData: { image: string; username: string; status: string }[] = [
    {
      username: 'nike',
      image:
        'https://instagram.fcmn3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/26155970_1584552474997482_4541081815552622592_n.jpg?_nc_ht=instagram.fcmn3-1.fna.fbcdn.net&_nc_ohc=n5hQVJeXrBwAX_1PtsU&tp=1&oh=7704ed0384c985a96539ae3fe48e52d7&oe=602B0ECE',
      status: 'Follows you'
    },
    {
      username: 'converse',
      image:
        'https://instagram.fcmn3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/19379226_756476704513652_2682917618561581056_a.jpg?_nc_ht=instagram.fcmn3-1.fna.fbcdn.net&_nc_ohc=AeqEAMfAUBQAX9Bw3Y0&tp=1&oh=29bbbf2edffb65ed992715936e60bb05&oe=602D45E0',
      status: 'New to Instagram'
    },
    {
      username: 'mcdonalds',
      image:
        'https://instagram.fcmn3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/128998981_2869279583397396_3819488595063248462_n.jpg?_nc_ht=instagram.fcmn3-1.fna.fbcdn.net&_nc_ohc=Q1l5DlXBDAkAX_W8qG4&tp=1&oh=b66906ba93adf94e13b26ff10fa7c84d&oe=602C3968',
      status: 'New to Instagram'
    },
    {
      username: 'adidas',
      image:
        'https://instagram.fcmn3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/73385866_483576632365553_2091382961273307136_n.jpg?_nc_ht=instagram.fcmn3-1.fna.fbcdn.net&_nc_ohc=uA7Ohfjb1uMAX-KM9PH&tp=1&oh=24a9739d0bbcb0dce26abb49b6d32766&oe=602D5F5A',
      status: 'Follows you'
    }
  ];

  const LinksData: string[] = [
    'About',
    'Help',
    'Press',
    'API',
    'Jobs',
    'Privacy',
    'Terms',
    'Locations',
    'Top Accounts',
    'Hashtags',
    'Language'
  ];

  return (
    <Container isSticky={isSticky}>
      <CurrentUserContainer>
        <CurrentUser>
          <ProfileImage>
            <Link to={`/${data?.me?.userName}`}>
              <img src={data?.me?.imageUrl} alt={`${data?.me?.imageUrl}'s profile`} />
            </Link>
          </ProfileImage>
          <ProfileName>
            <UserName to={`/${data?.me?.userName}`}>{data?.me?.userName}</UserName>
            <span>{data?.me?.fullName}</span>
          </ProfileName>
          <SwitchButtonContainer>
            <SwitchButtonContainer>
              <SwitchButton type='button' onClick={() => onClick('Switch Account')}>
                Switch
              </SwitchButton>
            </SwitchButtonContainer>
          </SwitchButtonContainer>
        </CurrentUser>
      </CurrentUserContainer>
      <SuggestionsContainer>
        <SuggestionsTitleContainer>
          <span>Suggestions For You</span>
          <SeeAllLink to='/fixLater'>See All</SeeAllLink>
        </SuggestionsTitleContainer>
        {SuggestionsData.map(({ username, image, status }, id) => (
          <SuggestionContainer key={id}>
            <SuggestedProfileImage>
              <Link to={`/${username}`}>
                <img src={image} alt={`${username}'s profile`} />
              </Link>
            </SuggestedProfileImage>
            <SuggestedProfileName>
              <SuggestedUserName to={`/${username}`}>{username}</SuggestedUserName>
              <span>{status}</span>
            </SuggestedProfileName>
            <SuggestedSwitchButtonContainer>
              <SuggestedSwitchButton type='button' onClick={() => onClick('Follow')}>
                Follow
              </SuggestedSwitchButton>
            </SuggestedSwitchButtonContainer>
          </SuggestionContainer>
        ))}
      </SuggestionsContainer>
      <div>
        <LinksContainer>
          <LinksList>
            {LinksData.map((theLink, id) => (
              <LinkItem key={id}>
                <ListLink to={`/${theLink}`}>{theLink}</ListLink>
              </LinkItem>
            ))}
          </LinksList>
        </LinksContainer>
        <SignatureContainer>© 2021 Instagram from Facebook</SignatureContainer>
      </div>
    </Container>
  );
};

export default Suggestions;
