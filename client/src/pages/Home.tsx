import {
  Container,
  LeftComponent,
  RightComponent,
  LoginContainer,
  Logo,
  FormContainer,
  LoginForm,
  InputsContainer,
  ImagesContainer,
  FBButtonContainer,
  FBButton,
  FBLogo,
  ButtonText,
  ForgotPwd,
  ForgotPwdContainer,
  Signup,
  GetTheAppContainer,
  AppsButtons,
  Footer,
  LinksContainer,
  Links,
  Lang,
  Link
} from './Home.style';
import Instagram from '../assets/images/d6bf0c928b5a.jpg';
import FormINput from '../components/layouts/FormInput';
import Button from '../components/layouts/Button';
import Divider from '../components/layouts/Divider';
import { useState } from 'react';
import GooglePlay from '../assets/images/e9cd846dc748.png';
import PlayStore from '../assets/images/180ae7a0bcf7.png';

// import PropTypes from 'prop-types';

const Home = () => {
  const [userNameLength, setUserNameLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);

  return (
    <>
      <Container>
        <LeftComponent>
          <ImagesContainer src={Instagram} alt='image' />
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
                    SetLengthFunc={setUserNameLength}
                  />
                  <FormINput
                    LabelText='Password'
                    Required={true}
                    Maxlength={undefined}
                    Name='password'
                    Type='password'
                    SetLengthFunc={setPasswordLength}
                  />
                </InputsContainer>
                <Button Active={userNameLength > 0 && passwordLength > 0 ? true : false}>
                  Log In
                </Button>
                <Divider />
                <FBButtonContainer>
                  <FBButton type='button'>
                    <FBLogo />
                    <ButtonText>Log in with Facebook</ButtonText>
                  </FBButton>
                </FBButtonContainer>
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
                <a href='/'>
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
      <Footer>
        <LinksContainer>
          <Links>
            <div>
              <Link>
                <a href='/about'>
                  <div>about</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>blog</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>jobs</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>aPI</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>privacy</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>terms</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>top accounts</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>hashtags</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>locations</div>
                </a>
              </Link>
            </div>
            <div>
              <Link>
                <a href='/about'>
                  <div>beauty</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>dance & performance</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>fitness</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>food & drink</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>home & garden</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>music</div>
                </a>
              </Link>
              <Link>
                <a href='/about'>
                  <div>visual arts</div>
                </a>
              </Link>
            </div>
          </Links>
          <Lang>
            <div>
              English
              <span>
                <svg
                  width='11'
                  height='6'
                  viewBox='0 0 11 6'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M1 1L5.5 5L10 1'
                    stroke='#8E8E8E'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </span>
            </div>
            <div>© 2020 Instagram from Facebook</div>
          </Lang>
        </LinksContainer>
      </Footer>
    </>
  );
};

// Home.propTypes = {};

export default Home;
