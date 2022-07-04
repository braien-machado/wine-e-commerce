import IProduct from '../interfaces/Product';
import ICartProduct from '../interfaces/CartProduct';

export const getCart = (): null | ICartProduct[] => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : data;
};

export const addToCart = (
  product: IProduct,
  // eslint-disable-next-line no-unused-vars
  updateCart: (value: ICartProduct[]) => void,
  quantity = 1,
) => {
  const data = getCart();

  if (!data) {
    const cart = [{ ...product, quantity }];
    updateCart(cart);
  } else {
    const index = data.findIndex((item: IProduct) => item.id === product.id);
    if (index === -1) {
      data.push({ ...product, quantity });
      updateCart(data);
    } else {
      data[index] = { ...data[index], quantity: data[index].quantity + quantity };
      updateCart(data);
    }
  }
};
