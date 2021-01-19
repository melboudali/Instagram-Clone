import { useState } from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import { MeQuery } from '../../generated/graphql';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 24px auto 0;
  height: 160px;
  /* width: 676px; */
  width: 70%;
  background-color: #fff;
  border: 1px dashed #dbdbdb;
  border-radius: 5px;
`;

const SvgContainer = styled.div`
  flex-wrap: 1;
`;

const UploadText = styled.div`
  flex-wrap: 1;
  color: #8e8e8e;
  margin-top: 15px;
  letter-spacing: 1px;
  text-align: center;
  span {
    font-weight: 500;
  }
`;

const ErrorMessage = styled.span`
  color: var(--textErrorColor);
  font-weight: 300;
  display: block;
  margin-top: 10px;
`;

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

type FileUploadInputProps = {
  data: MeQuery | undefined;
};

const FileUploadInput = ({ data }: FileUploadInputProps) => {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);
  const [uploadErrorMessage, setUploadErroMessage] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Files = e.target.files;

    if (Files?.length === 1) {
      const FileType = Files[0].type;
      if (FileType === 'image/jpeg' || FileType === 'image/png') {
        if (FileReader) {
          const fr = new FileReader();
          fr.onload = function () {
            setImageUri(fr.result as string);
            setUploadError(false);
            setOpenModal(true);
          };
          fr.readAsDataURL(Files[0]);
        }
        setImageFile(Files[0]);
      } else {
        setUploadErroMessage("We only accept 'jpg', 'jpeg', 'png' files !!");
        setUploadError(true);
      }
    } else {
      setUploadErroMessage('Too many files !!');
      setUploadError(true);
    }
  };
  return (
    <Container>
      {openModal && (
        <Modal imageUri={imageUri} imageFile={imageFile} setOpenModal={setOpenModal} data={data} />
      )}
      <SvgContainer>
        <svg
          width='131'
          height='67'
          viewBox='0 0 131 67'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M67.7938 47.0103C67.1739 47.6721 66.0639 47.2334 66.0639 46.3267V1.5C66.0639 1.22386 65.8401 1 65.5639 1C65.2878 1 65.0639 1.22386 65.0639 1.5V46.3267C65.0639 47.2334 63.954 47.6721 63.3341 47.0103L47.8649 30.4964C47.6761 30.2948 47.3597 30.2845 47.1582 30.4733C46.9566 30.6621 46.9463 30.9785 47.1351 31.18L65.199 50.4639C65.3966 50.6749 65.7313 50.6749 65.9289 50.4639L83.9928 31.18C84.1816 30.9785 84.1712 30.6621 83.9697 30.4733C83.7682 30.2845 83.4518 30.2948 83.263 30.4964L67.7938 47.0103ZM4.5 37C4.5 36.1716 3.82843 35.5 3 35.5C2.17157 35.5 1.5 36.1716 1.5 37V59C1.5 62.5899 4.41015 65.5 8 65.5H123C126.59 65.5 129.5 62.5899 129.5 59V37C129.5 36.1716 128.828 35.5 128 35.5C127.172 35.5 126.5 36.1716 126.5 37V59C126.5 60.933 124.933 62.5 123 62.5H8C6.067 62.5 4.5 60.933 4.5 59V37Z'
            fill='#E5E5E5'
          />
          <path
            d='M67.7938 47.0103L68.5236 47.694V47.694L67.7938 47.0103ZM63.3341 47.0103L64.0639 46.3267L63.3341 47.0103ZM47.8649 30.4964L47.1351 31.18L47.1351 31.18L47.8649 30.4964ZM47.1351 31.18L46.4053 31.8636L46.4053 31.8636L47.1351 31.18ZM65.199 50.4639L65.9289 49.7803H65.9288L65.199 50.4639ZM65.9289 50.4639L65.199 49.7803L65.9289 50.4639ZM83.9928 31.18L84.7226 31.8636H84.7226L83.9928 31.18ZM83.9697 30.4733L84.6534 29.7435L84.6534 29.7434L83.9697 30.4733ZM83.263 30.4964L83.9928 31.18H83.9928L83.263 30.4964ZM65.0639 46.3267C65.0639 48.1402 67.2838 49.0175 68.5236 47.694L67.0639 46.3267H67.0639H65.0639ZM65.0639 1.5V46.3267H67.0639V1.5H65.0639ZM65.5639 2C65.2878 2 65.0639 1.77614 65.0639 1.5H67.0639C67.0639 0.671577 66.3924 0 65.5639 0V2ZM66.0639 1.5C66.0639 1.77614 65.8401 2 65.5639 2V0C64.7355 0 64.0639 0.671578 64.0639 1.5H66.0639ZM66.0639 46.3267V1.5H64.0639V46.3267H66.0639ZM62.6043 47.694C63.8441 49.0175 66.0639 48.1402 66.0639 46.3267H64.0639L62.6043 47.694ZM47.1351 31.18L62.6043 47.694L64.0639 46.3267L48.5947 29.8127L47.1351 31.18ZM47.8418 31.2031C47.6403 31.3919 47.3239 31.3815 47.1351 31.18L48.5947 29.8127C48.0284 29.2081 47.0791 29.1771 46.4745 29.7435L47.8418 31.2031ZM47.8649 30.4964C48.0537 30.6979 48.0434 31.0143 47.8418 31.2031L46.4745 29.7435C45.8699 30.3098 45.8389 31.259 46.4053 31.8636L47.8649 30.4964ZM65.9288 49.7803L47.8649 30.4964L46.4053 31.8636L64.4692 51.1476L65.9288 49.7803ZM65.199 49.7803C65.3966 49.5694 65.7313 49.5694 65.9289 49.7803L64.4692 51.1476C65.0619 51.7803 66.066 51.7803 66.6587 51.1476L65.199 49.7803ZM83.263 30.4964L65.199 49.7803L66.6587 51.1476L84.7226 31.8636L83.263 30.4964ZM83.2861 31.2031C83.0845 31.0143 83.0742 30.6979 83.263 30.4964L84.7226 31.8636C85.289 31.259 85.2579 30.3098 84.6534 29.7435L83.2861 31.2031ZM83.9928 31.18C83.804 31.3815 83.4876 31.3919 83.2861 31.2031L84.6534 29.7434C84.0487 29.1771 83.0995 29.2081 82.5332 29.8127L83.9928 31.18ZM68.5236 47.694L83.9928 31.18L82.5332 29.8127L67.0639 46.3267L68.5236 47.694ZM3 36.5C3.27614 36.5 3.5 36.7239 3.5 37H5.5C5.5 35.6193 4.38071 34.5 3 34.5V36.5ZM2.5 37C2.5 36.7239 2.72386 36.5 3 36.5V34.5C1.61929 34.5 0.5 35.6193 0.5 37H2.5ZM2.5 59V37H0.5V59H2.5ZM8 64.5C4.96243 64.5 2.5 62.0376 2.5 59H0.5C0.5 63.1421 3.85786 66.5 8 66.5V64.5ZM123 64.5H8V66.5H123V64.5ZM128.5 59C128.5 62.0376 126.038 64.5 123 64.5V66.5C127.142 66.5 130.5 63.1421 130.5 59H128.5ZM128.5 37V59H130.5V37H128.5ZM128 36.5C128.276 36.5 128.5 36.7239 128.5 37H130.5C130.5 35.6193 129.381 34.5 128 34.5V36.5ZM127.5 37C127.5 36.7239 127.724 36.5 128 36.5V34.5C126.619 34.5 125.5 35.6193 125.5 37H127.5ZM127.5 59V37H125.5V59H127.5ZM123 63.5C125.485 63.5 127.5 61.4853 127.5 59H125.5C125.5 60.3807 124.381 61.5 123 61.5V63.5ZM8 63.5H123V61.5H8V63.5ZM3.5 59C3.5 61.4853 5.51472 63.5 8 63.5V61.5C6.61929 61.5 5.5 60.3807 5.5 59H3.5ZM3.5 37V59H5.5V37H3.5Z'
            fill='#E5E5E5'
          />
        </svg>
      </SvgContainer>
      <UploadText>
        <span>Choose a file</span> or drag it here.
        {uploadError && <ErrorMessage>{uploadErrorMessage}</ErrorMessage>}
      </UploadText>
      <FileInput type='file' title='Choose a file or drag it here.' multiple onChange={onChange} />
    </Container>
  );
};

export default FileUploadInput;
