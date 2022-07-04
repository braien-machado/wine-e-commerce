import React from 'react';
import styled from 'styled-components';

interface AsideProps {
  hidden: boolean;
}

const Aside = styled.aside<AsideProps>`
  background-color: transparent;
  border-bottom: 1px solid #CCCCCC;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  gap: 32px;
  height: 350px;
  justify-content: center;
  left: 112.5px;
  padding-left: 30px;
  position: fixed;
  top: 0;
  width: fit-content;
  z-index: 51;
  
  @media screen and (min-width: 1024px) {
    background-color: inherit;
    border: none;
    display: flex;
    padding: 0;
    position: static;
    width: fit-content;
  }

  @media screen and (min-width: 1300px) {
    width: 256px;
  }

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
      background-color: #7EBC43;
      border-color: #7EBC43;
    }
  }
`;

type Filter = '0-50' | '50-100' | '100-200' | '200-500' | '500+';

interface AsideFilterProps {
  // eslint-disable-next-line no-unused-vars
  setFilters: (array: Filter[] | []) => void;
  filters: Filter[];
  hidden: boolean;
}

export default function AsideFilter(props: AsideFilterProps) {
  const { setFilters, filters, hidden } = props;

  function toggleFilter(target: HTMLInputElement) {
    if (filters.some((filter: Filter) => target.id === filter)) {
      return setFilters(filters.filter((filter) => filter !== target.id));
    }
    return setFilters([...filters, target.id as Filter]);
  }

  return (
    <Aside hidden={hidden}>
      <p>Refine sua busca</p>
      <div>
        <span>Por preço</span>
        <label htmlFor="0-50">
          <input
            id="0-50"
            name="price-range"
            onChange={(event) => toggleFilter(event.target)}
            type="checkbox"
          />
          Até R$50
        </label>
        <label htmlFor="50-100">
          <input
            id="50-100"
            name="price-range"
            onChange={(event) => toggleFilter(event.target)}
            type="checkbox"
          />
          R$50 A R$100
        </label>
        <label htmlFor="100-200">
          <input
            id="100-200"
            name="price-range"
            onChange={(event) => toggleFilter(event.target)}
            type="checkbox"
          />
          R$100 A R$200
        </label>
        <label htmlFor="200-500">
          <input
            id="200-500"
            name="price-range"
            onChange={(event) => toggleFilter(event.target)}
            type="checkbox"
          />
          R$200 A R$500
        </label>
        <label htmlFor="500+">
          <input
            id="500+"
            name="price-range"
            onChange={(event) => toggleFilter(event.target)}
            type="checkbox"
          />
          Acima de R$500
        </label>
      </div>
    </Aside>
  );
}
