import { Routes } from '@angular/router';
import { UnsecureLayoutComponent } from './layouts/unsecure/unsecure-layout/unsecure-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SecureLayoutComponent } from './layouts/secure/secure-layout/secure-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard';
import { AuthGuard } from './services/authguard.service';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { 
        path: '',
        component: UnsecureLayoutComponent,
        children: [
          {path: 'login', component: LoginComponent, pathMatch: 'full', data: { title: 'Ng Base | Login'} },
          // {path: '**', component: PageNotFoundComponent}
        ]
    },
    { 
      path: '',
      component: SecureLayoutComponent,
      children: [
        {path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Dashboard'}  },
      
      ]
    },
    
];
