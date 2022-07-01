async function getProducts(page = 1) {
  const data = await fetch(`https://wine-back-test.herokuapp.com/products?page=${page}&limit=9`)
    .then((result) => result.json());

  return data;
}

export default getProducts;
