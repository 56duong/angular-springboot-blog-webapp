import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditorModule } from 'primeng/editor';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [],
  exports: [
    PasswordModule,
    EditorModule,
    ConfirmDialogModule,
    ButtonModule,
    SidebarModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    DialogModule,
    SelectButtonModule,
    ToastModule,
    DataViewModule,
    ChipsModule,
    InputTextareaModule,
    TagModule
  ]
})

export class PrimengModule {}