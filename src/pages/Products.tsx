import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import getProducts, { getFilteredProducts } from '../helpers/api';
import SecondaryButton from '../styles/SecondaryButton';
import useLocalStorage from '../helpers/useLocalStorage';
import ICartProduct from '../interfaces/CartProduct';
import AsideFilter from '../components/AsideFilter';
import PaginationButtons from '../components/PaginationButtons';
import ProductsInfo from '../interfaces/ProductsInfo';

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 1024px) {
    width: fit-content;
  }
`;

const ResultDiv = styled.div`
  align-items: center;
  border-bottom: 2px solid #D5D5D5;
  color: #888888;
  display: flex;
  font-size: 18px;
  gap: 4px;
  height: 74px;
  width: 91.46%;

  @media screen and (min-width: 640px) {
    align-self: flex-start;
    margin-left: 5%;
    border: none;
  }

  @media screen and (min-width: 1024px) {
    align-self: flex-start;
    border: none;
    color: #262626;
    height: fit-content;
    margin-left: 0;
    width: max-content;

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
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 24px;

  @media screen and (min-width: 768px) {
    gap: 32px;
    margin-top: 32px;
  }

  @media screen and (min-width: 1024px) {
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

const CloseButton = styled(SecondaryButton)`
  border-radius: 50%;
  height: 30px;
  padding: 0;
  position: fixed;
  right: 15px;
  top: 15px;
  width: 30px;
  z-index: 51;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

type Filter = '0-50' | '50-100' | '100-200' | '200-500' | '500+';

export default function Products() {
  const [info, setInfo] = useState({} as ProductsInfo);
  const [cart, setCart] = useLocalStorage<null | ICartProduct[]>('cart', null);
  const [filters, setFilters] = useState([] as (Filter | null)[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  async function checkFilters(page = 1, limit = 9) {
    if (!filters.length && !searchTerm) {
      return getProducts(page, limit);
    }
    return getFilteredProducts(filters as Filter[], page, limit, searchTerm);
  }

  useEffect(() => {
    async function fetchApi() {
      const productsFromApi = await checkFilters();
      setInfo(productsFromApi);
    }

    fetchApi();
  }, [filters, searchTerm]);

  async function handleClick(page: number, itemsPerPage: number) {
    const productsFromApi = await checkFilters(page, itemsPerPage);
    setInfo(productsFromApi);
  }

  return (
    <div>
      <Header
        cart={cart}
        searchByTerm={setSearchTerm}
        toggleMenu={setIsMenuHidden}
        isMenuHidden={isMenuHidden}
      />
      {
        !isMenuHidden
        && (
          <CloseButton
            type="button"
            onClick={() => setIsMenuHidden(!isMenuHidden)}
          >
            X
          </CloseButton>
        )
      }
      <MainContainer>
        <AsideFilter
          hidden={isMenuHidden}
          setFilters={(array: Filter[] | []) => setFilters(array)}
          filters={filters as Filter[]}
        />
        {
          !info.items ? (
            <Main>
              <ResultDiv>
                Carregando produtos...
              </ResultDiv>
            </Main>
          ) : (
            <Main>
              <ResultDiv>
                {!info.totalItems ? 'Nenhum ' : <span>{info.totalItems}</span>}
                {!info.totalItems ? 'produto encontrado' : 'produtos encontrados'}
                { !searchTerm ? '' : ` pelo termo "${searchTerm}"`}
              </ResultDiv>
              <Section>
                {
                  info.items?.map((item) => (
                    <ProductCard product={item} key={item.id} updateCart={setCart} />
                  ))
                }
              </Section>
              <MoreContentButtonContainer>
                {
                  info.itemsPerPage === info.totalItems ? null : (
                    <>
                      <SecondaryButton
                        type="button"
                        onClick={() => handleClick(1, info.itemsPerPage + 8)}
                      >
                        Mostrar mais
                      </SecondaryButton>
                      <p>
                        Exibindo
                        <span>{info.itemsPerPage}</span>
                        de
                        <span>{info.totalItems}</span>
                        produtos no total
                      </p>
                    </>
                  )
                }
              </MoreContentButtonContainer>
              <PaginationButtons
                handleClick={(page: number, itemsNumber: number) => handleClick(page, itemsNumber)}
                page={info.page}
                totalPages={info.totalPages}
              />
            </Main>
          )
        }
      </MainContainer>
    </div>
  );
}
