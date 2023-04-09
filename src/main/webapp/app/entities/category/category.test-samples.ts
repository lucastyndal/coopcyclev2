import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 2529,
  name: 'Namibia Sausages',
  description: 'Clothing navigate gold',
};

export const sampleWithPartialData: ICategory = {
  id: 97365,
  name: 'transparent task-force Garden',
  description: 'Borders bus',
};

export const sampleWithFullData: ICategory = {
  id: 72183,
  name: 'hack Rustic interface',
  description: 'Limousin pixel syndicate',
};

export const sampleWithNewData: NewCategory = {
  name: 'b indexing Kong',
  description: 'withdrawal Cotton Steel',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
