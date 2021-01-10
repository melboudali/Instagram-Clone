import styled from 'styled-components';
import Story from './Story';
import Assets from '../assets/images/798b49104da7.png';
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 116px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin: 54px 0 16px;
  overflow: hidden;
`;

const Main = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const NextBtn = styled.button`
  right: 0;
  cursor: pointer;
  padding: 0;
  background: 0 0;
  border: 0;
  justify-self: center;
  outline: 0;
  padding: 16px 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Next = styled.div`
  height: 45px;
  width: 45px;
  background-image: url(${Assets});
  background-repeat: no-repeat;
  background-position: -294px -273px;
`;

type StoriesProps = {};

const Stories = ({}: StoriesProps) => {
  const SlideToTheRight = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
  };

  return (
    <Container>
      <Main>
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </Main>
      <NextBtn>
        <Next onClik={SlideToTheRight}/>
      </NextBtn>
    </Container>
  );
};

export default Stories;
