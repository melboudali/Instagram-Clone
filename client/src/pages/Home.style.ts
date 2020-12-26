import styled from 'styled-components';
import BackgroundImage from '../assets/images/43cc71bb1b43.png';
import Assets from '../assets/images/32f0a4f27407.png';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.section`
  display: flex;
  width: 100%;
  margin: 32px auto 0;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  max-width: 935px;
  padding-bottom: 32px;
`;

export const LeftComponent = styled.div`
  position: relative;
  background: url('${BackgroundImage}');
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 454px 618px;
  margin-left: -35px;
  margin-right: -15px;
  flex-basis: 454px;
  height: 618px;
`;

export const RightComponent = styled.div`
  align-self: center;
  color: var(--textColorDarkGray);
  flex-grow: 1;
  margin-top: 12px;
  max-width: 350px;
  flex-basis: 454px;
`;

export const LoginContainer = styled.div`
  background-color: #fff;
  border: 1px solid var(--borderColor);
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 10px 0;
`;

export const Logo = styled.h1`
  margin: 22px auto 12px;
  background: url(${Assets});
  background-repeat: no-repeat;
  background-position: 0 -130px;
  height: 51px;
  width: 175px;
`;

export const FormContainer = styled.div`
  margin-bottom: 10px;
  max-width: 350px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputsContainer = styled.div`
  margin-top: 24px;
  flex: 0 0 auto;
  justify-content: flex-start;
`;

export const ImagesContainer = styled.img`
  height: 427px;
  left: 0;
  position: absolute;
  top: 0;
  width: 240px;
  margin: 99px 0 0 151px;
`;

export const FBButtonContainer = styled.div`
  margin: 8px 40px;
  text-align: center;
`;

export const FBButton = styled.button`
  display: inline-flex;
  cursor: pointer;
  font-weight: 600;
  justify-self: center;
  align-items: center;
  border: none;
  outline: none;
  background: none;
`;

export const FBLogo = styled.span`
  margin-right: 8px;
  background: url(${Assets});
  background-repeat: no-repeat;
  background-position: -414px -259px;
  height: 16px;
  width: 16px;
`;

export const ButtonText = styled.span`
  color: var(--linkColor);
`;

export const ErrorContainer = styled.div`
  margin: 10px 40px;
  p {
    color: var(--textErrorColor);
    font-size: 14px;
    line-height: 18px;
    text-align: center;
  }
`;

export const ForgotPwdContainer = styled.div`
  text-align: center;
  margin: 12px 40px 0;
`;

export const ForgotPwd = styled.a`
  color: var(--linkColorTwo);
  font-size: 12px;
  line-height: 14px;
`;

export const Signup = styled.div`
  margin: -3px 0 -4px;
  p {
    color: var(--textColorDarkGray);
    font-size: 14px;
    margin: 15px;
    text-align: center;
  }
  a {
    span {
      font-weight: 600;
      color: var(--buttonLightBlue);
      margin-left: 5px;
    }
  }
`;

export const GetTheAppContainer = styled.div`
  position: relative;
  overflow: auto;
  text-align: center;
  p {
    color: var(--textColorDarkGray);
    font-size: 14px;
    line-height: 18px;
    margin: 10px 20px;
  }
`;

export const AppsButtons = styled.div`
  display: inline-flex;
  margin: 10px 0;
  flex-direction: row;
  a {
    align-items: center;
    &:nth-child(1) {
      margin-right: 8px;
    }
    img {
      height: 40px;
    }
  }
`;