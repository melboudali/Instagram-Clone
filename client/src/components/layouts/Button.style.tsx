import styled from 'styled-components';

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
