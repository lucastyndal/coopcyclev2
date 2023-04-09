import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../delivery-man.test-samples';

import { DeliveryManFormService } from './delivery-man-form.service';

describe('DeliveryMan Form Service', () => {
  let service: DeliveryManFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryManFormService);
  });

  describe('Service methods', () => {
    describe('createDeliveryManFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDeliveryManFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            phoneNumber: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });

      it('passing IDeliveryMan should create a new form with FormGroup', () => {
        const formGroup = service.createDeliveryManFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            phoneNumber: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });
    });

    describe('getDeliveryMan', () => {
      it('should return NewDeliveryMan for default DeliveryMan initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDeliveryManFormGroup(sampleWithNewData);

        const deliveryMan = service.getDeliveryMan(formGroup) as any;

        expect(deliveryMan).toMatchObject(sampleWithNewData);
      });

      it('should return NewDeliveryMan for empty DeliveryMan initial value', () => {
        const formGroup = service.createDeliveryManFormGroup();

        const deliveryMan = service.getDeliveryMan(formGroup) as any;

        expect(deliveryMan).toMatchObject({});
      });

      it('should return IDeliveryMan', () => {
        const formGroup = service.createDeliveryManFormGroup(sampleWithRequiredData);

        const deliveryMan = service.getDeliveryMan(formGroup) as any;

        expect(deliveryMan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDeliveryMan should not enable id FormControl', () => {
        const formGroup = service.createDeliveryManFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDeliveryMan should disable id FormControl', () => {
        const formGroup = service.createDeliveryManFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
