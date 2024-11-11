import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CustomDropdownComponent implements OnInit, OnChanges {
  @Input() options: any[] = [];
  @Output() selectionChange = new EventEmitter<string>();
  dropdownControl = new FormControl();
  searchControl = new FormControl();
  filteredOptions: string[] = [...this.options];

  ngOnInit(): void {
    this.filteredOptions = this.options;
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filterOptions(searchText || '');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      'options' in changes &&
      changes['options'].currentValue !== changes['options'].previousValue
    ) {
      this.options = changes['options'].currentValue;
      this.filteredOptions = [...this.options];
    }
  }

  filterOptions(searchText: string): void {
    this.filteredOptions = this.options.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  onSelectionChange(): void {
    this.selectionChange.emit(this.dropdownControl.value);
  }
}
