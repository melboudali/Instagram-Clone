import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/images/735145cfe0a4.png';
import Assets from '../assets/images/32f0a4f27407.png';

type NavbarProps = {};

const Container = styled.div`
  height: 54px;
  background-color: #fff;
  border-bottom: 1px solid var(--borderColor);
`;

const NavbarContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 975px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  transition: height 0.2s ease-in-out;
  width: 100%;
  height: 100%;
  div:nth-child(1) {
    flex: 1 9999 0%;
    min-width: 40px;
    a {
      display: flex;
      align-items: center;
    }
    img {
      align-self: center;
      margin-top: 7px;
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  }
  div:nth-child(2) {
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    height: 28px;
    width: 215px;
    min-width: 125px;
    background: var(--backgroudColor);
    border: 1px solid var(--borderColor);
    border-radius: 3px;
    span {
      margin: 0 10px;
      background: url(${Assets});
      background-repeat: no-repeat;
      background-position: -399px -321px;
      height: 10px;
      width: 10px;
    }
    input[type='text'] {
      color: var(--textColorGray);
      font-size: 14px;
      outline: none;
      border: none;
      padding: 0 10px 0 0;
      height: 100%;
      width: calc(100% - 30px);
    }
  }
`;

const Navbar = ({}: NavbarProps) => {
  return (
    <Container>
      <NavbarContainer>
        <div>
          <Link to='/'>
            <img src={Logo} alt='dd' />
          </Link>
        </div>
        <div>
          <span></span>
          <input type='text' name='' id='' placeholder='Search' />
        </div>
        <div></div>
      </NavbarContainer>
    </Container>
  );
};

export default Navbar;
