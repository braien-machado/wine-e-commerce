import IProduct from '../interfaces/Product';

async function getProducts(page = 1, limit = 9) {
  const data = await fetch(`https://wine-back-test.herokuapp.com/products?page=${page}&limit=${limit}`)
    .then((result) => result.json());

  return data;
}

type Filter = '0-50' | '50-100' | '100-200' | '200-500' | '500+';

const filterParams = {
  '0-50': [null, 50],
  '50-100': [50, 100],
  '100-200': [100, 200],
  '200-500': [200, 500],
  '500+': [500, null],
};

const isItemPriceInRange = (filters: Filter[], price: number) => filters
  .some((filter) => {
    const [min, max] = filterParams[filter];
    if (!min) {
      return price <= max!;
    }
    if (!max) {
      return min < price;
    }
    return min < price && price <= max;
  });

export async function getFilteredProducts(filters: Filter[], page = 1, limit = 9) {
  const data = await getProducts(1, 500);

  const filteredItems = data.items.filter((item: IProduct) => {
    const { priceMember } = item;

    return (
      isItemPriceInRange(filters, priceMember)
    );
  });

  const pageItems = filteredItems.filter((_item: IProduct, index: number) => index < limit);

  return {
    items: pageItems,
    itemsPerPage: pageItems.length,
    page,
    totalItems: filteredItems.length,
    totalPages: Math.ceil(filteredItems.length / pageItems.length),
  };
}

export default getProducts;
