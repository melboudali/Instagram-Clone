import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    window.onscroll = () => {
      window.scrollY >= 378 ? setSticky(true) : setSticky(false);
    };
  }, []);

  return <Container isSticky={sticky}>This is Suggestions Component/Page</Container>;
};

export default Suggestions;
