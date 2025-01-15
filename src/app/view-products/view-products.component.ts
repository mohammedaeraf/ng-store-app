import { Component } from '@angular/core';
import { Product } from '../products/products.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../products/products.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css',
})
export class ViewProductsComponent {
  title: string;
  productsList: Product[];
  filteredProductsList: Product[];
  searchQuery: string = 'Enter Search Text here..';

  // Injecting ProductService and Router
  constructor(private productService: ProductService, private router: Router) {
    this.title = 'Products List';
    this.productsList = [];
    this.filteredProductsList = [];
  }

  // ngOnInit is a lifecycle hook called by Angular to indicate that Angular is done creating the component
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.productsList = products;
      this.filteredProductsList = products;
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredProductsList = this.productsList.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProductsList = this.productsList;
    }
    // add below lines for pagination
    // this.currentPage = 1;
    // this.updatePaginatedProductsList();
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/view-product', productId]);
  }

  deleteProduct(productId: number): void {
    const confirmation = confirm(
      'Are you sure you want to delete this product?'
    );
    
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
