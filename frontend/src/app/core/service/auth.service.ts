import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../config/config';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../interface/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = API_URL + 'api/v1/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Login.
   * @returns token.
   * @example
   * this.authService.login(this.login).subscribe({
   *    next: (response) => {
   *      console.log(response)
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  login(credentials: {email: any, password: any}): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, credentials);
  }

  /**
   * Signup.
   * @returns ID.
   * @example
   * this.authService.signup(this.signup).subscribe({
   *    next: (response) => {
   *      console.log(response)
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  signup(credentials: {email: any, password: any, fullname: any}): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/signup`, credentials);
  }

  // TOKEN

  /**
   * Sets the Token to local storage
   * @param token The token to set
   */
  setToken(token: string) {
    window.localStorage.setItem("auth_token", token);
  }

  /**
   * Gets the Token from local storage
   * @returns The token
   */
  getToken(): string {
    return window.localStorage.getItem("auth_token") || '';
  }

  /**
   * Removes the Token from local storage
   */
  removeToken(): void {
    window.localStorage.removeItem("auth_token");
  }
  
  // USERNAME/EMAIL
  /**
   * Sets the current username to local storage
   * @param username The username/email to set
   */
  setCurrentUsername(username: string) {
    window.localStorage.setItem("current_username", username);
  }

  /**
   * Gets the current username/email from local storage
   * @returns The current username/email
   */
  getCurrentUsername(): string {
    return window.localStorage.getItem("current_username") || '';
  }

  /**
   * Removes the current username/email from local storage
   */
  removeCurrentUsername(): void {
    window.localStorage.removeItem("current_username");
  }

  
  canActive(): boolean {
    const token = this.getToken();
    const decodedToken = jwtDecode<Token>(token);
    const role = decodedToken.role;

    if(role !== 'ROLE_USER') {
      return true;
    }
    else {
      this.router.navigate(['/login'], {
        queryParams: {message: 'Unauthorized'}
      });
      return false;
    }
  }
}
