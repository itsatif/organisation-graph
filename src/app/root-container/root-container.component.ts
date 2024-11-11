import { Component, Inject, OnInit } from '@angular/core';
import { CustomDropdownComponent } from '../dynamic-components/custom-dropdown/custom-dropdown.component';
import { MatCardModule } from '@angular/material/card';
import { TreeGraphComponentComponent } from '../tree-graph-component/tree-graph-component.component';
import { ApiService } from '../api.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DetailCardComponent } from '../detail-card/detail-card.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../shared-services/auth.service';

interface companyList {
  total_companies: number;
  companies: string[];
}

@Component({
  selector: 'app-root-container',
  standalone: true,
  imports: [
    CommonModule,
    CustomDropdownComponent,
    MatCardModule,
    TreeGraphComponentComponent,
    DetailCardComponent,
    MatToolbar,
    MatButton,
  ],
  templateUrl: './root-container.component.html',
  styleUrl: './root-container.component.css',
})
export class RootContainerComponent implements OnInit {
  companies$: Observable<companyList> = null;
  organisationData: any = [];
  renderCardDetail$: Observable<any> = new Observable<any>();

  constructor(
    @Inject(ApiService) private apiService: ApiService,
    @Inject(AuthService) private authService: AuthService,
  ) {
    this.companies$ = this.apiService.fetchCompanies();
    this.renderCardDetail$ = this.apiService.renderDetailCard$.pipe(
      tap(console.log),
    );
  }

  ngOnInit(): void {}

  handleCompanySelection(value: string): void {
    this.apiService
      .fetchOrganisationDetails(value)
      .subscribe(({ company_data }) => {
        if (company_data) {
          this.organisationData = company_data;
        }
      });
  }

  hideDetailCard(flag: boolean): void {
    if (flag) {
      this.apiService.renderDetailCard$.next(null);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
