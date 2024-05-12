import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIdToNamePipe } from './pipe/user-id-to-name.pipe';



@NgModule({
  declarations: [
    UserIdToNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserIdToNamePipe
  ]
})
export class CoreModule { }
