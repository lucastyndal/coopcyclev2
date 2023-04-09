import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 47761,
  status: 'firewall web-enabled',
  totalPrice: 84971,
};

export const sampleWithPartialData: IOrder = {
  id: 10948,
  status: 'b indexing e-commerce',
  totalPrice: 96762,
};

export const sampleWithFullData: IOrder = {
  id: 49223,
  status: 'indigo microchip Fantastic',
  totalPrice: 32103,
};

export const sampleWithNewData: NewOrder = {
  status: 'Kwacha bypassing Face',
  totalPrice: 70933,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
