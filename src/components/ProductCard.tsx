import React from 'react';
import styled from 'styled-components';
import IProduct from '../interfaces/Product';
import ICartProduct from '../interfaces/CartProduct';
import PrimaryButton from '../styles/PrimaryButton';
import priceToReal from '../helpers/priceToReal';
import { addToCart } from '../helpers/localStorage';
import badge from '../assets/badge.png';

interface ProductCardProps {
  product: IProduct;
  // eslint-disable-next-line no-unused-vars
  updateCart: (value: ICartProduct[]) => void
}

const CardContainer = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 156px;

  @media screen and (min-width: 1024px) {
    border-radius: 0;
    gap: 16px;
    width: 256px;
  }
`;

const Card = styled.div`
  align-items: center;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 348px;

  h1 {
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    margin-top: 11.68px;
    min-height: 51px;
    text-align: center;
  }

  @media screen and (min-width: 1024px) {
    box-shadow: 0px 9.73384px 14.6008px rgba(0, 0, 0, 0.1);
    height: 333px;

    h1 {
      color: #1D1D1B;
      font-size: 16px;
      line-height: 19.2px;
      margin-top: 7.79px;
      min-height: 41px;
    }
  }
`;

const DiscountContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
  margin-top: 12px;

  @media screen and (min-width: 1024px) {
    gap: 5.35px;
    margin-top: 5.84px;
  }
`;

const PriceSpan = styled.span`
  color: #888888;
  font-size: 10px;
  line-height: 12px;
  text-decoration-line: line-through;

  @media screen and (min-width: 1024px) {
    font-size: 11px;
    line-height: 15.57px;
    font-weight: 700;
  }
`;

const DiscountWrapper = styled.div`
  background-color: #F79552;
  border-radius: 2px;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 16px;
  padding: 0 8px;

  @media screen and (min-width: 1024px) {
    font-size: 10px;
    line-height: 12px;
    padding: 1px 3px;

    span {
      font-weight: 700;
    }
  }
`;

const PriceMemberContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4.56px;

  @media screen and (min-width: 1024px) {
    gap: 6.81px;
    margin-top: 4.87px;
  }
`;

const MemberTitleWrapper = styled.div`
  align-items: flex-end;
  color: #555555;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  justify-content: center;
  line-height: 10px;

  span {
    font-weight: 300;
  }

  @media screen and (min-width: 1024px) {
    color: #1D1D1B;
    font-size: 11px;
    line-height: 9.73px;

    span {
      font-weight: 700;
    }
  }
`;

const PriceMemberWrapper = styled.div`
  span {
    font-family: 'Open sans', sans-serif;
    color: #C81A78;
    font-weight: 700;
    line-height: 28px;
  }

  @media screen and (min-width: 1024px) {
    span {
      font-family: Lato, sans-serif;
      line-height: 27.25px;
    }
  }
`;

const CurrencySpan = styled.span`
  font-size: 12px;

  @media screen and (min-width: 1024px) {
    font-size: 11px;
  }
`;

const IntPriceSpan = styled.span`
  font-size: 18px;

  @media screen and (min-width: 1024px) {
    font-size: 23px;
  }
`;

const CollonSpan = styled.span`
  font-size: 14px;

  @media screen and (min-width: 1024px) {
    font-size: 13px;
  }
`;

const CentsPriceSpan = styled.span`
  font-size: 16px;

  @media screen and (min-width: 1024px) {
    font-size: 15.57px;
  }
`;

const PriceNonMemberWrapper = styled.div`
  color: #888888;
  font-size: 10px;
  line-height: 16px;
  margin-top: 4.09px;

  @media screen and (min-width: 1024px) {
    font-size: 12px;
    line-height: 14.4px;
    margin-top: 4.87px;

    p {
      font-weight: 700;
    }
  }
`;

const AddButton = styled(PrimaryButton)`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 1024px) {
    box-shadow: 0px 0.973384px 1.94677px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  margin-top: 15.96px;

  @media screen and (min-width: 1024px) {
    margin-top: 9.76px;
  }
`;

const Badge = styled.img`
  left: 7.8px;
  position: absolute;
  top: 160px;
  margin: 0;

  @media screen and (min-width: 1024px) {
    left: 196.62px;
    top: 140.19px;
  }
`;

export default function ProductCard(props: ProductCardProps) {
  const { product, updateCart } = props;
  const {
    discount,
    image,
    name,
    price,
    priceMember,
    priceNonMember,
  } = product;

  function addProductToCart() {
    addToCart(product, updateCart);
  }

  return (
    <CardContainer>
      <Card>
        <ProductImage src={image} alt={name} height={181} />
        <Badge src={badge} alt="black wine badge" />
        <h1>{name}</h1>
        <DiscountContainer>
          <PriceSpan>{priceToReal(price)}</PriceSpan>
          <DiscountWrapper>
            <span>{`${discount} % OFF`}</span>
          </DiscountWrapper>
        </DiscountContainer>
        <PriceMemberContainer>
          <MemberTitleWrapper>
            <span>SÓCIO</span>
            <span>WINE</span>
          </MemberTitleWrapper>
          <PriceMemberWrapper>
            <CurrencySpan>{'R$ '}</CurrencySpan>
            <IntPriceSpan>
              {priceToReal(priceMember).split(',')[0].split(/\s/)[1]}
            </IntPriceSpan>
            <CollonSpan>,</CollonSpan>
            <CentsPriceSpan>{priceToReal(priceMember).split(',')[1]}</CentsPriceSpan>
          </PriceMemberWrapper>
        </PriceMemberContainer>
        <PriceNonMemberWrapper>
          <p>{`NÃO SÓCIO ${priceToReal(priceNonMember)}`}</p>
        </PriceNonMemberWrapper>
      </Card>
      <AddButton type="button" onClick={() => addProductToCart()}>Adicionar</AddButton>
    </CardContainer>
  );
}
