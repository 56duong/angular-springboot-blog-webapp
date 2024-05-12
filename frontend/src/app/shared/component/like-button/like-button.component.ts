import { Component, Input } from '@angular/core';
import { LikeService } from 'src/app/core/service/like.service';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})

export class LikeButtonComponent {
  @Input() postId!: string;
  isLiked: boolean = false;
  count: number = 0;

  constructor(
    private likeService: LikeService
  ) {}

  ngOnInit() {
    this.getIsLiked();
    this.countLikes();
  }

  getIsLiked() {
    this.likeService.isLiked(this.postId).subscribe({
      next: (isLiked) => {
        this.isLiked = isLiked;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  countLikes() {
    this.likeService.countLikes(this.postId).subscribe({
      next: (count) => {
        this.count = count;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  toggleLike() {
    this.likeService.toggleLike(this.postId).subscribe({
      next: (like) => {
        if(like.id) {
          this.isLiked = true;
          this.count++;
        }
        else {
          this.isLiked = false;
          this.count--;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
