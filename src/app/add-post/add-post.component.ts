import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  postForm: FormGroup;
  isSubmitted = false;
  formValid = false;

  // dependency injection
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  get f() {
    return this.postForm.controls;
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.isSubmitted = true;
      this.formValid = true;
      console.log('postForm value ==>' + JSON.stringify(this.postForm.value));

      this.postService
        .addPost(this.postForm.value)  // this.postForm.value is an instance of Post and hence is a valid argument to addPost
        .subscribe((response: Post) => {
          console.log(response);
          this.postForm.reset();
          this.router.navigate(['/posts']);
        });
    }
  }
}
