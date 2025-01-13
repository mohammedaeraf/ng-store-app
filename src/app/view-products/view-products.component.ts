import { Component } from '@angular/core';
import { Product } from '../products/products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {
  products: Product[] = [
    { id: 1, title: 'Laptop', price: 599.99, brand: 'Dell', category: 'Electronics' },
    { id: 2, title: 'Shoes', price: 49.99, brand: 'Nike', category: 'Fashion' },
    { id: 3, title: 'Watch', price: 199.99, brand: 'Casio', category: 'Accessories' }
  ];

  addProduct(): void {
    const newProduct: Product = { id: this.products.length + 1, title: 'New Product', price: 100, brand: 'Generic', category: 'Misc' };
    this.products.push(newProduct);
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);
  }

  editProduct(index: number): void {
    this.products.splice(index, 1);
  }
}
