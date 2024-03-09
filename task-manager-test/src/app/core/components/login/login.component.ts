import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);

  private destroyRef = inject(DestroyRef);

  public router = inject(Router);

  private localStorage = inject(LocalStorageService);

  public isLoggedIn = false;

  userName?: string;

  iconName = '';

  ngOnInit(): void {
    this.authService.loginSubject$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loginSubject) => { this.isLoggedIn = loginSubject; });

    this.authService.logout$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((buttonLogout) => { this.iconName = buttonLogout; });

    this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => { this.userName = user?.login; });

    const userValue = this.localStorage.getItemUsername();
    const iconValue = this.localStorage.getIconLogout();
    if (userValue) {
      this.userName = userValue;
    }
    if (iconValue) {
      this.iconName = iconValue;
    }
  }

  public logoutForm(): void {
    this.authService.logout();
    this.router.navigate(['signin']);
  }
}
