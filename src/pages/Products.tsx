import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import IProduct from '../interfaces/Product';
import getProducts from '../helpers/api';
import PrimaryButton from '../styles/PrimaryButton';
import useLocalStorage from '../helpers/useLocalStorage';
import ICartProduct from '../interfaces/CartProduct';

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

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-top: 24px;
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

  p {
    display: flex;
    gap: 4px;
  }

  span {
    color: #1D1D1B;
    font-weight: 700;
  }
`;

const Button = styled(PrimaryButton)`
  background-color: inherit;
  border-color: #C81A78;
  color: #C81A78;
  padding: 10px 0;

  &:hover {
    background-color: #C81A78;
    border-color: #C81A78;
    color: white;
  }
`;

export default function Products() {
  const [info, setInfo] = useState({} as ProductsInfo);
  const [cart, setCart] = useLocalStorage<null | ICartProduct[]>('cart', null);

  useEffect(() => {
    async function fetchApi() {
      const productsFromApi = await getProducts();

      setInfo(productsFromApi);
    }

    fetchApi();
  }, []);

  async function handleClick() {
    const newProducts = await getProducts(1, info.itemsPerPage + 8);

    setInfo(newProducts);
  }

  if (!info.totalItems) {
    return (
      <div>
        <Header cart={cart} />
        <Main>
          <ResultDiv>
            Carregando produtos...
          </ResultDiv>
        </Main>
      </div>
    );
  }

  return (
    <div>
      <Header cart={cart} />
      <Main>
        <ResultDiv>
          <span>{info.totalItems}</span>
          produtos encontrados
        </ResultDiv>
        <Section>
          {
            info.items.map((item) => (
              <ProductCard product={item} key={item.id} updateCart={setCart} />
            ))
          }
        </Section>
        <MoreContentButtonContainer>
          {
            info.itemsPerPage === info.totalItems ? null : (
              <Button type="button" onClick={() => handleClick()}>Mostrar mais</Button>
            )
          }
          <p>
            Exibindo
            <span>{info.itemsPerPage}</span>
            de
            <span>{info.totalItems}</span>
            produtos no total
          </p>
        </MoreContentButtonContainer>
      </Main>
    </div>
  );
}
