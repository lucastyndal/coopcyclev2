import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DeliveryManFormService } from './delivery-man-form.service';
import { DeliveryManService } from '../service/delivery-man.service';
import { IDeliveryMan } from '../delivery-man.model';

import { DeliveryManUpdateComponent } from './delivery-man-update.component';

describe('DeliveryMan Management Update Component', () => {
  let comp: DeliveryManUpdateComponent;
  let fixture: ComponentFixture<DeliveryManUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let deliveryManFormService: DeliveryManFormService;
  let deliveryManService: DeliveryManService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DeliveryManUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DeliveryManUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeliveryManUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    deliveryManFormService = TestBed.inject(DeliveryManFormService);
    deliveryManService = TestBed.inject(DeliveryManService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const deliveryMan: IDeliveryMan = { id: 456 };

      activatedRoute.data = of({ deliveryMan });
      comp.ngOnInit();

      expect(comp.deliveryMan).toEqual(deliveryMan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryMan>>();
      const deliveryMan = { id: 123 };
      jest.spyOn(deliveryManFormService, 'getDeliveryMan').mockReturnValue(deliveryMan);
      jest.spyOn(deliveryManService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryMan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryMan }));
      saveSubject.complete();

      // THEN
      expect(deliveryManFormService.getDeliveryMan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(deliveryManService.update).toHaveBeenCalledWith(expect.objectContaining(deliveryMan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryMan>>();
      const deliveryMan = { id: 123 };
      jest.spyOn(deliveryManFormService, 'getDeliveryMan').mockReturnValue({ id: null });
      jest.spyOn(deliveryManService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryMan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deliveryMan }));
      saveSubject.complete();

      // THEN
      expect(deliveryManFormService.getDeliveryMan).toHaveBeenCalled();
      expect(deliveryManService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeliveryMan>>();
      const deliveryMan = { id: 123 };
      jest.spyOn(deliveryManService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deliveryMan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(deliveryManService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
