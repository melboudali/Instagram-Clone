import {
  Container,
  LeftComponent,
  RightComponent,
  LoginContainer,
  Logo,
  FormContainer,
  LoginForm,
  InputsContainer,
  ImagesContainer
} from './Home.style';
import Instagram from '../assets/images/d6bf0c928b5a.jpg';
import FormINput from '../components/layouts/FormInput';
import Button from '../components/layouts/Button';
// import PropTypes from 'prop-types';

const Home = () => {
  return (
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
                />
                <FormINput
                  LabelText='Password'
                  Required={true}
                  Maxlength={undefined}
                  Name='password'
                  Type='password'
                />
              </InputsContainer>
              <Button Active={false}>Log In</Button>
            </LoginForm>
          </FormContainer>
        </LoginContainer>
      </RightComponent>
    </Container>
  );
};

// Home.propTypes = {};

export default Home;
