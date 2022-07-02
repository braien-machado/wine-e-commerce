import IProduct from './Product';

interface ProductsInfo {
  items: IProduct[];
  itemsPerPage: number;
  page: number;
  totalItems: number;
  totalPages: number;
}

export default ProductsInfo;
