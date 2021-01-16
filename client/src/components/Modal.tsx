import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.87);
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1001;
`;

type ModalProps = {};

const Modal = ({}: ModalProps) => {
  document.documentElement.style.overflow = 'hidden';
  return <Container></Container>;
};

export default Modal;
