import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICustomer, NewCustomer } from '../customer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomer for edit and NewCustomerFormGroupInput for create.
 */
type CustomerFormGroupInput = ICustomer | PartialWithRequiredKeyOf<NewCustomer>;

type CustomerFormDefaults = Pick<NewCustomer, 'id'>;

type CustomerFormGroupContent = {
  id: FormControl<ICustomer['id'] | NewCustomer['id']>;
  firstName: FormControl<ICustomer['firstName']>;
  lastName: FormControl<ICustomer['lastName']>;
  address: FormControl<ICustomer['address']>;
  phoneNumber: FormControl<ICustomer['phoneNumber']>;
  email: FormControl<ICustomer['email']>;
};

export type CustomerFormGroup = FormGroup<CustomerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  createCustomerFormGroup(customer: CustomerFormGroupInput = { id: null }): CustomerFormGroup {
    const customerRawValue = {
      ...this.getFormDefaults(),
      ...customer,
    };
    return new FormGroup<CustomerFormGroupContent>({
      id: new FormControl(
        { value: customerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(customerRawValue.firstName, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      lastName: new FormControl(customerRawValue.lastName, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      address: new FormControl(customerRawValue.address, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
      }),
      phoneNumber: new FormControl(customerRawValue.phoneNumber, {
        validators: [Validators.pattern('^(\\+\\d{1,3})?\\s*(\\d{10})$')],
      }),
      email: new FormControl(customerRawValue.email, {
        validators: [Validators.required],
      }),
    });
  }

  getCustomer(form: CustomerFormGroup): ICustomer | NewCustomer {
    return form.getRawValue() as ICustomer | NewCustomer;
  }

  resetForm(form: CustomerFormGroup, customer: CustomerFormGroupInput): void {
    const customerRawValue = { ...this.getFormDefaults(), ...customer };
    form.reset(
      {
        ...customerRawValue,
        id: { value: customerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerFormDefaults {
    return {
      id: null,
    };
  }
}
