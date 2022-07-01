import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from './pages/Products';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
    </Routes>
  );
}
