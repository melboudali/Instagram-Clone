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

const CurrentUserContainer = styled.div`
  height: auto;
  margin-bottom: 10px;
`;

const CurrentUser = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  /* width: fit-content; */
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
`;

const SuggestionContainer = styled.div`
  background-color: #fafafa;
  margin: 0 0 12px -16px;
  width: calc(100% + 32px);
`;

const OtherLinks = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 38px 0;
`;

type SuggestionsProps = {
  data: MeQuery | undefined;
  loading: boolean | undefined;
};

const Suggestions = ({ data, loading }: SuggestionsProps) => {
  const isSticky = IsSticky(400);

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
              <SwitchButton type='button'>Switch</SwitchButton>
            </SwitchButtonContainer>
          </SwitchButtonContainer>
        </CurrentUser>
      </CurrentUserContainer>
      <SuggestionContainer></SuggestionContainer>
      <OtherLinks></OtherLinks>
    </Container>
  );
};

export default Suggestions;
