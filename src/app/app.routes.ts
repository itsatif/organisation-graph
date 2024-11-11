import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RootContainerComponent } from './root-container/root-container.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: RootContainerComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];
