import { ICategory } from 'app/entities/category/category.model';
import { IOrder } from 'app/entities/order/order.model';

export interface IProduct {
  id: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  category?: Pick<ICategory, 'id' | 'name'> | null;
  orders?: Pick<IOrder, 'id'>[] | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
