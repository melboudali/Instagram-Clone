import styled from 'styled-components';

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

const ImageContainer = styled.div`
  display: block;
  position: relative;
  height: fit-content;
  width: fit-content;
`;

type PostProps = {};

const Post = ({}: PostProps) => {
  return (
    <Container>
      <Header><ImageContainer></ImageContainer>This is Post Component/Page</Header>
    </Container>
  );
};

export default Post;
