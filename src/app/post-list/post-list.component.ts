import { Component } from '@angular/core';
import { Post } from '../add-post/post.model';
import { Router } from '@angular/router';
import { PostService } from '../add-post/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
 postList: Post[];

  constructor(private postService: PostService) {
    this.postList = [];
  }

  ngOnInit() {
    this.postService.getPosts().subscribe((response: Post[]) => {
      this.postList = response;
    });
  }
}
