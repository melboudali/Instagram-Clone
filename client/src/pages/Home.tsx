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
import FormINput from '../components/layouts/FormInput';
import Instagram from '../assets/images/d6bf0c928b5a.jpg';
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
                <FormINput />
              </InputsContainer>
            </LoginForm>
          </FormContainer>
        </LoginContainer>
      </RightComponent>
    </Container>
  );
};

// Home.propTypes = {};

export default Home;
