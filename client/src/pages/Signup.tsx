import { Fragment, useState } from 'react';
import {
  Container,
  SignupComponent,
  SignupTitle,
  FBButtonContainer,
  FBButton,
  Terms,
  TermsLink
} from './Signup.style';
import {
  LoginContainer,
  Logo,
  FormContainer,
  Form,
  Signup as Login,
  ErrorContainer,
  SignupLink,
  GetTheAppContainer,
  AppsButtons
} from './Signin.style';
import Divider from '../components/layouts/Divider';
import FormINput from '../components/layouts/FormInput';
import Button from '../components/layouts/Button';
import GooglePlay from '../assets/images/e9cd846dc748.png';
import PlayStore from '../assets/images/180ae7a0bcf7.png';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import Footer from '../components/layouts/Footer';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const [login] = useRegisterMutation();

  const [email, setEmail] = useState<string>('');
  const [fullName, setFullname] = useState<string>('');
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signupError, setSignupError] = useState<string>('');

  const [signupLoading, setSignupLoading] = useState(false);
  const [ConnectionError, setConnectionError] = useState<boolean>(false);

  const signupFunction = async () => {
    setSignupLoading(true);
    try {
      const res = await login({
        variables: {
          registerInputs: { email, fullName, userName, password }
        },
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data?.register.user
            }
          });
        }
      });
      if (res.data?.register.error) {
        setSignupError(res.data?.register.error.message);
        setSignupLoading(false);
      }
      if (res.data?.register.user) {
        setSignupError('');
        setSignupLoading(false);
        history.push('/');
      }
    } catch (error) {
      setConnectionError(true);
    }
  };

  return ConnectionError ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100vh'
      }}>
      <h1 style={{ alignSelf: 'center', color: '#747474' }}>503 Service Unavailable</h1>
    </div>
  ) : (
    <Fragment>
      <Container>
        <SignupComponent>
          <LoginContainer>
            <Logo />
            <FormContainer>
              <Form>
                <SignupTitle>Sign up to see photos and videos from your friends.</SignupTitle>
                <FBButtonContainer>
                  <FBButton type='button' onClick={e => e.preventDefault()}>
                    <span></span>
                    Log in with Facebook
                  </FBButton>
                </FBButtonContainer>
                <Divider />
                <FormINput
                  LabelText='Mobile Number or Email'
                  Required={true}
                  Maxlength={75}
                  Name='email'
                  Type='text'
                  inputValue={email}
                  setInputValue={setEmail}
                />
                <FormINput
                  LabelText='Full Name'
                  Required={true}
                  Maxlength={75}
                  Name='fullname'
                  Type='text'
                  inputValue={fullName}
                  setInputValue={setFullname}
                />
                <FormINput
                  LabelText='Username'
                  Required={true}
                  Maxlength={75}
                  Name='username'
                  Type='text'
                  inputValue={userName}
                  setInputValue={setUsername}
                />
                <FormINput
                  LabelText='Password'
                  Required={true}
                  Name='password'
                  Type='password'
                  inputValue={password}
                  setInputValue={setPassword}
                />
                <Button
                  active={
                    !!email.length && !!fullName.length && !!userName.length && !!password.length
                  }
                  loading={signupLoading}
                  onClickFunction={signupFunction}
                  type='submit'>
                  Sign up
                </Button>
                {signupError.length > 0 && (
                  <ErrorContainer>
                    <p>{signupError}</p>
                  </ErrorContainer>
                )}
                <Terms>
                  By signing up, you agree to our
                  <TermsLink target='_blank' to='https://help.instagram.com/581066165581870'>
                    Terms
                  </TermsLink>
                  ,
                  <TermsLink target='_blank' to='https://help.instagram.com/519522125107875'>
                    Data Policy
                  </TermsLink>
                  and
                  <TermsLink target='_blank' to='/legal/cookies/'>
                    Cookies Policy
                  </TermsLink>
                  .
                </Terms>
              </Form>
            </FormContainer>
          </LoginContainer>
          <LoginContainer>
            <Login>
              <p>
                Have an account?
                <SignupLink to='/accounts/login'>
                  <span>Log in</span>
                </SignupLink>
              </p>
            </Login>
          </LoginContainer>
          <GetTheAppContainer>
            <p>Get the app.</p>
            <AppsButtons>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo'>
                <img src={PlayStore} alt='Available on the App Store"' />
              </a>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D12078F57-18AD-43B5-B18B-9B5D69598FA1%26utm_content%3Dlo%26utm_medium%3Dbadge'>
                <img src={GooglePlay} alt='Available on Google Play' />
              </a>
            </AppsButtons>
          </GetTheAppContainer>
        </SignupComponent>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Signup;
