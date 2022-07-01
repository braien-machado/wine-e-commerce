import IProduct from './Product';

interface ICartProduct extends IProduct {
  quantity: number;
}

export default ICartProduct;
