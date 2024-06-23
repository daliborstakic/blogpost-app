import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/user';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    MiniProfileComponent,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  currentUser!: User | null;
  public searchGroup: FormGroup = new FormGroup({
    query: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  submit() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchGroup.get('query')?.value },
    });
    this.searchGroup.reset();
  }
}
