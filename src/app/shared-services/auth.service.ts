import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getAuthToken = (): string => 'cec4010ed3f07f72b2a7ee44e823ff9b';
}
