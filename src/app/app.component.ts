import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomDropdownComponent } from './dynamic-components/custom-dropdown/custom-dropdown.component';
import { RootContainerComponent } from './root-container/root-container.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CustomDropdownComponent,
    RootContainerComponent,
    MatSnackBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
