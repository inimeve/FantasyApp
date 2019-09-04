import { Injectable } from '@angular/core';

@Injectable()
export class FantasyTokenService {

  constructor() {}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

}
