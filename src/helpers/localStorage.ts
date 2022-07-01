import IProduct from '../interfaces/Product';
import ICartProduct from '../interfaces/CartProduct';

export const getCart = (): null | ICartProduct[] => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : data;
};

export const addToCart = (product: IProduct) => {
  const data = getCart();

  if (!data) {
    const cart = [{ ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    const index = data.findIndex((item: IProduct) => item.id === product.id);
    if (index === -1) {
      data.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(data));
    } else {
      data[index] = { ...data[index], quantity: data[index].quantity + 1 };
      localStorage.setItem('cart', JSON.stringify(data));
    }
  }
};
