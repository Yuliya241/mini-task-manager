import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

import { LocalStorageKeys } from '../../enums/enums';
import { LocalStorageService } from '../../services/local-storage.service';
import { LoginComponent } from '../login/login.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LoginComponent,
    LogoComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isDark = signal<boolean>(
    JSON.parse(this.localStorage.getIsDarkTheme() ?? 'false'),
  );

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) {
    effect(() => {
      this.localStorage.setItem(LocalStorageKeys.ISDARK, JSON.stringify(this.isDark()));
    });

    if (this.localStorage.getIsDarkTheme() === 'true') document.body.classList.add('dark');
  }

  public switchTheme(): void {
    document.body.classList.toggle('dark');
    this.isDark.set(!this.isDark());
  }

  public logoutForm(): void {
    this.authService.logout();
  }

  goToTasks(): void {
    this.router.navigate(['allTasks']);
  }
}
