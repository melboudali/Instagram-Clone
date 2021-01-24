import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  MeQuery,
  useGetSuggestedUsersLazyQuery,
  useGetSuggestedUsersQuery
} from '../generated/graphql';
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
      @media only screen and (min-width: 1000px) {
        left: 671px;
      }
      @media only screen and (min-width: 1100px) {
        left: 716px;
      }
      @media only screen and (min-width: 1100px) {
        left: 774.5px;
      }
      @media only screen and (min-width: 1200px) {
        left: 849px;
      }
        `
      : `
      top: 18px;
      position: absolute;`}

  max-width: 293px;
  width: 100%;
  @media only screen and (max-width: 1000px) {
    display: none;
    flex: 0 0 0%;
  }
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
};

const Suggestions = ({ data }: SuggestionsProps) => {
  const { data: suggestedUsers } = useGetSuggestedUsersQuery();
  const isSticky = IsSticky(337);

  const onClick = (buttonName: string) => {
    // TODO: Edit this later
    console.log(`${buttonName} Button Clicked.`);
  };

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
        {suggestedUsers &&
          suggestedUsers.suggestedUsers.users &&
          suggestedUsers.suggestedUsers.users.map(({ id, userName, imageUrl }) => (
            <SuggestionContainer key={id}>
              <SuggestedProfileImage>
                <Link to={`/${userName}`}>
                  <img src={imageUrl} alt={`${userName}'s profile`} />
                </Link>
              </SuggestedProfileImage>
              <SuggestedProfileName>
                <SuggestedUserName to={`/${userName}`}>{userName}</SuggestedUserName>
                <span>New to Instagram</span>
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
