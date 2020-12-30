import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 0 16px;
`;

const LinksContainer = styled.div`
  margin-bottom: 52px;
`;

export const Links = styled.div`
  margin-top: 24px;
  div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }
`;

const Lang = styled.div`
  display: flex;
  margin: 12px 0;
  justify-content: center;

  color: var(--textColorGray);
  div {
    font-size: 12px;
    line-height: 14px;
    text-transform: capitalize;
    :nth-child(1) {
      display: flex;
      cursor: pointer;
    }
    :nth-child(2) {
      margin-left: 16px;
    }
    svg {
      margin-left: 4px;
    }
  }
`;

const Link = styled.div`
  margin: 0 8px 12px;
`;

const LinkTag = styled.a`
  color: var(--textColorGray);
  div {
    font-size: 12px;
    line-height: 14px;
    margin: -2px 0 -3px;
    text-transform: capitalize;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LinksContainer>
        <Links>
          <div>
            <Link>
              <LinkTag href='/about'>
                <div>about</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>blog</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>jobs</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>aPI</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>privacy</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>terms</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>top accounts</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>hashtags</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>locations</div>
              </LinkTag>
            </Link>
          </div>
          <div>
            <Link>
              <LinkTag href='/about'>
                <div>beauty</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>dance & performance</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>fitness</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>food & drink</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>home & garden</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>music</div>
              </LinkTag>
            </Link>
            <Link>
              <LinkTag href='/about'>
                <div>visual arts</div>
              </LinkTag>
            </Link>
          </div>
        </Links>
        <Lang>
          <div>
            English
            <span>
              <svg
                width='11'
                height='6'
                viewBox='0 0 11 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 1L5.5 5L10 1'
                  stroke='#8E8E8E'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
          </div>
          <div>© 2020 Instagram from Facebook</div>
        </Lang>
      </LinksContainer>
    </FooterContainer>
  );
};

export default Footer;
