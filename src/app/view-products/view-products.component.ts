import { Component } from '@angular/core';
import { Product } from '../products/products.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {
   title: string;
    productsList: Product[];
  
    // Injecting ProductService and Router
    constructor(private productService: ProductService, private router: Router) {
      this.title = 'Products List';
      this.productsList = [];
    }
  
    // ngOnInit is a lifecycle hook called by Angular to indicate that Angular is done creating the component
    ngOnInit() {
      // Observable - Subscribe helps in asynchronous processing
      this.productService.getProducts().subscribe((response: Product[]) => {
        this.productsList = response;
      });
      
    }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/view-product', productId]);
  }

  deleteProduct(productId: number): void {
    //this.router.navigate(['/delete-product', productId]);
    // call service to delete the product
    // reload the products list
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }
}
