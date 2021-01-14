import styled from 'styled-components';
import IsSticky from '../Hooks/IsSticky';

const Container = styled.div<{ isSticky: boolean }>`
  background-color: red;
  right: 0;
  top: 0;
  ${({ isSticky }) =>
    isSticky
      ? `
      position: fixed;
      left: 849px;
      top:  84px;
        `
      : `
      top: 10px;
      position: absolute;`}
  max-width: 293px;
  width: 100%;
`;

type SuggestionsProps = {};

const Suggestions = ({}: SuggestionsProps) => {
  const isSticky = IsSticky(378);

  return <Container isSticky={isSticky}>This is Suggestions Component/Page</Container>;
};

export default Suggestions;
