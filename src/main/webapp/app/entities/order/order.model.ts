import { IProduct } from 'app/entities/product/product.model';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { IDeliveryMan } from 'app/entities/delivery-man/delivery-man.model';
import { ICustomer } from 'app/entities/customer/customer.model';

export interface IOrder {
  id: number;
  status?: string | null;
  totalPrice?: number | null;
  products?: Pick<IProduct, 'id' | 'name'>[] | null;
  restaurant?: Pick<IRestaurant, 'id'> | null;
  deliveryMan?: Pick<IDeliveryMan, 'id'> | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
