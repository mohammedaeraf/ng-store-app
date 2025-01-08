import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

  }


  onSubmit() {
    if (this.postForm.valid) {
      this.formValid = true;
      // call Service to save the post (Assignment)
      this.postForm.reset();
      alert('Form submitted successfully!');
      this.isSubmitted = true;
    }
  }
}
