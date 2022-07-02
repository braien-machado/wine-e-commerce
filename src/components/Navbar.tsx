import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const links = [
  { name: 'Clube', path: '/club' },
  { name: 'Loja', path: '/' },
  { name: 'Produtores', path: '/producers' },
  { name: 'Ofertas', path: '/offers' },
  { name: 'Eventos', path: '/events' },
];

const LinksContainer = styled.ul`
  display: none;
  gap: 48px;
  height: 86px;

  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;

interface LinkProps {
  current: boolean;
}

const LinkWrapper = styled.div<LinkProps>`
  align-items: center;
  ${(props) => (props.current ? 'border-bottom: 2px solid #D14B8F;' : '')}
  display: flex;
  height: 100%;
`;

const StyledLink = styled(Link)<LinkProps>`
  color: ${(props) => (props.current ? '#D14B8F' : '#555555')};
  ${(props) => (props.current ? 'pointer-events: none;' : '')}
  font-family: 'Titillium Web', sans-serif;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
`;

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <LinksContainer>
      {
        links.map((link) => (
          <LinkWrapper current={pathname === link.path} key={link.name}>
            <StyledLink
              current={pathname === link.path}
              to={link.path}
            >
              {link.name}
            </StyledLink>
          </LinkWrapper>
        ))
      }
    </LinksContainer>
  );
}
