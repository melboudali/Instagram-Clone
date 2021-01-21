import { useRef, useState, useEffect } from 'react';
import {
  GetAllImagesDocument,
  GetAllImagesQuery,
  useUploadImageMutation
} from '../generated/graphql';
import Button from './layouts/Button';
import styled from 'styled-components';
import { MeQuery } from '../generated/graphql';
import IsClickedAway from '../Hooks/IsClickedAway';

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
  min-height: 300px;
  object-fit: cover;
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
  data: MeQuery | undefined;
  imageUri: string | undefined;
  imageFile: File | undefined;
  setOpenModal: (arg: boolean) => void;
  setUploadSuccessfulMessage: (arg: string | null) => void;
};

const Modal = ({
  imageFile,
  imageUri,
  setOpenModal,
  data,
  setUploadSuccessfulMessage
}: ModalProps) => {
  const [uploadImageFunc] = useUploadImageMutation();

  const [caption, setCaption] = useState<string>('');
  const [UploadLoading, setLoadingUpload] = useState<boolean>(false);

  const Scrollbar = (arg: 'show' | 'hide') => {
    arg === 'show'
      ? (document.documentElement.style.overflowY = 'visible')
      : (document.documentElement.style.overflowY = 'hidden');
  };

  const ref = useRef<HTMLDivElement>(null);
  const { clickedAway } = IsClickedAway(ref);

  useEffect(() => {
    Scrollbar('hide');
    if (clickedAway) {
      setOpenModal(false);
      Scrollbar('show');
    }
  }, [clickedAway, setOpenModal]);

  const closeModal = () => {
    setLoadingUpload(false);
    setOpenModal(false);
    Scrollbar('show');
  };

  const UploadFile = async () => {
    setLoadingUpload(true);
    if (imageFile) {
      // With vanilla js using FormData can work also with Postman
      // const formData = new FormData();
      // formData.append(
      //   'operations',
      //   JSON.stringify({
      //     query: 'mutation UploadImage($file: Upload!) {\n  uploadImage(file: $file)\n}'
      //   })
      // );
      // formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
      // formData.append('0', imageUpload);
      // try {
      //   fetch('http://localhost:5000/graphql', {
      //     method: 'POST',
      //     body: formData
      //   });
      //   setLoadingUpload(false);
      //   setOpenModal(false);
      //   Scrollbar('show');
      // } catch (error) {
      //   console.error(error);
      //   setLoadingUpload(false);
      //   setOpenModal(false);
      //   Scrollbar('show');
      // }

      // With Apollo-upload-client
      try {
        const res = await uploadImageFunc({
          variables: { file: imageFile, caption: caption },
          update: (cache, { data }) => {
            const newImage = data?.uploadImage.imageData;
            const existingImages = cache.readQuery<GetAllImagesQuery>({
              query: GetAllImagesDocument
            });

            cache.writeQuery<GetAllImagesQuery>({
              query: GetAllImagesDocument,
              variables: { limit: 5, cursor: null },
              data: {
                getAllImages: {
                  hasMore: true,
                  __typename: "PaginatedImages",
                  images: [...existingImages!.getAllImages.images, data!.uploadImage.imageData]
                }
              }
            });
          }
        });
        if (res.data?.uploadImage) {
          closeModal();
          setUploadSuccessfulMessage(`Image has been successfully uploaded!`);
        } else {
          setUploadSuccessfulMessage(null);
        }
      } catch (error) {
        setUploadSuccessfulMessage(null);
        closeModal();
      }
    }
  };

  return (
    <Container>
      <Main ref={ref}>
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
        <ImageContainer src={imageUri} alt='Uploaded Image' />
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