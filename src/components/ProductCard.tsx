import React from 'react';
import styled from 'styled-components';
import IProduct from '../interfaces/Product';
import ICartProduct from '../interfaces/CartProduct';
import PrimaryButton from '../styles/PrimaryButton';
import priceToReal from '../helpers/priceToReal';
import { addToCart } from '../helpers/localStorage';

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
  width: 156px;
`;

const Card = styled.div`
  align-items: center;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 348px;

  img {
    margin-top: 15.96px;
  }

  h1 {
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    margin-top: 11.68px;
    min-height: 51px;
    text-align: center;
  }
`;

const DiscountContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
  margin-top: 12px;
`;

const PriceSpan = styled.span`
  color: #888888;
  font-size: 10px;
  line-height: 12px;
  text-decoration-line: line-through;
`;

const DiscountWrapper = styled.div`
  background-color: #F79552;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 16px;
  padding: 0 8px;
  border-radius: 2px;
`;

const PriceMemberContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4.56px
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
`;

const PriceMemberWrapper = styled.div`
  span {
    font-family: 'Open sans', sans-serif;
    color: #C81A78;
    font-weight: 700;
    line-height: 28px;
  }
`;

const CurrencySpan = styled.span`
  font-size: 12px;
`;

const IntPriceSpan = styled.span`
  font-size: 18px;
`;

const CollonSpan = styled.span`
  font-size: 14px;
`;

const CentsPriceSpan = styled.span`
  font-size: 16px;
`;

const PriceNonMemberWrapper = styled.div`
  color: #888888;
  font-size: 10px;
  line-height: 16px;
  margin-top: 4.09px;
`;

const AddButton = styled(PrimaryButton)`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
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
        <img src={image} alt={name} height={181} />
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
