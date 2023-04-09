import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDeliveryMan, NewDeliveryMan } from '../delivery-man.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDeliveryMan for edit and NewDeliveryManFormGroupInput for create.
 */
type DeliveryManFormGroupInput = IDeliveryMan | PartialWithRequiredKeyOf<NewDeliveryMan>;

type DeliveryManFormDefaults = Pick<NewDeliveryMan, 'id'>;

type DeliveryManFormGroupContent = {
  id: FormControl<IDeliveryMan['id'] | NewDeliveryMan['id']>;
  firstName: FormControl<IDeliveryMan['firstName']>;
  lastName: FormControl<IDeliveryMan['lastName']>;
  phoneNumber: FormControl<IDeliveryMan['phoneNumber']>;
  email: FormControl<IDeliveryMan['email']>;
};

export type DeliveryManFormGroup = FormGroup<DeliveryManFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeliveryManFormService {
  createDeliveryManFormGroup(deliveryMan: DeliveryManFormGroupInput = { id: null }): DeliveryManFormGroup {
    const deliveryManRawValue = {
      ...this.getFormDefaults(),
      ...deliveryMan,
    };
    return new FormGroup<DeliveryManFormGroupContent>({
      id: new FormControl(
        { value: deliveryManRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(deliveryManRawValue.firstName, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      lastName: new FormControl(deliveryManRawValue.lastName, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      phoneNumber: new FormControl(deliveryManRawValue.phoneNumber, {
        validators: [Validators.pattern('^(\\+\\d{1,3})?\\s*(\\d{10})$')],
      }),
      email: new FormControl(deliveryManRawValue.email, {
        validators: [Validators.required],
      }),
    });
  }

  getDeliveryMan(form: DeliveryManFormGroup): IDeliveryMan | NewDeliveryMan {
    return form.getRawValue() as IDeliveryMan | NewDeliveryMan;
  }

  resetForm(form: DeliveryManFormGroup, deliveryMan: DeliveryManFormGroupInput): void {
    const deliveryManRawValue = { ...this.getFormDefaults(), ...deliveryMan };
    form.reset(
      {
        ...deliveryManRawValue,
        id: { value: deliveryManRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeliveryManFormDefaults {
    return {
      id: null,
    };
  }
}
