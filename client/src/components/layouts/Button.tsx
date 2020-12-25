import styled from 'styled-components';
import PropTypes from 'prop-types';

type ButtonProps = {
  Active: boolean;
  children: React.ReactNode;
};

export const ButtonContainer = styled.div`
  margin: 8px 40px;
`;

export const ButtonElement = styled.button<{ active: boolean }>`
  opacity: ${({ active }) => (active ? '1' : '0.3')};
  border: 1px solid transparent;
  background-color: #0095f6;
  border-radius: 4px;
  color: #fff;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  display: block;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding: 5px 9px;
  text-align: center;
  width: 100%;
`;

const Button = ({ Active, children }: ButtonProps) => {
  const onClickFunc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
  };
  return (
    <ButtonContainer>
      <ButtonElement active={Active} type='submit' onClick={onClickFunc}>
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
