export interface IDeliveryMan {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
}

export type NewDeliveryMan = Omit<IDeliveryMan, 'id'> & { id: null };
