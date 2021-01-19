import { useState } from 'react';
import { useUploadImageMutation } from '../generated/graphql';
import Button from './layouts/Button';
import styled from 'styled-components';
import { MeQuery } from '../generated/graphql';

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
  display: flex;
  position: absolute;
  border: none;
  width: 700px;
  min-height: 60px;
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
  z-index: 2;
  svg {
    stroke: var(--textColorGray);
  }
`;

const ImageContainer = styled.img`
  display: block;
  width: 300px;
  height: 100%;
`;

const ImageCaptionContainer = styled.div`
  flex: 1 1 100%;
  position: relative;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 14px;
  color: var(--textColorDarkGray);
  text-align: center;
  padding: 10px 0 0 0;
  margin: 0;
`;

const CaptionContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 20px;
`;

const Caption = styled.div`
  display: flex;
`;

const UserImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
`;

const CaptionArea = styled.textarea`
  height: 120px;
  background: none;
  border: 0;
  color: #262626;
  flex: 1 1 100%;
  outline: 0;
  padding: 0;
  resize: none;
  margin: 0 0 10px 10px;
`;

type ModalProps = {
  imageUpload: File | undefined;
  UploadedImage: string | undefined;
  setOpenModal: (arg0: boolean) => void;
  data: MeQuery | undefined;
};

const Modal = ({ imageUpload, UploadedImage, setOpenModal, data }: ModalProps) => {
  const [uploadImageFunc] = useUploadImageMutation();
  const [caption, setCaption] = useState<string>('');
  const [UploadLoading, setLoadingUpload] = useState<boolean>(false);

  const Scrollbar = (arg: 'show' | 'hide') => {
    arg === 'show'
      ? (document.documentElement.style.overflowY = 'visible')
      : (document.documentElement.style.overflowY = 'hidden');
  };
  Scrollbar('hide');

  const UploadFile = async () => {
    setLoadingUpload(true);
    if (imageUpload) {
      try {
        const res = await uploadImageFunc({ variables: { file: imageUpload } });
        console.log(res.data?.uploadImage);
        setLoadingUpload(false);
      } catch (error) {
        setLoadingUpload(false);
        console.error(error);
      }
    }
  };

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
        <ImageCaptionContainer>
          <Title>New Post</Title>
          <CaptionContainer>
            <Caption>
              <UserImage src={data?.me?.imageUrl} alt='profile' />
              <CaptionArea
                placeholder='Write a caption...'
                autoComplete='off'
                autoCorrect='off'
                autoFocus
                value={caption}
                maxLength={200}
                onChange={e => setCaption(e.target.value)}
              />
            </Caption>
            <Button
              active={!!caption}
              loading={UploadLoading}
              type='button'
              onClickFunction={UploadFile}>
              Post
            </Button>
          </CaptionContainer>
        </ImageCaptionContainer>
      </Main>
    </Container>
  );
};

export default Modal;
