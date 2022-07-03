import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import ICartProduct from '../interfaces/CartProduct';
import useLocalStorage from '../helpers/useLocalStorage';
import IProduct from '../interfaces/Product';
import { getProductById } from '../helpers/api';
import ArrowIcon from '../components/ArrowIcon';

export default function ProductDetails() {
  const [cart, setCart] = useLocalStorage<null | ICartProduct[]>('cart', null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [product, setProduct] = useState({} as IProduct);
  const { id } = useParams();

  useEffect(() => {
    async function fetchApi() {
      if (id !== undefined) {
        const data = await getProductById(parseInt(id, 10));
        setProduct(data);
      }
    }

    fetchApi();
  }, []);

  return (
    <div>
      <Header
        cart={cart}
        isMenuHidden={isMenuHidden}
        searchByTerm={setSearchTerm}
        toggleMenu={setIsMenuHidden}
      />
      <Link to="/">
        <ArrowIcon />
        Voltar
      </Link>
      <main>
        <img src={product.image} alt={product.name} />
        <div>
          <span>{'Vinhos > Estados Unidos > Califórnia'}</span>
          <h1>{product.name}</h1>
          <div>
            <img src={product.flag} alt="country flag" />
            <span>{product.type}</span>
            <span>{product.classification}</span>
            <span>{product.volume || product.size}</span>
            <span>{product.rating}</span>
            <span>{product.avaliations}</span>
          </div>
        </div>
        <div>
          <span>R$ 63,67</span>
          <span>NÃO SÓCIO R$ 120,95/UN</span>
        </div>
        <div>
          <h2>Comentário do Sommelier</h2>
          <p>{product.sommelierComment}</p>
        </div>
        <div>
          <div>
            <button type="button">-</button>
            <span>1</span>
            <button type="button">+</button>
          </div>
          <button type="button">Adicionar</button>
        </div>
      </main>
    </div>
  );
}
