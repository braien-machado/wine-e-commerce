import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import ProfileIcon from './ProfileIcon';
import cartImg from '../assets/cart.png';
import ICartProduct from '../interfaces/CartProduct';
import Navbar from './Navbar';
import ResponsiveProps from '../interfaces/ResponsiveProps';
import PrimaryButton from '../styles/PrimaryButton';
import SecondaryButton from '../styles/SecondaryButton';

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

  &:hover {
    cursor: pointer;
  }

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

interface SearchContentWrapperProps {
  isVisible: boolean;
}

const SearchContentWrapper = styled.div<SearchContentWrapperProps>`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  gap: 8px;
  top: 90px;
  right: 20px;
  position: absolute;

  input {
    border: 1px solid #7EBC43;
    border-radius: 5px;
    padding: 10px;
  }

  @media screen and (min-width: 768px) {
    top: 100px;
    right: 20px;
  }
`;

const SearchContentButton = styled(PrimaryButton)`
  padding: 6px 12px;
`;

const ClearTextButton = styled(SecondaryButton)`
  padding: 6px 12px;
`;

interface HeaderProps {
  cart: ICartProduct[]
  searchByTerm: React.Dispatch<React.SetStateAction<string>>;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuHidden: boolean;
}

export default function Header(props: HeaderProps) {
  const {
    cart,
    searchByTerm,
    toggleMenu,
    isMenuHidden,
  } = props;
  const [searchText, setSearchText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  function countProducts() {
    const counter = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    return counter;
  }

  function handleClick() {
    console.log('Button is working!');
  }

  function handleSearch() {
    searchByTerm(searchText);
    setIsVisible(!isVisible);
  }

  function clearInput() {
    setSearchText('');
    searchByTerm('');
  }

  return (
    <StyledHeader>
      <LogoContainer>
        <Button mobileOnly onClick={() => toggleMenu(!isMenuHidden)} data-testid="menu-button">
          <MenuIcon />
        </Button>
        <Logo />
        <Navbar hidden={isMenuHidden} />
      </LogoContainer>
      <Container>
        <SearchButton onClick={() => setIsVisible(!isVisible)} data-testid="search-button">
          <SearchIcon />
        </SearchButton>
        <SearchContentWrapper isVisible={isVisible}>
          <input
            value={searchText}
            id="text-input"
            onChange={(event) => setSearchText(event.target.value)}
          />
          <SearchContentButton
            type="button"
            onClick={() => handleSearch()}
          >
            Buscar
          </SearchContentButton>
          <ClearTextButton
            type="button"
            onClick={() => clearInput()}
          >
            Limpar
          </ClearTextButton>
        </SearchContentWrapper>
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
