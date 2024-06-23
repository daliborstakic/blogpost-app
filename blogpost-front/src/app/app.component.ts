import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { User } from './model/user';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoginComponent,
    HttpClientModule,
    RouterModule,
    BsDropdownModule,
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showNavbar = true;
  showScrollButton = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const excludedRoutes = ['/login', '/register', '/'];
        this.showNavbar = !excludedRoutes.includes(event.url);
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY;
    this.showScrollButton = scrollY > 100;
  }
}
