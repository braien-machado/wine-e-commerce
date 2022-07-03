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

// background-color: white;
//   border-bottom: 1px solid #CCCCCC;
//   display: ${(props) => (props.hidden ? 'none' : 'flex')};
//   flex-direction: column;
//   gap: 32px;
//   padding: 50px;
//   position: fixed;
//   top: 0;
//   width: 100%;
//   z-index: 50;

// background-color: inherit;
//     border: none;
//     display: flex;
//     padding: 0;
//     position: static;
//     width: fit-content;

interface NavbarProps {
  hidden: boolean;
}

const LinksContainer = styled.ul<NavbarProps>`
  background-color: white;
  border-bottom: 1px solid #CCCCCC;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  height: 350px;
  left: 0;
  padding: 0 15px;
  position: fixed;
  top: 0;
  width: 112.5px;
  z-index: 51;

  @media screen and (min-width: 1024px) {
    padding: 0;
    border: none;
    display: flex;
    flex-direction: row;
    gap: 40px;
    height: 86px;
    position: static;
    min-width: max-content;
  }

  @media screen and (min-width: 1280px) {
    gap: 48px;
  }
`;

interface LinkProps {
  current?: string;
}

const LinkWrapper = styled.div<LinkProps>`
  align-items: center;
  display: flex;
  height: 100%;

  @media screen and (min-width: 1024px) {
    ${(props) => (!props.current ? '' : 'border-bottom: 2px solid #D14B8F;')}
  }
`;

const StyledLink = styled(Link)<LinkProps>`
  color: ${(props) => (!props.current ? '#555555' : '#D14B8F')};
  font-family: 'Titillium Web', sans-serif;
  font-size: 18px;
  line-height: 24px;
  ${(props) => (props.current === 'true' ? 'pointer-events: none;' : '')}
  text-decoration: none;
  transition-duration: 150ms;

  &:hover {
    color: #D14B8F;
  }
`;

export default function Navbar(props: NavbarProps) {
  const { pathname } = useLocation();
  const { hidden } = props;

  return (
    <LinksContainer hidden={hidden}>
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
