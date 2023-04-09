import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOrder, NewOrder } from '../order.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrder for edit and NewOrderFormGroupInput for create.
 */
type OrderFormGroupInput = IOrder | PartialWithRequiredKeyOf<NewOrder>;

type OrderFormDefaults = Pick<NewOrder, 'id' | 'products'>;

type OrderFormGroupContent = {
  id: FormControl<IOrder['id'] | NewOrder['id']>;
  status: FormControl<IOrder['status']>;
  totalPrice: FormControl<IOrder['totalPrice']>;
  products: FormControl<IOrder['products']>;
  restaurant: FormControl<IOrder['restaurant']>;
  deliveryMan: FormControl<IOrder['deliveryMan']>;
  customer: FormControl<IOrder['customer']>;
};

export type OrderFormGroup = FormGroup<OrderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrderFormService {
  createOrderFormGroup(order: OrderFormGroupInput = { id: null }): OrderFormGroup {
    const orderRawValue = {
      ...this.getFormDefaults(),
      ...order,
    };
    return new FormGroup<OrderFormGroupContent>({
      id: new FormControl(
        { value: orderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      status: new FormControl(orderRawValue.status, {
        validators: [Validators.required],
      }),
      totalPrice: new FormControl(orderRawValue.totalPrice, {
        validators: [Validators.required, Validators.min(0)],
      }),
      products: new FormControl(orderRawValue.products ?? []),
      restaurant: new FormControl(orderRawValue.restaurant),
      deliveryMan: new FormControl(orderRawValue.deliveryMan),
      customer: new FormControl(orderRawValue.customer),
    });
  }

  getOrder(form: OrderFormGroup): IOrder | NewOrder {
    return form.getRawValue() as IOrder | NewOrder;
  }

  resetForm(form: OrderFormGroup, order: OrderFormGroupInput): void {
    const orderRawValue = { ...this.getFormDefaults(), ...order };
    form.reset(
      {
        ...orderRawValue,
        id: { value: orderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OrderFormDefaults {
    return {
      id: null,
      products: [],
    };
  }
}
