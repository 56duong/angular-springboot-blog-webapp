import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../config/config';
import { Observable } from 'rxjs';
import { Role } from '../interface/role';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  private apiURL = API_URL + 'api/v1/roles'

  constructor(private http: HttpClient) { }

  /**
   * Get all role from backend.
   * @returns array of roles.
   * @example
   * this.roleService.getRoles().subscribe({
   *    next: (roles) => {
   *      this.roles = roles;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiURL);
  }
}
