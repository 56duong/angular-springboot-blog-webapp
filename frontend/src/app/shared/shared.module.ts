import { NotFoundComponent } from './component/not-found/not-found.component'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './component/post/post.component';
import { CoreModule } from '../core/core.module';
import { PrimengModule } from '../primeng.module';
import { RouterModule } from '@angular/router';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LikeButtonComponent } from './component/like-button/like-button.component';
import { SignupComponent } from './component/signup/signup.component';



@NgModule({
  declarations: [
    PostComponent,
    PostDetailsComponent,
    LoginComponent,
    NotFoundComponent,
    LikeButtonComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PrimengModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PostComponent
  ]
})
export class SharedModule { }
