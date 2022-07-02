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
  current?: string;
}

const LinkWrapper = styled.div<LinkProps>`
  align-items: center;
  ${(props) => (!props.current ? '' : 'border-bottom: 2px solid #D14B8F;')}
  display: flex;
  height: 100%;
`;

const StyledLink = styled(Link)<LinkProps>`
  color: ${(props) => (!props.current ? '#555555' : '#D14B8F')};
  ${(props) => (props.current === 'true' ? 'pointer-events: none;' : '')}
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
          <LinkWrapper current={pathname === link.path ? 'true' : undefined} key={link.name}>
            <StyledLink
              current={pathname === link.path ? 'true' : undefined}
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
