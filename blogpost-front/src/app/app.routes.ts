import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { SearchComponent } from './components/search/search.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserBlogsComponent } from './components/user-blogs/user-blogs.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  { path: 'my-blogs', component: UserBlogsComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent, canActivate: [authGuard] },
];
