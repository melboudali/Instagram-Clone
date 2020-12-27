import styled from 'styled-components';

export const Main = styled.div`
  margin: 0 40px 6px;
`;

export const InputContainer = styled.div`
  background: var(--backgroudColor);
  border: 1px solid var(--borderColor);
  border-radius: 3px;
  color: var(--textColorDarkGray);
  display: flex;
  flex-direction: row;
  font-size: 14px;
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  height: 36px;
  flex: 1 0 0;
  padding: 0;
  margin: 0;
  min-width: 0;
  cursor: text;
`;

export const Span = styled.span<{ value: string }>`
  color: var(--textColorGray);
  font-size: 12px;
  height: 36px;
  left: 8px;
  line-height: 36px;
  position: absolute;
  right: 0;
  text-overflow: ellipsis;
  transform-origin: left;
  transition: transform ease-out 0.1s;
  ${({ value }) => value.length > 0 && 'transform: scale(.83333) translateY(-10px);'}
  cursor: text;
`;

export const Input = styled.input<{ value: string }>`
  background: var(--backgroudColor);
  border: none;
  flex: 1 0 auto;
  margin: 0;
  outline: none;
  text-overflow: ellipsis;
  ${({ value }) =>
    value.length > 0
      ? 'font-size: 12px; padding: 14px 8px 2px;'
      : 'font-size: 16px; padding: 9px 8px 7px;'};
  cursor: text;
`;

export const ShowButton = styled.button`
  background: none;
  color: var(--textColorDarkGray);
  border: none;
  cursor: pointer;
  font-weight: 600;
  padding: 9px 4px;
  text-align: center;
  height: 100%;
  text-transform: capitalize;
`;
