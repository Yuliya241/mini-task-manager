import { Injectable } from '@angular/core';

import { LocalStorageKeys } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getIsDarkTheme() {
    return localStorage.getItem('isDark');
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  getIconLogout() {
    return localStorage.getItem(LocalStorageKeys.BUTTON);
  }

  removeIconLogout() {
    return localStorage.removeItem(LocalStorageKeys.BUTTON);
  }

  removeItemLogin() {
    return localStorage.removeItem(LocalStorageKeys.LOGIN);
  }

  getItemLogin() {
    return localStorage.getItem(LocalStorageKeys.LOGIN);
  }

  removeItemUsername() {
    return localStorage.removeItem(LocalStorageKeys.USERNAME);
  }

  getItemUsername() {
    return localStorage.getItem(LocalStorageKeys.USERNAME);
  }
}
