async function getProducts(page = 1, limit = 9) {
  const data = await fetch(`https://wine-back-test.herokuapp.com/products?page=${page}&limit=${limit}`)
    .then((result) => result.json());

  return data;
}

export async function getFilteredProducts(items: number, page = 1, limit = 9) {
  const data = await fetch(`https://wine-back-test.herokuapp.com/products?page=1&limit=${items}`)
    .then((result) => result.json());

  return data;
}

export default getProducts;
