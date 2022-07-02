import React from 'react';
import { Link } from 'react-router-dom';
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

  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;

const StyledLink = styled(Link)`
  color: #555555;
  font-family: 'Titillium Web', sans-serif;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
`;

export default function Navbar() {
  return (
    <LinksContainer desktopOnly>
      {
        links.map((link) => (
          <StyledLink to={link.path} key={link.name}>{link.name}</StyledLink>
        ))
      }
    </LinksContainer>
  );
}
