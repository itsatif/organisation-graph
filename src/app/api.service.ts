import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../constants/api.url';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { HandleErrorService } from './shared-services/handle-error.service';

export interface OrgMetricPayload {
  first_name: string;
  last_name: string;
  company: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  renderDetailCard$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  renderOrgMetricCard$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    @Inject(HandleErrorService) private handleErrorService: HandleErrorService,
  ) {}

  fetchOrganisationDetails(name: string): Observable<any> {
    return this.http
      .get(`${apiUrl}/company/${name}`)
      .pipe(catchError((err) => this.handleErrorService.handleError(err)));
  }

  fetchCompanies(): Observable<any> {
    return this.http
      .get(`${apiUrl}/get-companies-list`)
      .pipe(catchError((err) => this.handleErrorService.handleError(err)));
  }

  fetchOrgMetrics(queryObj: OrgMetricPayload) {
    return this.http
      .post(`${apiUrl}/org-metrics`, queryObj)
      .pipe(catchError((err) => this.handleErrorService.handleError(err)));
  }
}
