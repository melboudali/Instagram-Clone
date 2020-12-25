import { useState } from 'react';
import { Main, InputContainer, Label, Span, Input, ShowButton } from './FormInput.style';
import PropTypes from 'prop-types';
import { off } from 'process';

type FormInputProps = {
  LabelText: string;
  Required: boolean;
  Maxlength: number | undefined;
  Name: string;
  Type: string;
};

const FromInput = ({ LabelText, Required, Maxlength, Name, Type }: FormInputProps) => {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onChangeFunction = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onClickFunction = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <Main>
      <InputContainer>
        <Label>
          <Span value={value}>{LabelText}</Span>
          <Input
            aria-label={LabelText}
            aria-required={Required}
            autoCapitalize='off'
            autoCorrect='off'
            maxLength={Maxlength}
            name={Name}
            type={Type === 'password' && showPassword ? 'text' : Type}
            value={value}
            autoComplete='off'
            onChange={onChangeFunction}
          />
          {Type === 'password' && value.length > 0 && (
            <ShowButton type='button' onClick={onClickFunction}>
              {showPassword ? 'hide' : 'show'}
            </ShowButton>
          )}
        </Label>
      </InputContainer>
    </Main>
  );
};

FromInput.propTypes = {
  LabelText: PropTypes.string.isRequired,
  Required: PropTypes.bool.isRequired,
  Maxlength: PropTypes.number,
  Name: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired
};

export default FromInput;
