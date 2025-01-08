import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddPostComponent } from './add-post/add-post.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'view-product/:id', component: ProductDetailsComponent }, 
  { path: 'add-post', component: AddPostComponent }, 

];
