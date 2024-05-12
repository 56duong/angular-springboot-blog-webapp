import { Injectable } from '@angular/core';
import { API_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Like } from '../interface/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private apiURL = API_URL + 'api/v1/likes'

  constructor(private http: HttpClient) { }

  /**
   * Toggle like.
   * @param postId
   * @returns Like object.
   * @example
   * this.likeService.toggleLike(postId).subscribe({
   *    next: (like) => {
   *      console.log(like)
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  toggleLike(postId: string): Observable<Like> {
    const url = `${this.apiURL}/${postId}`;
    return this.http.post<Like>(url, null);
  }

  isLiked(postId: string): Observable<boolean> {
    const url = `${this.apiURL}/${postId}`;
    return this.http.get<boolean>(url);
  }

  countLikes(postId: string): Observable<number> {
    const url = `${this.apiURL}/${postId}/count-like`;
    return this.http.get<number>(url);
  }

}
