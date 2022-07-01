import React from 'react';
import IProduct from '../interfaces/Product';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard(props: ProductCardProps) {
  const {
    product: {
      discount,
      image,
      name,
      price,
      priceMember,
      priceNonMember,
    },
  } = props;

  return (
    <div>
      <div>
        <img src={image} alt={name} height={181} />
        <h1>{name}</h1>
        <div>
          <span>{price}</span>
          <span>{`${discount} % OFF`}</span>
        </div>
        <div>
          <span>SÓCIO WINE</span>
          <div>
            <span>R$</span>
            <span>{priceMember}</span>
          </div>
        </div>
        <div>
          <p>{`NÃO SÓCIO R$ ${priceNonMember}`}</p>
        </div>
      </div>
      <button type="button">Adicionar</button>
    </div>
  );
}
