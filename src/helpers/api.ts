async function getProducts(page = 1, limit = 8) {
  const data = await fetch(`https://wine-back-test.herokuapp.com/products?page=${page}&limit=${limit}`)
    .then((result) => result.json());

  return data;
}

export default getProducts;
