import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDeliveryMan, NewDeliveryMan } from '../delivery-man.model';

export type PartialUpdateDeliveryMan = Partial<IDeliveryMan> & Pick<IDeliveryMan, 'id'>;

export type EntityResponseType = HttpResponse<IDeliveryMan>;
export type EntityArrayResponseType = HttpResponse<IDeliveryMan[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryManService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/delivery-men');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(deliveryMan: NewDeliveryMan): Observable<EntityResponseType> {
    return this.http.post<IDeliveryMan>(this.resourceUrl, deliveryMan, { observe: 'response' });
  }

  update(deliveryMan: IDeliveryMan): Observable<EntityResponseType> {
    return this.http.put<IDeliveryMan>(`${this.resourceUrl}/${this.getDeliveryManIdentifier(deliveryMan)}`, deliveryMan, {
      observe: 'response',
    });
  }

  partialUpdate(deliveryMan: PartialUpdateDeliveryMan): Observable<EntityResponseType> {
    return this.http.patch<IDeliveryMan>(`${this.resourceUrl}/${this.getDeliveryManIdentifier(deliveryMan)}`, deliveryMan, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeliveryMan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeliveryMan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDeliveryManIdentifier(deliveryMan: Pick<IDeliveryMan, 'id'>): number {
    return deliveryMan.id;
  }

  compareDeliveryMan(o1: Pick<IDeliveryMan, 'id'> | null, o2: Pick<IDeliveryMan, 'id'> | null): boolean {
    return o1 && o2 ? this.getDeliveryManIdentifier(o1) === this.getDeliveryManIdentifier(o2) : o1 === o2;
  }

  addDeliveryManToCollectionIfMissing<Type extends Pick<IDeliveryMan, 'id'>>(
    deliveryManCollection: Type[],
    ...deliveryMenToCheck: (Type | null | undefined)[]
  ): Type[] {
    const deliveryMen: Type[] = deliveryMenToCheck.filter(isPresent);
    if (deliveryMen.length > 0) {
      const deliveryManCollectionIdentifiers = deliveryManCollection.map(
        deliveryManItem => this.getDeliveryManIdentifier(deliveryManItem)!
      );
      const deliveryMenToAdd = deliveryMen.filter(deliveryManItem => {
        const deliveryManIdentifier = this.getDeliveryManIdentifier(deliveryManItem);
        if (deliveryManCollectionIdentifiers.includes(deliveryManIdentifier)) {
          return false;
        }
        deliveryManCollectionIdentifiers.push(deliveryManIdentifier);
        return true;
      });
      return [...deliveryMenToAdd, ...deliveryManCollection];
    }
    return deliveryManCollection;
  }
}
