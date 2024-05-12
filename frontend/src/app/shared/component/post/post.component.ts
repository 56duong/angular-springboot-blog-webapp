import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/core/interface/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {
  @Input() post!: Post;
  @Input() canEdit!: boolean;
  @Output() isEditing = new EventEmitter();
}
