import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { LocalStorageKeys, LogoutButtonTypes } from 'src/app/core/enums/enums';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

export interface User {
  login?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public router = inject(Router);

  private localStorage = inject(LocalStorageService);

  private loginSource: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public loginSubject$ = this.loginSource.asObservable();

  private userSource = new BehaviorSubject<User | null>(null);

  public user$ = this.userSource.asObservable();

  private logoutSource = new BehaviorSubject<string>(LogoutButtonTypes.ACCOUNT_CIRCLE);

  public logout$ = this.logoutSource.asObservable();

  public login(user: User): void {
    this.localStorage.setItem(LocalStorageKeys.LOGIN, LogoutButtonTypes.TRUE);
    this.localStorage.setItem(LocalStorageKeys.BUTTON, LogoutButtonTypes.INPUT);
    this.loginSource.next(true);
    this.logoutSource.next(LogoutButtonTypes.INPUT);
    this.router.navigate(['main']);
    this.userSource.next(user);
  }

  public logout(): void {
    this.localStorage.removeItemLogin();
    this.localStorage.removeItemUsername();
    this.localStorage.removeIconLogout();
    this.loginSource.next(false);
    this.logoutSource.next(LogoutButtonTypes.ACCOUNT_CIRCLE);
    this.userSource.next({ login: '' });
    this.router.navigate(['signin']);
  }
}
