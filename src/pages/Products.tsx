import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import IProduct from '../interfaces/Product';
import getProducts from '../service/api';

interface ProductsInfo {
  items: IProduct[];
  itemsPerPage: number;
  page: number;
  totalItems: number;
  totalPages: number;
}

export default function Products() {
  const [info, setInfo] = useState({} as ProductsInfo);

  useEffect(() => {
    async function fetchApi() {
      const productsFromApi = await getProducts();

      setInfo(productsFromApi);
    }

    fetchApi();
  }, []);

  if (!info.totalItems) {
    return (
      <div>
        <Header />
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>
        <div>
          <span>49</span>
          <span>produtos encontrados</span>
        </div>
        <section>
          <ProductCard product={info.items[0]} />
        </section>
        <div>
          <button type="button">Mostrar mais</button>
          <p>
            Exibindo
            <span>8</span>
            de
            <span>48</span>
            produtos no total
          </p>
        </div>
      </main>
    </div>
  );
}
