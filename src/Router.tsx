import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/:id" element={<ProductDetails />} />
    </Routes>
  );
}
