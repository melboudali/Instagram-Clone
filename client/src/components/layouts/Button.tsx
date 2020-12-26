import styled from 'styled-components';
import PropTypes from 'prop-types';

type ButtonProps = {
  active: boolean;
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  onClickFunction: Function;
};

export const ButtonContainer = styled.div`
  margin: 8px 40px;
`;

export const ButtonElement = styled.button<{ active: boolean }>`
  opacity: ${({ active }) => (active ? '1' : '0.3')};
  border: 1px solid transparent;
  background-color: var(--buttonLightBlue);
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

const Button = ({ active, children, type, onClickFunction }: ButtonProps) => {
  return (
    <ButtonContainer>
      <ButtonElement
        active={active}
        type={type}
        onClick={e => {
          e.preventDefault();
          onClickFunction();
        }}>
        {children}
      </ButtonElement>
    </ButtonContainer>
  );
};

Button.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  type: PropTypes.string
};

export default Button;
