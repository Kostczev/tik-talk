import { PostService } from './../../../data/services/post.service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostComment, Post } from '../../../data/interfaces/post.interface';
import { AvatarCircle } from "../../../common-ui/avatar-circle/avatar-circle";
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { PostInput } from "../post-input/post-input";
import { CommentComponent } from "./comment/comment.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [AvatarCircle, DatePipe, SvgIconComponent, PostInput, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  post = input<Post>()

  postComments = signal<PostComment[]>([])

  postService = inject(PostService)

  async ngOnInit() {
    this.postComments.set(this.post()!.comments)
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    )
    this.postComments.set(comments)
  }
}
