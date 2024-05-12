import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { StaffComponent } from './staff/staff.component';
import { LoginComponent } from './shared/component/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import { SignupComponent } from './shared/component/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    title: 'PostShare',
    loadChildren: () => 
      import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'staff',
    component: StaffComponent,
    title: 'Management | PostShare',
    canActivate: [authGuard],
    loadChildren: () => 
      import('./staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login | PostShare'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup | PostShare'
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: '404 | PostShare'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
