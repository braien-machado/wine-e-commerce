import styled from 'styled-components';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import cartImg from '../assets/cart.png';

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  height: 72px;
  justify-content: space-between;
  padding: 0 18.75px;

  div {
    align-items: center;
    display: flex;
    gap: 25px;
  }
`;

const Button = styled.button`
  background-color: inherit;
  border: none;
`;

const CartButton = styled(Button)`
  position: relative;
`;

const CartCounter = styled.div`
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

export default function Header() {
  function handleClick() {
    console.log('Button is working!')
  }

  return (
    <StyledHeader>
      <div>
        <Button onClick={handleClick}>
          <MenuIcon />
        </Button>
        <Logo />
      </div>
      <div>
        <Button onClick={handleClick}>
          <SearchIcon />
        </Button>
        <CartButton onClick={handleClick}>
          <img src={cartImg} alt="cart" />
          <CartCounter>
            { localStorage.getItem('cart') ? <span>15</span> : <span>0</span> }
          </CartCounter>
        </CartButton>
      </div>
    </StyledHeader>
  );
}
