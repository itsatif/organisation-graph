import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  private tokenKey = 'auth-token';
  private router = inject(Router);

  private users = [
    { email: 'admin@graph.net', password: 'admin123' },
    { email: 'atif@graph.net', password: 'atif123' },
    { email: 'shadab@graph.net', password: 'shadab123' },
  ];

  /**Generates a fake token (for simulation purposes)**/
  getAuthToken = (): string => 'cec4010ed3f07f72b2a7ee44e823ff9b';

  /**
   * @description Simulates login by checking against hardcoded user credentials
   * @param credentials Object containing email and password
   */
  login(credentials: { email: string; password: string }) {
    const user = this.users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    if (user) {
      const token = this.getAuthToken();
      this.storeToken(token);
      this.isAuthenticated$.next(true);
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description Logs the user out by removing the token
   */
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * @description Stores token in localStorage
   * @param token JWT token
   */
  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * @description Retrieves token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * @description Checks if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
