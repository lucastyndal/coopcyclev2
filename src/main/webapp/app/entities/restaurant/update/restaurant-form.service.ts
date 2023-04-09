import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRestaurant, NewRestaurant } from '../restaurant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRestaurant for edit and NewRestaurantFormGroupInput for create.
 */
type RestaurantFormGroupInput = IRestaurant | PartialWithRequiredKeyOf<NewRestaurant>;

type RestaurantFormDefaults = Pick<NewRestaurant, 'id'>;

type RestaurantFormGroupContent = {
  id: FormControl<IRestaurant['id'] | NewRestaurant['id']>;
  name: FormControl<IRestaurant['name']>;
  address: FormControl<IRestaurant['address']>;
  rating: FormControl<IRestaurant['rating']>;
  category: FormControl<IRestaurant['category']>;
};

export type RestaurantFormGroup = FormGroup<RestaurantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RestaurantFormService {
  createRestaurantFormGroup(restaurant: RestaurantFormGroupInput = { id: null }): RestaurantFormGroup {
    const restaurantRawValue = {
      ...this.getFormDefaults(),
      ...restaurant,
    };
    return new FormGroup<RestaurantFormGroupContent>({
      id: new FormControl(
        { value: restaurantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(restaurantRawValue.name, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      address: new FormControl(restaurantRawValue.address, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
      }),
      rating: new FormControl(restaurantRawValue.rating, {
        validators: [Validators.min(0), Validators.max(5)],
      }),
      category: new FormControl(restaurantRawValue.category),
    });
  }

  getRestaurant(form: RestaurantFormGroup): IRestaurant | NewRestaurant {
    return form.getRawValue() as IRestaurant | NewRestaurant;
  }

  resetForm(form: RestaurantFormGroup, restaurant: RestaurantFormGroupInput): void {
    const restaurantRawValue = { ...this.getFormDefaults(), ...restaurant };
    form.reset(
      {
        ...restaurantRawValue,
        id: { value: restaurantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RestaurantFormDefaults {
    return {
      id: null,
    };
  }
}
