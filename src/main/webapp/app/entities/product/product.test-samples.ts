import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
  name: 'Customer-focused',
  description: 'cross-platform Unbranded deposit',
  price: 49054,
};

export const sampleWithPartialData: IProduct = {
  id: 31634,
  name: 'Bangladesh Administrateur',
  description: 'Saint-Dominique',
  price: 66440,
};

export const sampleWithFullData: IProduct = {
  id: 85387,
  name: 'bluetooth b driver',
  description: 'Customer-focused Nord-Pas-de-Calais',
  price: 13074,
};

export const sampleWithNewData: NewProduct = {
  name: 'yellow silver',
  description: 'IslandsXXX',
  price: 70955,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
