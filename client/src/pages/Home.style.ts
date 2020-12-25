import styled, { css } from 'styled-components';
import BackgroundImage from '../assets/images/43cc71bb1b43.png';
import Assets from '../assets/images/32f0a4f27407.png';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const Container = styled.section`
  display: flex;
  width: 100%;
  margin: 32px auto 0;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  margin: 32px auto 0;
  max-width: 935px;
  padding-bottom: 32px;
  width: 100%;
`;

const LeftRighComp = css`
  flex-basis: 454px;
  height: 618px;
`;

export const LeftComponent = styled.div`
  position: relative;
  background: url('${BackgroundImage}');
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 454px 618px;
  margin-left: -35px;
  margin-right: -15px;
  ${LeftRighComp}
`;

export const RightComponent = styled.div`
  display: block;
  color: #262626;
  flex-grow: 1;
  justify-content: center;
  margin-top: 12px;
  max-width: 350px;
  box-pack: center;
  ${LeftRighComp}
`;

export const LoginContainer = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid var(--borderColor);
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 10px 0;
`;

export const Logo = styled.h1`
  margin: 22px auto 12px;
  background: url(${Assets});
  background-repeat: no-repeat;
  background-position: 0 -130px;
  height: 51px;
  width: 175px;
`;

export const FormContainer = styled.div`
  margin-bottom: 10px;
  max-width: 350px;
  width: 100%;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputsContainer = styled.div`
  margin-top: 24px;
  flex: 0 0 auto;
  justify-content: flex-start;
`;

export const ImagesContainer = styled.img`
  height: 427px;
  left: 0;
  position: absolute;
  top: 0;
  width: 240px;
  margin: 99px 0 0 151px;
`;
