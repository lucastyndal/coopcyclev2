import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 24379,
  firstName: 'Laurine',
  lastName: 'Breton',
  address: 'Grass-roots Loan',
  email: 'Francia_Benoit52@gmail.com',
};

export const sampleWithPartialData: ICustomer = {
  id: 90256,
  firstName: 'Adonis',
  lastName: 'Le roux',
  address: 'analyzer invoice',
  phoneNumber: '8675237766',
  email: 'Arsne57@yahoo.fr',
};

export const sampleWithFullData: ICustomer = {
  id: 37099,
  firstName: 'Aristide',
  lastName: 'Deschamps',
  address: 'intangible Balanced',
  phoneNumber: '+3   9878210305',
  email: 'Aurelle_Lecomte39@gmail.com',
};

export const sampleWithNewData: NewCustomer = {
  firstName: 'Grégoire',
  lastName: 'Philippe',
  address: 'up matrix b',
  email: 'Adeltrude_Lopez13@yahoo.fr',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
