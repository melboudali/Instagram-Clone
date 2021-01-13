import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.article`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin-bottom: 60px;
`;

const Header = styled.header`
  position: relative;
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

const NameContainer = styled.div`
  margin-left: 14px;
`;

const Name = styled(Link)`
  color: #262626;
  border: 0;
  display: inline;
  padding: 0;
  position: relative;
  text-decoration: none;
  user-select: auto;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  width: auto;
`;

const More = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  top: 0;
  bottom: 0;
  right: 4px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: none;
    cursor: pointer;
    padding: 8px;
    margin: 0;
  }
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
            <Logo src={logo} alt='logo' />
          </LogoBackground>
        </LogoContainer>
        <NameContainer>
          <Name to={`/${name}`}>{name}</Name>
        </NameContainer>
        <More>
          <button type='button'>
            <svg fill='#262626' height='16' viewBox='0 0 48 48' width='16'>
              <circle clipRule='evenodd' cx='8' cy='24' fillRule='evenodd' r='4.5'></circle>
              <circle clipRule='evenodd' cx='24' cy='24' fillRule='evenodd' r='4.5'></circle>
              <circle clipRule='evenodd' cx='40' cy='24' fillRule='evenodd' r='4.5'></circle>
            </svg>
          </button>
        </More>
      </Header>
      <img src={image} alt='hh' style={{ width: '100%' }} />
    </Container>
  );
};

export default Post;
