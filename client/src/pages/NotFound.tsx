import styled from 'styled-components';

const NotFoundContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  text-align: center;
`;

const ErrorNumber = styled.h1`
  position: relative;
  font-size: 12rem;
  color: rgba(66, 66, 66, 0.158);
  font-weight: 700;
  letter-spacing: 3px;
`;

const ErrorMessage = styled.h1`
  position: absolute;
  text-transform: uppercase;
  letter-spacing: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(107, 107, 107);
  font-size: 1.2rem;
  font-weight: lighter;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorNumber>404</ErrorNumber>
      <ErrorMessage>page not found</ErrorMessage>
    </NotFoundContainer>
  );
};

export default NotFound;
