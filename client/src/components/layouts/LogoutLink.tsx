import { useApolloClient } from '@apollo/client';
import { MeDocument, MeQuery, useLogoutMutation } from '../../generated/graphql';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const LogoutContainer = styled.div`
  cursor: pointer;
  outline: 0;
  &:hover > div {
    background: #fafafa;
  }
`;

const Main = styled.div`
  padding: 8px 16px;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: -3px 0 -4px;
  }
`;

const IconContainer = styled.div`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  svg {
    width: 16px;
    height: 16px;
  }
`;

const LogoutNameContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  justify-content: center;
`;

const LogoutName = styled.div`
  display: flex;
  height: 28px;
  width: 170px;

  div {
    align-self: center;
    font-weight: 400;
    font-size: 14px;
    text-transform: capitalize;
    color: #262626;
  }
`;

type LogoutLinkProps = {
  children: React.ReactNode;
};

const LogoutLink = ({ children }: LogoutLinkProps) => {
  const [logout] = useLogoutMutation();

  const logoutFunc = async () =>
    await logout({
      update: cache => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: null
          }
        });
      }
    });

  return (
    <LogoutContainer role='button' onClick={logoutFunc}>
      <Main>
        <div>
          <IconContainer>{children}</IconContainer>
          <LogoutNameContainer>
            <LogoutName>
              <div>log out</div>
            </LogoutName>
          </LogoutNameContainer>
        </div>
      </Main>
    </LogoutContainer>
  );
};

export default LogoutLink;
