import styled from 'styled-components';
import { getSyntheticLeadingComments } from 'typescript';

const Container = styled.article`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin-bottom: 60px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 60px;
  padding: 16px;
  border-bottom: 1px solid #efefef;
`;

const LogoContainer = styled.div`
  display: block;
  position: relative;
  height: 40px;
  width: 40px;
  background-image: linear-gradient(to left bottom, #a524a5, #fc8a36);
  border-radius: 50%;
  padding: 2px;
`;

const LogoBackground = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 2px;
`;

const Logo = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

type PostProps = {
  name: string;
  logo: string;
  image: string;
  description: string;
  liked: string;
  comments: { user: string; comment: string }[];
  commentsLength: number;
  createdTime: string;
};

const Post = ({
  name,
  logo,
  image,
  description,
  liked,
  comments,
  commentsLength,
  createdTime
}: PostProps) => {
  return (
    <Container>
      <Header>
        <LogoContainer>
          <LogoBackground>
            <Logo />
          </LogoBackground>
        </LogoContainer>
        This is Post Component/Page
      </Header>
    </Container>
  );
};

export default Post;
