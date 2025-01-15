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
  styleUrl: './view-products.component.css',
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
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.productsList = products;
    });
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/view-product', productId]);
  }

  deleteProduct(productId: number): void {
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }
}
