import { Main, InputContainer, Label, Span, Input } from './FormInput.style';
// import PropTypes from 'prop-types';

const FromInput = () => {
  return (
    <Main>
      <InputContainer>
        <Label>
          <Span>Phone number, username, or email</Span>
          <Input
            aria-label='Phone number, username, or email'
            aria-required='true'
            autocapitalize='off'
            autocorrect='off'
            maxlength='75'
            name='username'
            type='text'
            value=''
          />
        </Label>
      </InputContainer>
    </Main>
  );
};

// FromInput.propTypes = {};

export default FromInput;
