import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Comment } from '../../_models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteComment(id: number){
    this.deleteComment.emit(id);
  }
}
