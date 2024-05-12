import { Component } from '@angular/core';
import { Post } from 'src/app/core/interface/post';
import { PostService } from 'src/app/core/service/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts: Post[] = [];
  isVisible: boolean = false; // if the dialog is open
  isEdit: boolean = false; // id the dialog is Edit or New
  post: Post = {};

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  
}
