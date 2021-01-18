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
  z-index: 2;
`;

const Main = styled.div`
  position: absolute;
  border: none;
  width: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--backgroudColor);
  animation: slide 0.3s ease-in-out;
  @keyframes slide {
    0% {
      transform: translate(-50%, -90%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
`;

const Close = styled.button`
  cursor: pointer;
  padding: 0;
  background: 0 0;
  border: 0;
  outline: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  svg {
    stroke: var(--textColorGray);
  }
`;

const ImageContainer = styled.img`
  display: block;
  width: 300px;
  height: 100%;
`;

const ImageCaptionContainer = styled.div``;

type ModalProps = {
  UploadedImage: string | undefined;
  setOpenModal: (arg0: boolean) => void;
};

const Modal = ({ UploadedImage, setOpenModal }: ModalProps) => {
  const Scrollbar = (arg: 'show' | 'hide') => {
    arg === 'show'
      ? (document.documentElement.style.overflowY = 'visible')
      : (document.documentElement.style.overflowY = 'hidden');
  };
  Scrollbar('hide');
  return (
    <Container>
      <Main>
        <Close
          type='button'
          onClick={() => {
            setOpenModal(false);
            Scrollbar('show');
          }}>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </Close>
        <ImageContainer src={UploadedImage} alt='Uploaded Image' />
        <ImageCaptionContainer></ImageCaptionContainer>
      </Main>
    </Container>
  );
};

export default Modal;
