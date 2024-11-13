import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMetricCardComponent } from './org-metric-card.component';

describe('OrgMetricCardComponent', () => {
  let component: OrgMetricCardComponent;
  let fixture: ComponentFixture<OrgMetricCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgMetricCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrgMetricCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
