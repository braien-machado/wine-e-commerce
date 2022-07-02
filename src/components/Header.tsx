import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import ProfileIcon from './ProfileIcon';
import cartImg from '../assets/cart.png';
import ICartProduct from '../interfaces/CartProduct';
import Navbar from './Navbar';
import ResponsiveProps from '../interfaces/ResponsiveProps';

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  height: 72px;
  justify-content: space-between;
  padding: 0 18.75px;

  @media screen and (min-width: 768px) {
    border-bottom: 1px solid #CCCCCC;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    height: 88px;
    padding: 0 5%;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 152px;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 25px;

  @media screen and (min-width: 768px) {
    gap: 45px;
  }
`;

const LogoContainer = styled(Container)`
  @media screen and (min-width: 1024px) {
    gap: 83.15px;
  }
`;

const Button = styled.button<ResponsiveProps>`
  background-color: inherit;
  border: none;
  display: ${(props) => (props.desktopOnly ? 'none' : 'inherit')};

  @media screen and (min-width: 1024px) {
    display: ${(props) => (props.mobileOnly ? 'none' : 'inherit')};
  }
`;

const SearchButton = styled(Button)`
  @media screen and (min-width: 768px) {
    align-items: center;
    border-radius: 100%;
    border: 2px solid #555555;
    display: flex;
    height: 56px;
    justify-content: center;
    width: 56px;
  }
`;

const CartButton = styled(Button)`
  position: relative;
`;

const CartCounterWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 100%;
  bottom: 0;
  display: flex;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 0;
  width: 20px;

  span {
    color: #00B495;
    font-size: 12px;
    line-height: 16px;
  }
`;

interface HeaderProps {
  cart: ICartProduct[]
}

export default function Header(props: HeaderProps) {
  const { cart } = props;

  function countProducts() {
    const counter = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    return counter;
  }

  function handleClick() {
    console.log('Button is working!');
  }

  return (
    <StyledHeader>
      <LogoContainer>
        <Button mobileOnly onClick={() => handleClick()} data-testid="menu-button">
          <MenuIcon />
        </Button>
        <Logo />
        <Navbar />
      </LogoContainer>
      <Container>
        <SearchButton onClick={() => handleClick()} data-testid="search-button">
          <SearchIcon />
        </SearchButton>
        <Button desktopOnly onClick={() => handleClick()} data-testid="profile-button">
          <ProfileIcon />
        </Button>
        <CartButton onClick={() => handleClick()}>
          <img src={cartImg} alt="cart" />
          <CartCounterWrapper>
            <span data-testid="cart-counter">
              { cart ? countProducts() : 0 }
            </span>
          </CartCounterWrapper>
        </CartButton>
      </Container>
    </StyledHeader>
  );
}
