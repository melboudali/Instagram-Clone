import { useState, Fragment } from 'react';
import {
  Container,
  LeftComponent,
  RightComponent,
  LoginContainer,
  Logo,
  FormContainer,
  LoginForm,
  InputsContainer,
  FBButtonContainer,
  FBButton,
  FBLogo,
  ButtonText,
  ErrorContainer,
  ForgotPwd,
  ForgotPwdContainer,
  Signup,
  GetTheAppContainer,
  AppsButtons
} from './Signin.style';
import Carousel from '../components/layouts/Carousel';
import FormINput from '../components/layouts/FormInput';
import Button from '../components/layouts/Button';
import Divider from '../components/layouts/Divider';
import GooglePlay from '../assets/images/e9cd846dc748.png';
import PlayStore from '../assets/images/180ae7a0bcf7.png';
import Footer from '../components/layouts/Footer';
import { useLoginMutation } from '../generated/graphql';

const Signin = () => {
  const [login] = useLoginMutation();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginLoginError, setLoginLoginError] = useState('');

  const loginFunction = async () => {
    setLoginLoading(true);
    await login({
      variables: {
        userNameOrEmail: userName,
        password
      }
    }).then(({ data }) => {
      if (data?.login.error) {
        setLoginLoading(false);
        setLoginLoginError(data?.login.error.message);
      } else if (data?.login.user) {
        setLoginLoading(false);
        console.log({ registred: true, user: data.login.user });
      }
    });
  };

  return (
    <Fragment>
      <Container>
        <LeftComponent>
          <Carousel />
        </LeftComponent>
        <RightComponent>
          <LoginContainer>
            <Logo />
            <FormContainer>
              <LoginForm>
                <InputsContainer>
                  <FormINput
                    LabelText='Phone number, username, or email'
                    Required={true}
                    Maxlength={75}
                    Name='username'
                    Type='text'
                    inputValue={userName}
                    setInputValue={setUserName}
                  />
                  <FormINput
                    LabelText='Password'
                    Required={true}
                    Maxlength={undefined}
                    Name='password'
                    Type='password'
                    inputValue={password}
                    setInputValue={setPassword}
                  />
                </InputsContainer>
                <Button
                  active={userName.length > 0 && password.length > 0 ? true : false}
                  loading={loginLoading}
                  onClickFunction={loginFunction}
                  type='submit'>
                  Log In
                </Button>
                <Divider />
                <FBButtonContainer>
                  <FBButton type='button'>
                    <FBLogo />
                    <ButtonText>Log in with Facebook</ButtonText>
                  </FBButton>
                </FBButtonContainer>
                {loginLoginError.length > 0 && (
                  <ErrorContainer>
                    <p>{loginLoginError}</p>
                  </ErrorContainer>
                )}
              </LoginForm>
              <ForgotPwdContainer>
                <ForgotPwd href='#'>Forgot password?</ForgotPwd>
              </ForgotPwdContainer>
            </FormContainer>
          </LoginContainer>
          <LoginContainer>
            <Signup>
              <p>
                Don't have an account?
                <a href='/accounts/emailsignup'>
                  <span>Sign up</span>
                </a>
              </p>
            </Signup>
          </LoginContainer>
          <GetTheAppContainer>
            <p>Get the app.</p>
            <AppsButtons>
              <a href='https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo'>
                <img src={PlayStore} alt='Available on the App Store"' />
              </a>
              <a href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D12078F57-18AD-43B5-B18B-9B5D69598FA1%26utm_content%3Dlo%26utm_medium%3Dbadge'>
                <img src={GooglePlay} alt='Available on Google Play' />
              </a>
            </AppsButtons>
          </GetTheAppContainer>
        </RightComponent>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Signin;
