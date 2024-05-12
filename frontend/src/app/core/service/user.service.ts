import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../config/config';
import { User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiURL = API_URL + 'api/v1/users'

  constructor(private http: HttpClient) { }

  /**
   * Get all user from backend.
   * @returns array of users.
   * @example
   * this.userService.getusers().subscribe({
   *    next: (users) => {
   *      this.users = users;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  /**
   * Get specified user from backend.
   * @returns a user.
   * @example
   * this.userService.getUser().subscribe({
   *    next: (user) => {
   *      this.user = user;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  getUser(id: string): Observable<User> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<User>(url);
  }

  /**
   * Create new User.
   * @returns id.
   * @example
   * this.userService.create().subscribe({
   *    next: (id) => {
   *      this.user.id = id;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  create(user: User): Observable<string> {
    return this.http.post<string>(this.apiURL, user);
  }

  /**
   * Update the existing User.
   * @returns id.
   * @example
   * this.userService.update().subscribe({
   *    next: (id) => {
   *      this.user.id = id;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  update(id: string, user: User): Observable<string> {
    const url = `${this.apiURL}/${id}`;
    return this.http.patch<string>(url, user);
  }

}
