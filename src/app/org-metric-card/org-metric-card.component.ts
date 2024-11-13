import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-org-metric-card',
  standalone: true,
  imports: [MatIcon, MatIconButton, NgIf],
  templateUrl: './org-metric-card.component.html',
  styleUrl: './org-metric-card.component.css',
})
export class OrgMetricCardComponent implements OnChanges {
  @Input() data: any = null;
  @Input() showProfile: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'data' in changes &&
      changes['data'].currentValue !== changes['data'].previousValue
    ) {
      this.data = changes['data'].currentValue;
    }
  }
}
