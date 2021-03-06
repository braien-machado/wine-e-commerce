import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Star } from 'phosphor-react';
import { addToCart } from '../helpers/localStorage';
import { getProductById } from '../helpers/api';
import ArrowIcon from '../components/ArrowIcon';
import Header from '../components/Header';
import ICartProduct from '../interfaces/CartProduct';
import IProduct from '../interfaces/Product';
import priceToReal from '../helpers/priceToReal';
import SmallChevronIcon from '../components/SmallChevron';
import useLocalStorage from '../helpers/useLocalStorage';

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

const MobileCenterColumn = styled(ColumnContainer)`
  align-items: center;

  @media screen and (min-width: 1024px) {
    align-items: flex-start;
  }
`;

const BackLink = styled(Link)`
  display: none;
  align-items: center;
  color: #111111;
  font-family: 'Titillium Web', sans-serif;
  font-size: 20px;
  gap: 16px;
  height: 24px;
  line-height: 24px;
  margin: 31.77px 0 25px 5%;
  text-decoration: none;
  width: 93px;

  @media screen and (min-width: 768px) {
    display: flex;
  }

  @media screen and (min-width: 1280px) {
    margin-left: 160px;
  }
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5%;
  margin: 32px 0;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 5%;
    margin-bottom: 73px;
    margin-left: 5%;
    margin-top: 0;
  }
  
  @media screen and (min-width: 1280px) {
    gap: 162px;
    margin-left: 160px;
  }
`;

const ImageWrapper = styled.div`
  max-width: 640px;
`;

const Image = styled.img`
  height: 333px;
  width: 218px;

  @media screen and (min-width: 1024px) {
    height: 579px;
    width: 381px;
  }
`;

const InfoContainer = styled(ColumnContainer)`
  max-width: 343px;

  @media screen and (min-width: 1024px) {
    max-width: 462px;
  }
`;

const BreadcrumbContainer = styled(Container)`
  align-items: center;

  span {
    color: #C81A78;
    font-size: 14px;
    line-height: 16px;

    &:last-of-type {
      color: #888888;
    }
  }

  @media screen and (min-width: 1024px) {
    align-items: center;

    span {
      font-weight: 700;
      line-height: 20px;

      &:last-of-type {
        font-weight: 400;
        line-height: 24px;
      }
    }
  }
`;

const NameContainer = styled(ColumnContainer)`
  align-items: center;

  h1 {
    text-align: center;
    color: #111111;
    font-family: 'Titillium Web', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
  }

  @media screen and (min-width: 1024px) {
    align-items: flex-start;
    
    h1 {
      text-align: start;
      font-size: 28px;
      line-height: 32px;
    }
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

const Flag = styled.img`
  height: 16px;
  width: 16px;
`;

const ScoreContainer = styled(Container)`
  display: none;

  @media screen  and (min-width: 1024px) {
    display: flex;
  }
`;

const StarsContainer = styled(Container)`
  align-items: center;

  .empty {
    color: #d4d3d3;
  }

  .fill {
    color: #F9B950;
  }
`;

const MemberPriceContainer = styled.div`
  align-self: center;

  span {
    color: #C81A78;
    font-size: 40px;
    font-weight: 700;
    line-height: 28px;
  }

  @media screen and (min-width: 1024px) {
    align-self: flex-start;

    span {
      color: #C81A78;
      font-size: 19.47px;
      font-weight: 900;
      line-height: 32px;

      &:nth-of-type(2) {
        font-size: 40px;
      }

      &:nth-of-type(3) {
        font-size: 24px;
      }

      &:nth-of-type(4) {
        font-size: 32px;
      }
    }
  }

`;

const NonMemberPriceSpan = styled.span`
  align-self: center;
  color: #888888;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;

  @media screen and (min-width: 1024px) {
    align-self: flex-start;
  }
`;

const CommentContainer = styled(ColumnContainer)`
  max-width: 448px;


  span {
    color: #333333;
    font-family: 'Titillium Web', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
  }

  h2 {
    color: #111111;
    display: none;
    font-family: 'Titillium Web', sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }

  p {
    color: #666666;
    flex-grow: 0;
    font-family: Saira, sans-serif;
    font-size: 14px;
    line-height: 21px;
    order: 1;
  }

  @media screen and (min-width: 1024px) {
    span {
      display: none;
    }

    h2 {
      display: block;
    }

    p {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const ButtonContainer = styled(Container)`
  align-self: center;
  position: relative;

  @media screen and (min-width: 1024px) {
    align-self: flex-start;
  }
`;

const AddButton = styled.button`
  align-items: center;
  background-color: #7EBC43;
  border-radius: 4px;
  border: none;
  display: flex;
  height: 56px;
  width: 328px;

  span {
    align-items: center;
    border-right: 1px solid #FFFFFF;
    color: #FFFFFF;
    display: flex;
    font-size: 24px;
    height: 33px;
    justify-content: center;
    line-height: 42px;
    width: 50%;

    &:nth-of-type(2) {
      border: none;
      font-size: 16px;
      font-weight: 700;
      line-height: 19.2px;
    }
  }

  &:hover {
    background-color: #6aa038;
    border-color: #6aa038;
    cursor: pointer;
  }
`;

interface ChangeQtyWrapperProps {
  left: string;
}

const ChangeQtyWrapper = styled.div<ChangeQtyWrapperProps>`
  align-items: center;
  display: flex;
  left: ${(props) => props.left};
  position: absolute;
  top: 16px;

  button {
    align-items: center;
    background-color: inherit;
    border-radius: 100%;
    border: 1px solid #FFFFFF66;
    color: #FFFFFF;
    display: flex;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    font-weight: 600;
    height: 24px;
    justify-content: center;
    line-height: 27.24px;
    transition-duration: 150ms;
    width: 24px;

    &:hover {
      background-color: #FFFFFF;
      color: #6aa038;
    }

    &:disabled {
      border-color: #FFFFFF1A;
      color: #FFFFFF1A;
      pointer-events: none;
    }
  }
`;

export default function ProductDetails() {
  const [cart, setCart] = useLocalStorage<null | ICartProduct[]>('cart', null);
  const [counter, setCounter] = useState(1);
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

  function addProductToCart() {
    addToCart(product, setCart, counter);
  }

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
        <ImageWrapper>
          <Image src={product.image} alt={product.name} />
        </ImageWrapper>
        <InfoContainer gap={48}>
          <div>
            <MobileCenterColumn gap={16}>
              <BreadcrumbContainer gap={8}>
                <span>Vinhos</span>
                <SmallChevronIcon />
                <span>{product.country}</span>
                <SmallChevronIcon />
                <span>{product.region}</span>
              </BreadcrumbContainer>
              <NameContainer gap={8}>
                <h1>{product.name}</h1>
                <Summary gap={8}>
                  <Flag src={product.flag} alt="country flag" />
                  <span>{product.country}</span>
                  <span>{product.type}</span>
                  <span>{product.classification}</span>
                  <span>{product.volume || product.size}</span>
                  <ScoreContainer gap={4.8}>
                    <StarsContainer gap={2}>
                      {generateStars()}
                    </StarsContainer>
                    {
                      product.avaliations !== undefined && (
                        <span>{`(${product.avaliations})`}</span>
                      )
                    }
                  </ScoreContainer>
                </Summary>
              </NameContainer>
            </MobileCenterColumn>
          </div>
          {
            product.priceNonMember
            && product.priceMember
            && (
              <ColumnContainer gap={8}>
                <MemberPriceContainer>
                  <span>R$</span>
                  <span>{priceToReal(product.priceMember).split(',')[0].split(/\s/)[1]}</span>
                  <span>,</span>
                  <span>{priceToReal(product.priceMember).split(',')[1]}</span>
                </MemberPriceContainer>
                <NonMemberPriceSpan>
                  {`N??O S??CIO ${priceToReal(product.priceNonMember)}/UN.`}
                </NonMemberPriceSpan>
              </ColumnContainer>
            )
          }
          <CommentContainer gap={8}>
            <span>Descri????o</span>
            <h2>Coment??rio do Sommelier</h2>
            <p>{product.sommelierComment}</p>
          </CommentContainer>
          <ButtonContainer gap={0}>
            <AddButton
              type="button"
              onClick={() => addProductToCart()}
            >
              <span>{counter}</span>
              <span>Adicionar</span>
            </AddButton>
            <ChangeQtyWrapper left="22px">
              <button
                disabled={counter === 1}
                type="button"
                onClick={() => setCounter(counter - 1)}
              >
                -
              </button>
            </ChangeQtyWrapper>
            <ChangeQtyWrapper left="119px">
              <button
                type="button"
                onClick={() => setCounter(counter + 1)}
              >
                +
              </button>
            </ChangeQtyWrapper>
          </ButtonContainer>
        </InfoContainer>
      </Main>
    </div>
  );
}
