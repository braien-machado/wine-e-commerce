import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Club from './pages/Club';
import Producers from './pages/Producers';
import Offers from './pages/Offers';
import Events from './pages/Events';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/:id" element={<ProductDetails />} />
      <Route path="/club" element={<Club />} />
      <Route path="/producers" element={<Producers />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
}

const links = [
  { name: 'Clube', path: '/club' },
  { name: 'Loja', path: '/' },
  { name: 'Produtores', path: '/producers' },
  { name: 'Ofertas', path: '/offers' },
  { name: 'Eventos', path: '/events' },
];
