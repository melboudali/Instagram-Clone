import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

type NavbarLinkProps = {
  path: string;
  children: React.ReactNode;
};

const NavbarLink = ({ path, children }: NavbarLinkProps) => {
  return (
    <LinkContainer>
      <Link to={path}>{children}</Link>
    </LinkContainer>
  );
};

export default NavbarLink;
