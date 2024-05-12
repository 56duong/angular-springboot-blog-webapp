import { Injectable } from '@angular/core';
import { API_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interface/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = API_URL + 'api/v1/posts'

  constructor(private http: HttpClient) { }

  /**
   * Get all post from backend.
   * @returns array of posts.
   * @example
   * this.postService.getposts().subscribe({
   *    next: (posts) => {
   *      this.posts = posts;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL);
  }

  /**
   * Get specified post from backend.
   * @returns a post.
   * @example
   * this.postService.getPost().subscribe({
   *    next: (post) => {
   *      this.post = post;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  getPost(id: string): Observable<Post> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Post>(url);
  }

  /**
   * Create new Post.
   * @returns id.
   * @example
   * this.postService.create().subscribe({
   *    next: (id) => {
   *      this.post.id = id;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  create(post: Post): Observable<string> {
    return this.http.post<string>(this.apiURL, post);
  }

  /**
   * Update the existing Post.
   * @returns id.
   * @example
   * this.postService.update().subscribe({
   *    next: (id) => {
   *      this.post.id = id;
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  update(id: string, post: Post): Observable<string> {
    const url = `${this.apiURL}/${id}`;
    return this.http.patch<string>(url, post);
  }

  /**
   * Delete specified post from backend.
   * @example
   * this.postService.deletePost(id).subscribe({
   *    next: () => {
   *    },
   *    error: (error) => {
   *      console.log(error);
   *    }
   *  })
   */
  deletePost(id: string): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url);
  }

}
