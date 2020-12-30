import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BackgroundImage from '../assets/images/43cc71bb1b43.png';
import Assets from '../assets/images/32f0a4f27407.png';

export const Container = styled.section`
  width: 100%;
  margin: 32px auto 0;
  max-width: 935px;
  padding-bottom: 32px;
`;

export const SignupComponent = styled.div`
  color: var(--textColorDarkGray);
  margin-top: 12px;
  max-width: 350px;
  margin: 0 auto;
`;

export const SignupTitle = styled.h2`
  color: var(--textColorGray);
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  margin: 0 40px 10px;
  text-align: center;
`;

export const FBButtonContainer = styled.div`
  margin: 8px 40px;
`;

export const FBButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  border: 1px solid transparent;
  background-color: var(--buttonLightBlue);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  text-overflow: ellipsis;
  user-select: none;
  width: 100%;
  span {
    align-self: center;
    background: url(${Assets});
    margin-right: 8px;
    background-position: -414px -300px;
    background-repeat: no-repeat;
    height: 16px;
    width: 16px;
  }
`;


