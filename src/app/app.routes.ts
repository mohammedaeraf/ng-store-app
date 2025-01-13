import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddPostComponent } from './add-post/add-post.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'view-product/:id', component: ProductDetailsComponent }, 
  { path: 'add-product', component: AddProductComponent }, 
  { path: 'posts', component: PostListComponent },
];
