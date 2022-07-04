import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import useLocalStorage from '../helpers/useLocalStorage';
import ICartProduct from '../interfaces/CartProduct';

const Heading = styled.h1`
  text-align: center;
  margin-top: 100px;
`;

export default function Events() {
  const [cart, setCart] = useLocalStorage<null | ICartProduct[]>('cart', null);
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Header
        cart={cart}
        isMenuHidden={isMenuHidden}
        searchByTerm={setSearchTerm}
        toggleMenu={setIsMenuHidden}
      />
      <Heading>Bem-vindo aos Eventos</Heading>
    </div>
  );
}