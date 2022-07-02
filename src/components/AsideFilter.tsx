import React from 'react';
import styled from 'styled-components';

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 39.77px 0 0 160px;
  width: 256px;

  p {
    color: #000000;
    font-family: 'Titillium Web', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }

  span {
    color: #333333;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.6px;
  }

  label {
    align-items: center;
    color: #1D1D1B;
    display: flex;
    font-size: 14px;
    gap: 14px;
    line-height: 16.8px;
  }

  input {
    width: 16px;
    height: 16px;
    background-color: inherit;
    border-radius: 50%;
    vertical-align: middle;
    border: 2px solid #888888;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;

    &:checked {
      background-color: #CCCCCC;
    }
  }
`;

export default function AsideFilter() {
  return (
    <Aside>
      <p>Refine sua busca</p>
      <div>
        <span>Por preço</span>
        <label htmlFor="0-40">
          <input type="checkbox" id="0-40" name="price-range" />
          Até R$40
        </label>
        <label htmlFor="40-60">
          <input type="checkbox" id="40-60" name="price-range" />
          R$40 A R$60
        </label>
        <label htmlFor="100-200">
          <input type="checkbox" id="100-200" name="price-range" />
          R$100 A R$200
        </label>
        <label htmlFor="200-500">
          <input type="checkbox" id="200-500" name="price-range" />
          R$200 A R$500
        </label>
        <label htmlFor="500+">
          <input type="checkbox" id="500+" name="price-range" />
          Acima de R$500
        </label>
      </div>
    </Aside>
  );
}
