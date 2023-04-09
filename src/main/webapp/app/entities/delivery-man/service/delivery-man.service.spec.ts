import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDeliveryMan } from '../delivery-man.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../delivery-man.test-samples';

import { DeliveryManService } from './delivery-man.service';

const requireRestSample: IDeliveryMan = {
  ...sampleWithRequiredData,
};

describe('DeliveryMan Service', () => {
  let service: DeliveryManService;
  let httpMock: HttpTestingController;
  let expectedResult: IDeliveryMan | IDeliveryMan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DeliveryManService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a DeliveryMan', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deliveryMan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(deliveryMan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DeliveryMan', () => {
      const deliveryMan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(deliveryMan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DeliveryMan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DeliveryMan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DeliveryMan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDeliveryManToCollectionIfMissing', () => {
      it('should add a DeliveryMan to an empty array', () => {
        const deliveryMan: IDeliveryMan = sampleWithRequiredData;
        expectedResult = service.addDeliveryManToCollectionIfMissing([], deliveryMan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryMan);
      });

      it('should not add a DeliveryMan to an array that contains it', () => {
        const deliveryMan: IDeliveryMan = sampleWithRequiredData;
        const deliveryManCollection: IDeliveryMan[] = [
          {
            ...deliveryMan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDeliveryManToCollectionIfMissing(deliveryManCollection, deliveryMan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DeliveryMan to an array that doesn't contain it", () => {
        const deliveryMan: IDeliveryMan = sampleWithRequiredData;
        const deliveryManCollection: IDeliveryMan[] = [sampleWithPartialData];
        expectedResult = service.addDeliveryManToCollectionIfMissing(deliveryManCollection, deliveryMan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryMan);
      });

      it('should add only unique DeliveryMan to an array', () => {
        const deliveryManArray: IDeliveryMan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const deliveryManCollection: IDeliveryMan[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryManToCollectionIfMissing(deliveryManCollection, ...deliveryManArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const deliveryMan: IDeliveryMan = sampleWithRequiredData;
        const deliveryMan2: IDeliveryMan = sampleWithPartialData;
        expectedResult = service.addDeliveryManToCollectionIfMissing([], deliveryMan, deliveryMan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(deliveryMan);
        expect(expectedResult).toContain(deliveryMan2);
      });

      it('should accept null and undefined values', () => {
        const deliveryMan: IDeliveryMan = sampleWithRequiredData;
        expectedResult = service.addDeliveryManToCollectionIfMissing([], null, deliveryMan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(deliveryMan);
      });

      it('should return initial array if no DeliveryMan is added', () => {
        const deliveryManCollection: IDeliveryMan[] = [sampleWithRequiredData];
        expectedResult = service.addDeliveryManToCollectionIfMissing(deliveryManCollection, undefined, null);
        expect(expectedResult).toEqual(deliveryManCollection);
      });
    });

    describe('compareDeliveryMan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDeliveryMan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDeliveryMan(entity1, entity2);
        const compareResult2 = service.compareDeliveryMan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDeliveryMan(entity1, entity2);
        const compareResult2 = service.compareDeliveryMan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDeliveryMan(entity1, entity2);
        const compareResult2 = service.compareDeliveryMan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
