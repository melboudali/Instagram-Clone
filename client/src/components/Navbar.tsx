import { useEffect, useState } from 'react';
import { MeQuery } from '../generated/graphql';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/images/735145cfe0a4.png';
import Assets from '../assets/images/32f0a4f27407.png';

type NavbarProps = { data: MeQuery | undefined; loading: boolean | undefined };

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
`;

const LeftNav = styled.div`
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
`;

const MidNav = styled.div`
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
    text-align: center;
    border-radius: 3px;
  }
`;

const RightNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0%;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  & > div {
    display: flex;
    padding-left: 24px;
  }
`;

const LinkContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 0 0 22px;
  width: 22px;
  height: 22px;
  Link {
    svg {
      height: 100%;
      width: 100%;
    }
  }
`;

const ProfileImageBorder = styled.div<{ showMenu: boolean }>`
  ${({ showMenu }) => {
    if (showMenu) {
      return `border: 1px solid #262626;
  border-radius: 50%;
  height: 28px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 28px;`;
    }
  }}
`;

const ProfileImage = styled.span`
  background-color: none;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
  width: 22px;
  height: 22px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const MenuContainer = styled.div`
  margin-left: -180px;
  top: 15px;
  position: relative;
`;

const Menu = styled.div`
  transform-origin: top center;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 75ms linear, transform 38ms ease-out;
  /* transform: translateY(-10px); */
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  position: absolute;
  z-index: 3;
`;

const Bubble = styled.div`
  left: 184px;
  bottom: 0;
  top: -6px;
  background: #fff;
  border: 1px solid #fff;
  bottom: -6px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
  height: 14px;
  position: absolute;
  transform: rotate(45deg);
  width: 14px;
`;

const MenuList = styled.div`
  background: #fff;
  border-radius: 6px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
`;

const MenuListLink = styled(Link)`
  cursor: pointer;
  outline: 0;
  &:hover > div {
    background: #fafafa;
  }
`;

const MenuListContainer = styled.div`
  padding: 8px 16px;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: -3px 0 -4px;
  }
`;

const IconContainer = styled.div`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  svg {
    width: 16px;
    height: 16px;
  }
`;

const MenuListNameContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  justify-content: center;
`;

const MenuListName = styled.div`
  display: flex;
  height: 28px;
  width: 170px;

  div {
    align-self: center;
    font-weight: 400;
    font-size: 14px;
    text-transform: capitalize;
    color: #262626;
  }
`;

const Hr = styled.hr`
  background-color: #dbdbdb;
  border: 0;
  height: 1px;
  margin: 4px 0;
  width: 100%;
`;

const Navbar = ({ data, loading }: NavbarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Container>
      <NavbarContainer>
        <LeftNav>
          <Link to='/'>
            <img src={Logo} alt='dd' />
          </Link>
        </LeftNav>
        <MidNav>
          <span></span>
          <input type='text' name='' id='' placeholder='Search' />
        </MidNav>
        <RightNav>
          <div>
            <LinkContainer>
              <Link to='/'>
                <svg aria-label='Home' fill='#262626' height='22' viewBox='0 0 48 48' width='22'>
                  <path d='M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z'></path>
                </svg>
              </Link>
            </LinkContainer>
            <LinkContainer>
              <Link to='/'>
                <svg aria-label='Direct' fill='#262626' height='22' viewBox='0 0 48 48' width='22'>
                  <path d='M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z'></path>
                </svg>
              </Link>
            </LinkContainer>
            <LinkContainer>
              <Link to='/'>
                <svg
                  aria-label='Find People'
                  fill='#262626'
                  height='22'
                  viewBox='0 0 48 48'
                  width='22'>
                  <path
                    clipRule='evenodd'
                    d='M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z'
                    fillRule='evenodd'></path>
                </svg>
              </Link>
            </LinkContainer>
            <LinkContainer>
              <Link to='/'>
                <svg
                  aria-label='Activity Feed'
                  fill='#262626'
                  height='22'
                  viewBox='0 0 48 48'
                  width='22'>
                  <path d='M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
                </svg>
              </Link>
            </LinkContainer>
            <LinkContainer onClick={() => setShowMenu(!showMenu)}>
              <ProfileImageBorder showMenu={showMenu} />
              <ProfileImage>
                <img src={data?.me?.imageUrl} alt={`${data?.me?.fullName}'s profile`} />
              </ProfileImage>
              <MenuContainer>
                <Menu>
                  <Bubble></Bubble>
                  <MenuList>
                    <MenuListLink to='/'>
                      <MenuListContainer>
                        <div>
                          <IconContainer>
                            <svg
                              aria-label='Profile'
                              fill='#262626'
                              height='16'
                              viewBox='0 0 32 32'
                              width='16'>
                              <path d='M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z'></path>
                            </svg>
                          </IconContainer>
                          <MenuListNameContainer>
                            <MenuListName>
                              <div>profile</div>
                            </MenuListName>
                          </MenuListNameContainer>
                        </div>
                      </MenuListContainer>
                    </MenuListLink>
                    <MenuListLink to='/saved'>
                      <MenuListContainer>
                        <div>
                          <IconContainer>
                            <svg
                              aria-label='Saved'
                              fill='#262626'
                              height='16'
                              viewBox='0 0 32 32'
                              width='16'>
                              <path d='M28.7 32c-.4 0-.8-.2-1.1-.4L16 19.9 4.4 31.6c-.4.4-1.1.6-1.6.3-.6-.2-.9-.8-.9-1.4v-29C1.8.7 2.5 0 3.3 0h25.4c.8 0 1.5.7 1.5 1.5v29c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM4.8 3v23.9l9.4-9.4c.9-.9 2.6-.9 3.5 0l9.4 9.4V3H4.8z'></path>
                            </svg>
                          </IconContainer>
                          <MenuListNameContainer>
                            <MenuListName>
                              <div>saved</div>
                            </MenuListName>
                          </MenuListNameContainer>
                        </div>
                      </MenuListContainer>
                    </MenuListLink>
                    <MenuListLink to='/'>
                      <MenuListContainer>
                        <div>
                          <IconContainer>
                            <svg
                              aria-label='Settings'
                              fill='#262626'
                              height='16'
                              viewBox='0 0 32 32'
                              width='16'>
                              <path d='M31.2 13.4l-1.4-.7c-.1 0-.2-.1-.2-.2v-.2c-.3-1.1-.7-2.1-1.3-3.1v-.1l-.2-.1v-.3l.5-1.5c.2-.5 0-1.1-.4-1.5l-1.9-1.9c-.4-.4-1-.5-1.5-.4l-1.5.5H23l-.1-.1h-.1c-1-.5-2-1-3.1-1.3h-.2c-.1 0-.1-.1-.2-.2L18.6.9c-.2-.5-.7-.9-1.2-.9h-2.7c-.5 0-1 .3-1.3.8l-.7 1.4c0 .1-.1.2-.2.2h-.2c-1.1.3-2.1.7-3.1 1.3h-.1l-.1.2h-.3l-1.5-.5c-.5-.2-1.1 0-1.5.4L3.8 5.7c-.4.4-.5 1-.4 1.5l.5 1.5v.5c-.5 1-1 2-1.3 3.1v.2c0 .1-.1.1-.2.2l-1.4.7c-.6.2-1 .7-1 1.2v2.7c0 .5.3 1 .8 1.3l1.4.7c.1 0 .2.1.2.2v.2c.3 1.1.7 2.1 1.3 3.1v.1l.2.1v.3l-.5 1.5c-.2.5 0 1.1.4 1.5l1.9 1.9c.3.3.6.4 1 .4.2 0 .3 0 .5-.1l1.5-.5H9l.1.1h.1c1 .5 2 1 3.1 1.3h.2c.1 0 .1.1.2.2l.7 1.4c.2.5.7.8 1.3.8h2.7c.5 0 1-.3 1.3-.8l.7-1.4c0-.1.1-.2.2-.2h.2c1.1-.3 2.1-.7 3.1-1.3h.1l.1-.1h.3l1.5.5c.1 0 .3.1.5.1.4 0 .7-.1 1-.4l1.9-1.9c.4-.4.5-1 .4-1.5l-.5-1.5V23l.1-.1v-.1c.5-1 1-2 1.3-3.1v-.2c0-.1.1-.1.2-.2l1.4-.7c.5-.2.8-.7.8-1.3v-2.7c0-.5-.4-1-.8-1.2zM16 27.1c-6.1 0-11.1-5-11.1-11.1S9.9 4.9 16 4.9s11.1 5 11.1 11.1-5 11.1-11.1 11.1z'></path>
                            </svg>
                          </IconContainer>
                          <MenuListNameContainer>
                            <MenuListName>
                              <div>settings</div>
                            </MenuListName>
                          </MenuListNameContainer>
                        </div>
                      </MenuListContainer>
                    </MenuListLink>
                    <MenuListLink to='/'>
                      <MenuListContainer>
                        <div>
                          <IconContainer>
                            <svg
                              aria-label='Switch Accounts'
                              fill='#262626'
                              height='16'
                              viewBox='0 0 32 32'
                              width='16'>
                              <path d='M10.3 10.7c0-.8-.7-1.5-1.5-1.5H4.9C7.2 5.4 11.4 3 16 3c3.6 0 7 1.5 9.5 4.1.5.6 1.5.6 2.1.1.6-.6.6-1.5.1-2.1-3-3.2-7.3-5-11.7-5C10.7 0 6 2.5 3 6.7V3.5C3 2.7 2.3 2 1.5 2S0 2.7 0 3.5v7.2c0 .8.7 1.5 1.5 1.5h7.3c.8 0 1.5-.6 1.5-1.5zm20.2 9.1h-7.2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h3.8C24.8 26.6 20.6 29 16 29c-3.6 0-7-1.5-9.5-4.1-.5-.6-1.5-.6-2.1-.1-.6.6-.6 1.5-.1 2.1 3 3.2 7.3 5 11.7 5 5.3 0 10-2.5 13-6.7v3.2c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-7.2c0-.8-.7-1.4-1.5-1.4z'></path>
                            </svg>
                          </IconContainer>
                          <MenuListNameContainer>
                            <MenuListName>
                              <div>switch accounts</div>
                            </MenuListName>
                          </MenuListNameContainer>
                        </div>
                      </MenuListContainer>
                    </MenuListLink>
                    <Hr />
                    <MenuListLink to='/'>
                      <MenuListContainer>
                        <div>
                          <IconContainer>
                            <svg
                              viewBox='0 0 24 24'
                              stroke-width='2'
                              stroke='#262626'
                              fill='none'
                              stroke-linecap='round'
                              stroke-linejoin='round'>
                              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                              <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
                              <path d='M7 12h14l-3 -3m0 6l3 -3' />
                            </svg>
                          </IconContainer>
                          <MenuListNameContainer>
                            <MenuListName>
                              <div>log out</div>
                            </MenuListName>
                          </MenuListNameContainer>
                        </div>
                      </MenuListContainer>
                    </MenuListLink>
                  </MenuList>
                </Menu>
              </MenuContainer>
            </LinkContainer>
          </div>
        </RightNav>
      </NavbarContainer>
    </Container>
  );
};

export default Navbar;
