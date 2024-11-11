import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [MatIconButton, CommonModule, MatIcon],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css',
})
export class DetailCardComponent implements OnChanges {
  @Input() data: any = null;
  @Output() hideCard = new EventEmitter<boolean>();
  showProfile: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'data' in changes &&
      changes['data'].currentValue !== changes['data'].previousValue
    ) {
      this.data = changes['data'].currentValue;
      this.showProfile = true;
    }
  }

  closeProfile() {
    this.showProfile = false;
    this.data = null;
    this.hideCard.emit(true);
  }
}
