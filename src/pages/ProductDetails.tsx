import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Star } from 'phosphor-react';
import Header from '../components/Header';
import ICartProduct from '../interfaces/CartProduct';
import useLocalStorage from '../helpers/useLocalStorage';
import IProduct from '../interfaces/Product';
import { getProductById } from '../helpers/api';
import ArrowIcon from '../components/ArrowIcon';
import SmallChevronIcon from '../components/SmallChevron';

interface ContainerProps {
  gap: number;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  gap: ${(props) => `${props.gap}px`};
`;

const ColumnContainer = styled(Container)`
  flex-direction: column;
`;

const BackLink = styled(Link)`
  align-items: center;
  color: #111111;
  display: flex;
  font-family: 'Titillium Web', sans-serif;
  font-size: 20px;
  gap: 16px;
  height: 24px;
  line-height: 24px;
  margin: 31.77px 0 25px 160px;
  text-decoration: none;
  width: 93px;
`;

const Main = styled.main`
  display: flex;
  gap: 162px;
`;

const InfoContainer = styled(Container)`
  flex-direction: column;
`;

const BreadcrumbContainer = styled(Container)`
  align-items: center;

  span {
    color: #C81A78;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;

    &:last-of-type {
      color: #888888;
      font-weight: 400;
      line-height: 24px;
    }
  }
`;

const NameContainer = styled(ColumnContainer)`
  h1 {
    color: #111111;
    font-family: 'Titillium Web', sans-serif;
    font-size: 28px;
    font-weight: 700;
    line-height: 32px;
  }
`;

const Summary = styled(Container)`
  align-items: center;

  span {
    color: #555555;
    font-size: 14px;
    line-height: 24px;
  }
`;

const StarsContainer = styled(Container)`
  align-items: center;

  .empty {
    color: #F1F1F1;
  }

  .fill {
    color: #F9B950;
  }
`;

const Image = styled.img`
  height: 579px;
  width: 381px;
`;

const Flag = styled.img`
  height: 16px;
  width: 16px;
`;

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

  function generateStars() {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= product.rating) {
        stars.push(<Star size={14.4} key={i} className="fill" weight="fill" />);
      } else {
        stars.push(<Star size={14.4} key={i} className="empty" weight="fill" />);
      }
    }

    return stars;
  }

  return (
    <div>
      <Header
        cart={cart}
        isMenuHidden={isMenuHidden}
        searchByTerm={setSearchTerm}
        toggleMenu={setIsMenuHidden}
      />
      <BackLink to="/">
        <ArrowIcon />
        Voltar
      </BackLink>
      <Main>
        <Image src={product.image} alt={product.name} />
        <InfoContainer gap={48}>
          <div>
            <ColumnContainer gap={16}>
              <BreadcrumbContainer gap={8}>
                <span>Vinhos</span>
                <SmallChevronIcon />
                <span>Estados Unidos</span>
                <SmallChevronIcon />
                <span>Califórnia</span>
              </BreadcrumbContainer>
              <NameContainer gap={8}>
                <h1>{product.name}</h1>
                <Summary gap={8}>
                  <Flag src={product.flag} alt="country flag" />
                  <span>{product.country}</span>
                  <span>{product.type}</span>
                  <span>{product.classification}</span>
                  <span>{product.volume || product.size}</span>
                  <Container gap={4.8}>
                    <StarsContainer gap={2}>
                      {generateStars()}
                    </StarsContainer>
                    <span>{`(${product.avaliations})`}</span>
                  </Container>
                </Summary>
              </NameContainer>
            </ColumnContainer>
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
        </InfoContainer>
      </Main>
    </div>
  );
}
