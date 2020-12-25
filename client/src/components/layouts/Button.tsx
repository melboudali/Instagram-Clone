import { ButtonContainer, ButtonElement } from './Button.style';
import PropTypes from 'prop-types';

type ButtonProps = {
  Active: boolean;
  children: React.ReactNode;
};

const Button = ({ children, Active }: ButtonProps) => {
  return (
    <ButtonContainer>
      <ButtonElement active={Active} type='submit'>
        {children}
      </ButtonElement>
    </ButtonContainer>
  );
};

Button.propTypes = {
  Active: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};

export default Button;
