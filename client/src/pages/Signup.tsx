import { Fragment, useState } from 'react';
import {
  Container,
  SignupComponent,
  SignupTitle,
  FBButtonContainer,
  FBButton
} from './Signup.style';
import { LoginContainer, Logo, FormContainer, Form } from './Signin.style';
import Divider from '../components/layouts/Divider';
import FormINput from '../components/layouts/FormInput';
import Button from '../components/layouts/Button';
import { useRegisterMutation } from '../generated/graphql';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const [login] = useRegisterMutation();

  const [email, setEmail] = useState('');
  const [fullName, setFullname] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  const signupFunction = async () => {
    setSignupLoading(true);
    await login({
      variables: {
        registerInputs: { email, fullName, userName, password }
      }
    }).then(({ data }) => {
      if (data?.register.error) {
        setSignupLoading(false);
        setSignupError(data?.register.error.message);
      }
      if (data?.register.user) {
        history.goBack();
        setSignupLoading(false);
      }
    });
  };

  return (
    <Fragment>
      <Container>
        <SignupComponent>
          <LoginContainer>
            <Logo />
            <FormContainer>
              <Form>
                <SignupTitle>Sign up to see photos and videos from your friends.</SignupTitle>
                <FBButtonContainer>
                  <FBButton>
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
                  Maxlength={undefined}
                  Name='password'
                  Type='password'
                  inputValue={password}
                  setInputValue={setPassword}
                />
                <Button
                  active={
                    email.length > 0 &&
                    fullName.length > 0 &&
                    userName.length > 0 &&
                    password.length > 0
                      ? true
                      : false
                  }
                  loading={signupLoading}
                  onClickFunction={signupFunction}
                  type='submit'>
                  Sign up
                </Button>
              </Form>
            </FormContainer>
          </LoginContainer>
        </SignupComponent>
      </Container>
    </Fragment>
  );
};

export default Signup;
