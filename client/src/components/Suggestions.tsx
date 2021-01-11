import styled from 'styled-components';

const Container = styled.div`
  background-color: red;
  left: 849px;
  right: 0;
  top: 472px;
  position: fixed;
  max-width: 293px;
  width: 100%;
`;

type SuggestionsProps = {};

const Suggestions = ({}: SuggestionsProps) => {
  return <Container>This is Suggestions Component/Page</Container>;
};

export default Suggestions;
