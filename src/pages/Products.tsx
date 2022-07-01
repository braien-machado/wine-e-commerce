import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import IProduct from '../interfaces/Product';
import getProducts from '../service/api';

interface ProductsInfo {
  items: IProduct[];
  itemsPerPage: number;
  page: number;
  totalItems: number;
  totalPages: number;
}

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ResultDiv = styled.div`
  align-items: center;
  border-bottom: 2px solid #D5D5D5;
  color: #888888;
  display: flex;
  font-size: 18px;
  gap: 4px;
  height: 74px;
  width: 343px;

  span {
    color: #1D1D1B;
    font-weight: 700;
  }
`;

const MoreContentButtonContainer = styled.div`
  align-items: center;
  color: #888888;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 10px;
  justify-content: center;
  margin: 30px 0;
  width: 343px;

  button {
    background-color: inherit;
    border-radius: 4px;
    border: 2px solid #C81A78;
    color: #C81A78;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    padding: 10px 0;
    transition-duration: 150ms;
    width: 100%;

    &:hover {
      background-color: #C81A78;
      color: white;
    }
  }

  p {
    display: flex;
    gap: 4px;
  }

  span {
    color: #1D1D1B;
    font-weight: 700;
  }
`;

export default function Products() {
  const [info, setInfo] = useState({} as ProductsInfo);

  useEffect(() => {
    async function fetchApi() {
      const productsFromApi = await getProducts();

      setInfo(productsFromApi);
    }

    fetchApi();
  }, []);

  if (!info.totalItems) {
    return (
      <div>
        <Header />
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Main>
        <ResultDiv>
          <span>49</span>
          produtos encontrados
        </ResultDiv>
        <section>
          <ProductCard product={info.items[0]} />
        </section>
        <MoreContentButtonContainer>
          <button type="button">Mostrar mais</button>
          <p>
            Exibindo
            <span>8</span>
            de
            <span>48</span>
            produtos no total
          </p>
        </MoreContentButtonContainer>
      </Main>
    </div>
  );
}
