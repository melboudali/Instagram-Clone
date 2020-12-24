import styled from 'styled-components';

export const Main = styled.div`
  margin: 0 40px 6px;
`;

export const InputContainer = styled.div`
  align-items: center;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  box-sizing: border-box;
  color: #262626;
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
  position: relative;
  margin: 0;
  min-width: 0;
`;

export const Span = styled.span`
  color: #8e8e8e;
  font-size: 12px;
  height: 36px;
  left: 8px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-overflow: ellipsis;
  transform-origin: left;
  transition: transform ease-out 0.1s;
  user-select: none;
  white-space: nowrap;
`;

export const Input = styled.input`
  font-size: 16px;
  background: #fafafa;
  border: 0;
  flex: 1 0 auto;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
`;
