import { IDeliveryMan, NewDeliveryMan } from './delivery-man.model';

export const sampleWithRequiredData: IDeliveryMan = {
  id: 41701,
  firstName: 'Auguste',
  lastName: 'Moreau',
  email: 'Assomption20@hotmail.fr',
};

export const sampleWithPartialData: IDeliveryMan = {
  id: 6266,
  firstName: 'Césaire',
  lastName: 'Renard',
  email: 'Eudoxie78@hotmail.fr',
};

export const sampleWithFullData: IDeliveryMan = {
  id: 38644,
  firstName: 'Pacôme',
  lastName: 'Perrot',
  phoneNumber: '     7241446823',
  email: 'Longin0@yahoo.fr',
};

export const sampleWithNewData: NewDeliveryMan = {
  firstName: 'Vianney',
  lastName: 'Lefebvre',
  email: 'Tatiana_Jean@yahoo.fr',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
