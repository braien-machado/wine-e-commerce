export {};

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// // import userEvent from '@testing-library/user-event';

// import Header from '../components/Header';

// describe('Header component', () => {
//   it('should render buttons and cart counter', () => {
//     render(<Header />);

//     const menuButton = screen.getByTestId(/menu-button/i);
//     const searchButton = screen.getByTestId(/search-button/i);
//     const cartCounter = screen.getByTestId(/cart-counter/i);

//     expect(menuButton).toBeInTheDocument();
//     expect(searchButton).toBeInTheDocument();
//     expect(cartCounter).toBeInTheDocument();
//   });

//   describe('Cart counter', () => {
//     afterEach(() => {
//       localStorage.removeItem('cart');
//     });

//     it('should display 0 when localStorage.cart is null', () => {
//       render(<Header />);

//       const cartCounter = screen.getByTestId(/cart-counter/i);
//       expect(cartCounter.innerHTML).toBe('0');
//     });

//     it('should not display 0 when localStorage.cart is not null', () => {
//       localStorage.setItem('cart', 'cart');
//       render(<Header />);

//       const cartCounter = screen.getByTestId(/cart-counter/i);

//       expect(cartCounter.innerHTML).not.toBe('0');
//     });
//   });

//   // describe('Menu button', () => {
//   //   beforeEach(() => {
//   //     global.console.log = jest.fn();
//   //   });

//   //   afterEach(() => { jest.resetAllMocks(); })

//   //   it('should call console.log when clicked', () => {
//   //     render(<Header />);

//   //     const menuButton = screen.getByTestId(/menu-button/i);

//   //     userEvent.click(menuButton);

//   //     expect(console.log).toHaveBeenCalledTimes(1);
//   //   });
//   // });
// });
