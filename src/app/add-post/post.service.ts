import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiUrl: string;

  // Dependency Injection of HttpClient
  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  }

  getPosts(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  addPost(post: Post) : Observable<Post> {
    // invoke the API; this will also serialize the Product TypeScript object into a JSON object
    return this.httpClient.post<Post>(this.apiUrl, post);
  }
  
}
