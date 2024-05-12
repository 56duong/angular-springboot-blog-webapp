import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/core/interface/role';
import { User } from 'src/app/core/interface/user';
import { RoleService } from 'src/app/core/service/role.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [MessageService]
})

export class UserManagementComponent {

  roles!: Role[];
  users!: User[];
  isVisible: boolean = false; // if the dialog is open
  isEdit: boolean = false; // id the dialog is Edit or New
  user!: User;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.getUsers();
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getRole(roleId: number) {
    return this.roles?.find(role => role.id === roleId)?.name;
  }

  openDialogEdit(user: any) {
    this.isEdit = true;
    this.isVisible = true;
    this.user = {...user};
  }

  openDialogNew() {
    this.isEdit = false;
    this.isVisible = true;
    this.user = {
      roleId: 1,
      active: true
    };
  }

  save() {
    if(this.user.id) {
      // Update
      this.userService.update(this.user.id, this.user).subscribe({
        next: (id) => {
          this.isVisible = false; //close dialog
          // find index of existing user
          const index = this.users.findIndex(user => user.id === this.user.id);
          // update
          if(index != -1) {
            this.users[index] = this.user;
          }
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated' });
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      // New
      this.userService.create(this.user).subscribe({
        next: (id) => {
          this.user.id = id;
          this.isVisible = false; //close dialog
          this.users.unshift({
            ...this.user,
            id: id
          }); // add to table
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is added' });
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}
