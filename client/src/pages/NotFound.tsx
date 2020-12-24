import { NotFoundContainer, ErrorNumber, ErrorMessage } from './NotFound.style';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorNumber>404</ErrorNumber>
      <ErrorMessage>page not found</ErrorMessage>
    </NotFoundContainer>
  );
};

export default NotFound;
