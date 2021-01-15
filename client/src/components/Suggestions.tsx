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
      top:  60px;
        `
      : `
      top: 6px;
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
  width: fit-content;
  a {
    text-decoration: none;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
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
        </CurrentUser>
      </CurrentUserContainer>
      <SuggestionContainer></SuggestionContainer>
      <OtherLinks></OtherLinks>
    </Container>
  );
};

export default Suggestions;
