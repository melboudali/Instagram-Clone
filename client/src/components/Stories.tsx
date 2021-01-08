import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 116px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  margin: 54px 0 16px;
  overflow: hidden;
  @keyframes Slider {
    100% {
      transform: translateX(-66.6666%);
    }
  }
`;

const Main = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-grow: 1;
  align-items: center;
  transition: opacity 0.5s ease-out;
  background-position: 0 -200px;
  animation: Slider 100s linear infinite;
`;

const Story = styled.div`
  height: 82px;
  width: 88px;
  background-color: #1f8f64;
  margin: 0 10px;
`;

type StoriesProps = {};

const Stories = ({}: StoriesProps) => {
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
    </Container>
  );
};

export default Stories;
