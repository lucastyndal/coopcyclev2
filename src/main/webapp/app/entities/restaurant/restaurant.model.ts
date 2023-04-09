import { ICategory } from 'app/entities/category/category.model';

export interface IRestaurant {
  id: number;
  name?: string | null;
  address?: string | null;
  rating?: number | null;
  category?: Pick<ICategory, 'id' | 'name'> | null;
}

export type NewRestaurant = Omit<IRestaurant, 'id'> & { id: null };
