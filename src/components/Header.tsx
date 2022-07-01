import Logo from './Logo';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import cartImg from '../assets/cart.png';

export default function Header() {
  return (
    <header>
      <div>
        <MenuIcon />
        <Logo />
      </div>
      <div>
        <SearchIcon />
        <img src={cartImg} alt="cart" />
      </div>
      Header
    </header>
  );
}
