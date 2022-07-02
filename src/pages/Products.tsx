import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import IProduct from '../interfaces/Product';
import getProducts from '../helpers/api';
import SecondaryButton from '../styles/SecondaryButton';
import useLocalStorage from '../helpers/useLocalStorage';
import ICartProduct from '../interfaces/CartProduct';
import AsideFilter from '../components/AsideFilter';
import PaginationButtons from '../components/PaginationButtons';

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

  @media screen and (min-width: 1024px) {
    align-self: flex-start;
    border: none;
    color: #262626;
    height: fit-content;
    width: fit-content;

    span {
      color: #262626;
    }
  }

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

  @media screen and (min-width: 1024px) {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 32px;
    max-width: 832px;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

  p {
    display: flex;
    gap: 4px;
  }

  span {
    color: #1D1D1B;
    font-weight: 700;
  }

  @media screen and (min-width: 1024px) {
    display: none
  }
`;

const MainContainer = styled.div`
  display: flex;
  gap: 32px;

  @media screen and (min-width: 1024px) {
    margin: 39.77px 0 44px 160px;
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
      <MainContainer>
        <AsideFilter />
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
                <SecondaryButton type="button" onClick={() => handleClick()}>Mostrar mais</SecondaryButton>
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
          <PaginationButtons page={info.page} totalPages={info.totalPages} />
        </Main>
      </MainContainer>
    </div>
  );
}
