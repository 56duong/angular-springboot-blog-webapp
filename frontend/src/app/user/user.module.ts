import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FeedComponent } from './component/feed/feed.component';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from '../primeng.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from '../shared/component/post-details/post-details.component';


const routes: Routes = [
  {
    path: '',
    component: FeedComponent
  },
  {
    path: 'posts', children: [
      {
        path: ':postId',
        component: PostDetailsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    UserComponent,
    FeedComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    PrimengModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
