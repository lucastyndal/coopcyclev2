import { IRestaurant, NewRestaurant } from './restaurant.model';

export const sampleWithRequiredData: IRestaurant = {
  id: 59197,
  name: 'zero c',
  address: 'Future-proofed Rustic Directeur',
};

export const sampleWithPartialData: IRestaurant = {
  id: 78272,
  name: 'Incredible',
  address: 'BordersXXX',
  rating: 5,
};

export const sampleWithFullData: IRestaurant = {
  id: 65290,
  name: 'Saint-Bernard Limousin',
  address: 'ComputersX',
  rating: 2,
};

export const sampleWithNewData: NewRestaurant = {
  name: 'Granite ivory',
  address: 'Table Champagne-Ardenne',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
